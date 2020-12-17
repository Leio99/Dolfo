import React from "react"
import { connect } from "react-redux"
import { setStudenti } from "../commons/Redux"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { initializeTooltips } from "./layout/Tooltip"
import { BreadCrumb } from "./layout/BreadCrumb"
import { BreadCrumbItem } from "./layout/BreadCrumbItem"
import { Components } from "./features/Components"
import { IComponent } from "../models/IComponent"
import { CoordinatoriMenu } from "./features/coordinatori/CoordinatoriMenu"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { ComponentsPaths } from "./features/ComponentsPaths"
import { Header } from "./layout/Header"
import { goTo } from "../commons/utility"
import { Icon } from "./layout/Icon"

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
        let parentKey = currentComponent?.parentKey,
        breadCrumbItems = [<BreadCrumbItem>{currentComponent?.pageTitle}</BreadCrumbItem>]

        while(parentKey){
            const comp = Components[parentKey],
            copy = parentKey

            breadCrumbItems.unshift(<BreadCrumbItem onClick={() => goTo(copy)}>{comp.pageTitle}</BreadCrumbItem>)

            parentKey = comp.parentKey
        }

        return <Router history={history}>
            <Route render={({ location }) => (
                <div>
                    {
                        !currentComponent?.hideMenu && <Header title={currentComponent?.pageTitle} menuTogglerFn={this.toggleMenu} />
                    }
                    
                    {
                        currentPath.indexOf(ComponentsPaths.PATH_COORDINATORI) >= 0 && currentPath !== ComponentsPaths.PATH_COORDINATORI_LOGIN && <CoordinatoriMenu currentPath={currentPath} opened={openMenu} toggleMenu={this.toggleMenu} />
                    }

                        <TransitionGroup>
                            <CSSTransition key={location.key} timeout={0} classNames="fade">
                                <div className="px-5 pb-5">

                                    {
                                        !currentComponent?.hideMenu && breadCrumbItems.length && <BreadCrumb className="mb-4">
                                            {
                                                breadCrumbItems.map((b, i) => {
                                                    if(i === 0) return <BreadCrumbItem {...b.props}>
                                                        <Icon iconKey="home" className="mr-2" />{b.props.children}
                                                    </BreadCrumbItem>

                                                    return b
                                                })
                                            }
                                        </BreadCrumb>
                                    }

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
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
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