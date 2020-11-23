import React from "react"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { Icon } from "./layout/Icon"
import Button from "./layout/Button"
import { Components } from "./features/Components"
import { IComponent, IComponentList } from "../models/IComponent"
import { CoordinatoriMenu } from "./features/coordinatori/CoordinatoriMenu"
import { TransitionGroup, CSSTransition } from "react-transition-group"

export const history = createBrowserHistory()

export interface IState{
    readonly currentPath: string
    readonly openMenu: boolean
    readonly currentComponent: IComponent
    readonly toolLength: number
}
export class Navigator extends React.PureComponent<any, IState>{
    constructor(){
        super(undefined)

        this.state = {
            currentPath: window.location.pathname,
            openMenu: false,
            currentComponent: null,
            toolLength: 0
        }
    }
    
    componentDidMount = () => {
        this.findComponent()

        const context = this

        document.addEventListener('mouseover', () => {
            const length = document.querySelectorAll("[data-tooltip]").length

            if(context.state.toolLength !== length){
                context.checkTooltips()
            }
        })

        history.listen(loc => {
            this.setState({
                currentPath: loc.pathname,
                openMenu: false
            }, this.findComponent)
        })
    }

    checkTooltips = () => {
        const elements = document.querySelectorAll("[data-tooltip]")

        this.setState({ toolLength: elements.length })

        elements.forEach(tool => {
            const tooltip = document.createElement("div");

            (tool as any).tooltip?.remove();
            (tool as any).tooltip = tooltip

            tooltip.classList.add("dolfo-tooltip")
            tooltip.innerHTML = tool.getAttribute("data-tooltip")

            tool.addEventListener("mouseover", () => {
                const bound = tool.getBoundingClientRect()
                
                tooltip.style.top = bound.top + "px"
                tooltip.style.left = (bound.left + (bound.width / 2)) + "px"

                document.body.appendChild((tool as any).tooltip)
            })
            tool.addEventListener("mouseout", () => {
                (tool as any).tooltip.remove()
            })
        })
    }

    findComponent = () => {
        const path = this.state.currentPath.replace(/[\d+](.*)/g, ':id')
        let currentComponent: IComponent

        Object.keys(Components).some(key => {
            if(key === path){
                currentComponent = (Components as IComponentList)[key]
                return true
            }

            return false
        })

        currentComponent?.permission && currentComponent.permission()

        this.setState({
            currentComponent
        })
    }

    toggleMenu = () => this.setState({ openMenu: !this.state.openMenu })

    render = (): JSX.Element => {
        const { currentPath, openMenu, currentComponent } = this.state

        return <Router history={history}>
            <Route render={({ location }) => (
                <div>
                    {
                        !currentComponent?.hideMenu && <div className="dolfo-header">
                            <Button circleBtn bigBtn onClick={this.toggleMenu} btnColor="white" className="dolfo-menu-button">
                                <Icon iconKey="bars" />
                            </Button>

                            <h2 className="dolfo-header-title">{currentComponent?.pageTitle}</h2>

                            <div className="clearfix"></div>
                        </div>
                    }
                    
                    <CoordinatoriMenu currentPath={currentPath} opened={openMenu} toggleMenu={this.toggleMenu} isHidden={currentComponent?.hideMenu} />

                    <div className="px-5 pb-5">
                        <TransitionGroup>
                            <CSSTransition key={location.key} timeout={0} classNames="fade">
                                <Switch location={location}>
                                    {
                                        Object.keys(Components).map(key => {
                                            const Component = (Components as any)[key]?.component

                                            return <Route exact path={key} render={(routeProps) => {
                                                if(Component) return <Component {...routeProps} />

                                                return <div></div>
                                            }} />
                                        })
                                    }
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>                    
                </div>
            )} />
        </Router>
    }
}
