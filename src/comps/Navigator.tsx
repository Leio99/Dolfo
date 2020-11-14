import React from "react"
import { createBrowserHistory } from "history"
import { Route, Switch, Router } from "react-router-dom"
import { Prenotazione } from "./Prenotazione"
import { TestLayout } from "./TestLayout"

export const history = createBrowserHistory()

export class Navigator extends React.Component{
    render = (): JSX.Element => {
        return <Router history={history}>
            <Switch>
                <Route exact path="/prenota" render={() => {
                    return <Prenotazione />
                }} />
            </Switch>

            <Switch>
                <Route exact path="/layout" render={() => {
                    return <TestLayout />
                }} />
            </Switch>
        </Router>
    }
}
