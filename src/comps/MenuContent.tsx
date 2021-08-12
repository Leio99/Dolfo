import React from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import { MenuItems } from "./presentation/Menu"
import { Route, Switch } from "react-router-dom"
import { initializeTooltips } from "./layout/Tooltip"

export const hashHistory = createBrowserHistory()

export class MenuContent extends React.Component{
    componentDidMount = initializeTooltips
    
    getMenuProps = (link: string) => {
        return {
            onClick: () => hashHistory.push(link),

        }
    }

    render = (): JSX.Element => <Router history={hashHistory}>
        <Route render={({ location }) => <div className="page-content">
            <div className="navigation-menu">
                <MenuItem link="/">Getting started</MenuItem>

                <div className="navigation-menu-title">Form</div>
                {
                    MenuItems.filter(m => m.section === "form").map(m => <MenuItem {...m} />)
                }

                <div className="navigation-menu-title">Layout</div>
                {
                    MenuItems.filter(m => m.section === "layout").map(m => <MenuItem {...m} />)
                }
            </div>

            <div className="body-content">
                <Switch location={location}>
                    <Route exact path="/">
                        <h2 className="page-title">Getting started</h2>
                        <p>This is a simple website to show the <strong>Dolfo components</strong>, developed by me.</p>
                        <p>Use the side menu to navigate.</p>
                        <p>In each page, you will find:
                            <ul>
                                <li>What the component is used for</li>
                                <li>How to use it</li>
                                <li>Its appearance</li>
                                <li>The APIs the component can take</li>
                            </ul>
                        </p>
                    </Route>

                    {
                        MenuItems.map(m => {
                            const Component = m.component

                            return <Route exact path={m.link}>
                                <h2 className="page-title">{m.children}</h2>
                                <Component />
                            </Route>
                        })
                    }
                </Switch>
            </div>
        </div>} />
    </Router>
}

export class MenuItem extends React.Component<{ readonly link: string }>{
    clickItem = () => {
        hashHistory.push(this.props.link)
        document.querySelector(".body-content").scrollTo(0, 0)
    }

    render = () => {
        const { link, children } = this.props,
        selected = link === hashHistory.location.pathname

        return <div className={"navigation-menu-item" + (selected ? " selected" : "")} onClick={this.clickItem}>
            {children}
        </div>
    }
}