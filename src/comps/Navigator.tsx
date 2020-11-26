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
    readonly tooltips: NodeListOf<Element>
    readonly toolTexts: string[]
}
export class Navigator extends React.PureComponent<any, IState>{
    constructor(){
        super(undefined)

        this.state = {
            currentPath: window.location.pathname,
            openMenu: false,
            currentComponent: null,
            tooltips: null,
            toolTexts: null
        }
    }
    
    componentDidMount = () => {
        const context = this

        this.findComponent()

        document.addEventListener('mouseover', () => {
            const tooltips = document.querySelectorAll("[data-tooltip]")

            if(context.areDifferentTooltips(tooltips))
                context.checkTooltips()
        })

        document.addEventListener("click", () => document.querySelector(".dolfo-tooltip")?.remove())

        history.listen(loc => {
            this.setState({
                currentPath: loc.pathname,
                openMenu: false
            }, this.findComponent)
        })
    }

    areDifferentTooltips = (newTips: NodeListOf<Element>) => {
        const currentTips = this.state.tooltips

        if(!currentTips || !newTips || currentTips.length !== newTips.length) return true

        for(let i = 0; i < currentTips.length; i++){
            const current = currentTips[i],
            newTip = newTips[i]

            if(current !== newTip || this.state.toolTexts[i] !== newTip.getAttribute("data-tooltip"))
                return true
        }

        return false
    }

    checkTooltips = () => {
        const elements = document.querySelectorAll("[data-tooltip]"),
        toolTexts: string[] = []

        elements.forEach(tool => {
            const tooltip = document.createElement("div"),
            content = tool.getAttribute("data-tooltip")

            toolTexts.push(content);

            (tool as any).tooltip?.remove();
            (tool as any).tooltip = tooltip;

            tooltip.classList.add("dolfo-tooltip")
            tooltip.innerHTML = content

            tool.addEventListener("mouseenter", () => {
                const bound = tool.getBoundingClientRect()
                
                tooltip.style.top = bound.top + "px"
                tooltip.style.left = (bound.left + (bound.width / 2)) + "px"

                document.body.appendChild((tool as any).tooltip)
            })

            tool.addEventListener("mouseleave", () => (tool as any).tooltip.remove())
        })

        this.setState({
            tooltips: elements,
            toolTexts
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

                                    <Route render={() => <div>Non trovata</div>} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>                    
                </div>
            )} />
        </Router>
    }
}
