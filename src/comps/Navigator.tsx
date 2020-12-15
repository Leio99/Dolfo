import React from "react"
import { connect } from "react-redux"
import { setStudenti } from "../commons/Redux"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { initializeTooltips } from "./layout/Tooltip"
import { Components } from "./features/Components"
import { IComponent } from "../models/IComponent"
import { CoordinatoriMenu } from "./features/coordinatori/CoordinatoriMenu"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { ComponentsPaths } from "./features/ComponentsPaths"
import { Header } from "./layout/Header"

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
            currentPath: "",
            openMenu: false,
            currentComponent: null
        }
    }
    
    componentDidMount = () => {
        this.findComponent()

        initializeTooltips()

        this.setState({
            currentPath: window.location.pathname,
            openMenu: false
        }, this.findComponent)

        history.listen(location => {
            location.pathname !== this.state.currentPath && this.setState({
                currentPath: location.pathname,
                openMenu: false
            }, this.findComponent)
        })
    }

    findComponent = () => {
        const path = this.state.currentPath.replace(/[\d+](.*)/g, ":id")
        let currentComponent: IComponent

        Object.keys(Components).some(key => {
            if(key === path){
                currentComponent = Components[key]
                return true
            }

            return false
        })

        currentComponent?.permission && currentComponent.permission()

        this.setState({
            currentComponent
        })
    }

    toggleMenu = () => this.setState({ openMenu: !this.state.openMenu }, () => {
        this.props.setStudenti({ id: 1 })
        console.log(this.props)
    })

    setErrorPage = () => {
        !this.state.currentComponent && this.setState({
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
                        !currentComponent?.hideMenu && <Header title={currentComponent?.pageTitle} menuTogglerFn={this.toggleMenu} />
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
                                            const Component = Components[key]?.component

                                            return <Route exact path={key} render={(routeProps) => {
                                                if(Component) return <Component {...routeProps} />

                                                return <div></div>
                                            }} />
                                        })
                                    }

                                    <Route render={() => {
                                        this.setErrorPage()

                                        const Component = Components[ComponentsPaths.ERROR_404_PATH].component

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

const mapStateToProps = (state: any) => ({
    studenti: state.studenti
})

const mapDispatchToProps = { setStudenti }

const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default NavContainer(Navigator)