import React from "react"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { Prenotazione } from "./Prenotazione"
import { TestLayout } from "./TestLayout"
import { ListaStudenti } from "./ListaStudenti"

export const history = createBrowserHistory()

export class Navigator extends React.Component{
    render = (): JSX.Element => {
        return <Router history={history}>
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
