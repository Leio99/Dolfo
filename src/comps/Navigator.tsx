import React from "react"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { Prenotazione } from "./Prenotazione"
import { TestLayout } from "./TestLayout"
import { ListaStudenti } from "./ListaStudenti"
import { SideMenu } from "./layout/SideMenu"
import { SubMenu } from "./layout/SubMenu"
import { MenuItem } from "./layout/MenuItem"
import { Icon } from "./layout/Icon"
import Button from "./layout/Button"
import { Components } from "./Components"

export const history = createBrowserHistory()

export interface IState{
    readonly currentPath: string
    readonly openMenu: boolean
    readonly currentComponent: any
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
        this.setState({
            currentComponent: (Components as any)[this.state.currentPath]
        })

        Object.keys(Components).map(d => console.log(d)) // se è compatibile la metti in state

        history.listen(loc => {
            console.log(loc)
            this.setState({
                currentPath: loc.pathname,
                openMenu: false ,
                currentComponent: (Components as any)[loc.pathname]
            })
        })
    }

    toggleMenu = () => this.setState({ openMenu: !this.state.openMenu })

    render = (): JSX.Element => {
        const { currentPath, openMenu, currentComponent } = this.state

        return <Router history={history}>

            <div className="header m-5" style={{ borderRadius: 50 }}>
                <Button circleBtn bigBtn onClick={this.toggleMenu} btnColor="white" className="float-right">
                    <Icon iconKey="bars" />
                </Button>

                <h2>{currentComponent?.PAGE_TITLE}</h2>

                <div className="clearfix"></div>
            </div>

            <SideMenu onToggle={this.toggleMenu} opened={openMenu}>
                <img src="https://i.imgur.com/5Z1DbN7.png" height="100" className="my-4 mx-auto d-block" style={{ filter: "drop-shadow(1.5px 0 0 #fff) drop-shadow(-.7px 0 0 #fff) drop-shadow(0 -1px 0 #fff) drop-shadow(0 1.5px 0 #fff)" }} />

                <MenuItem onClick={() => history.push("/layout/1")}>
                    <Icon iconKey="home-alt" className="mr-2" /> Home
                </MenuItem>

                <SubMenu text={<span>
                    <Icon iconKey="users-class" className="mr-2" /> Studenti
                </span>} opened={currentPath.indexOf("/prova") >= 0}>
                    <MenuItem>Lista studenti</MenuItem>
                    <MenuItem>Aggiungi</MenuItem>
                </SubMenu>

                <SubMenu text={<span>
                    <Icon iconKey="chalkboard-teacher" className="mr-2" /> Docenti
                </span>}>
                    <MenuItem>Lista docenti</MenuItem>
                    <MenuItem>Aggiungi</MenuItem>
                </SubMenu>

                <MenuItem>
                    <Icon iconKey="list-alt" className="mr-2" /> Materie
                </MenuItem>

                <SubMenu text={<span>
                    <Icon iconKey="wrench" className="mr-2" /> Funzioni
                </span>}>
                    <MenuItem>Configura calendario</MenuItem>
                    <MenuItem>Firma da remoto</MenuItem>
                </SubMenu>

                <MenuItem>
                    <Icon iconKey="book-reader" className="mr-2" /> Documentazione
                </MenuItem>

                <MenuItem>
                    <Icon iconKey="power-off" className="mr-2" /> Esci
                </MenuItem>
            </SideMenu>

            <Switch>
                <Route exact path="/" render={() => {
                    history.push("/layout")
                    return null
                }} />
            </Switch>

            <Switch>
                <Route exact path="/prenota" render={() => <Prenotazione />} />
            </Switch>

            <Switch>
                <Route exact path="/layout" render={() => <TestLayout />} />
            </Switch>

            <Switch>
                <Route exact path="/prova" render={() => <ListaStudenti />} />
            </Switch>
        </Router>
    }
}
