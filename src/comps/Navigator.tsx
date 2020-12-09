import React from "react"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { Icon } from "./layout/Icon"
import Button from "./layout/Button"
import { initializeTooltips } from "./layout/Tooltip"
import { Components } from "./features/Components"
import { IComponent, IComponentList } from "../models/IComponent"
import { CoordinatoriMenu } from "./features/coordinatori/CoordinatoriMenu"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { ComponentsPaths } from "./features/ComponentsPaths"

export const history = createBrowserHistory()

export interface IState{
    readonly currentPath: string
    readonly openMenu: boolean
    readonly currentComponent: IComponent
}
export class Navigator extends React.PureComponent<any, IState>{
    constructor(){
        super(undefined)

        this.state = {
            currentPath: window.location.pathname,
            openMenu: false,
            currentComponent: null
        }
    }
    
    componentDidMount = () => {
        this.findComponent()

        initializeTooltips()

        history.listen(loc => {
            this.setState({
                currentPath: loc.pathname,
                openMenu: false
            }, this.findComponent)
        })
    }

    findComponent = () => {
        const path = this.state.currentPath.replace(/[\d+](.*)/g, ":id")
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

    setErrorPage = () => {
        this.setState({
            currentComponent: Components[ComponentsPaths.ERROR_404_PATH],
            currentPath: ComponentsPaths.ERROR_404_PATH
        })
    }

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
                    
                    {
                        currentPath.indexOf(ComponentsPaths.PATH_COORDINATORI) >= 0 && currentPath !== ComponentsPaths.PATH_COORDINATORI_LOGIN && <CoordinatoriMenu currentPath={currentPath} opened={openMenu} toggleMenu={this.toggleMenu} />
                    }

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

                                    <Route render={() => {
                                        this.setErrorPage()

                                        const Component = (Components as any)[ComponentsPaths.ERROR_404_PATH]?.component

                                        return <Component />
                                    }} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>        
                </div>
            )} />
        </Router>
    }
}
