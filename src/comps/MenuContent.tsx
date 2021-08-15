import React from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import { MenuItems } from "./presentation/Menu"
import { Route, Switch } from "react-router-dom"
import { initializeTooltips } from "./layout/Tooltip"
import ReactDOM from "react-dom"

const homepage = require("../../package.json").homepage

export const hashHistory = createBrowserHistory()

export class MenuContent extends React.Component{

    componentDidMount = () => {
        initializeTooltips()

        if(window.location.pathname !== homepage){
            const nav = (ReactDOM.findDOMNode(this) as Element).querySelector(".navigation-menu"),
            selected = nav.querySelector(".navigation-menu-item.selected"),
            top = selected.getBoundingClientRect().top - 10

            nav.scrollTo(0, top)
        }
    }
    
    getMenuProps = (link: string) => {
        return {
            onClick: () => hashHistory.push(link),

        }
    }

    render = (): JSX.Element => <Router history={hashHistory}>
        <Route render={({ location }) => <div className="page-content">
            <div className="navigation-menu">
                <MenuItem link="">Getting started</MenuItem>

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
                    <Route exact path={homepage}>
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

                        <h3 className="page-title">External dependencies</h3>
                        <ul>
                            <li>FontAwesome PRO</li>
                            <li>React onClickOutside</li>
                            <li>Google gapi</li>
                            <li>Lodash library</li>
                            <li>SASS</li>
                        </ul>
                    </Route>

                    {
                        MenuItems.map(m => {
                            const Component = m.component

                            return <Route exact path={homepage + m.link}>
                                <h2 className="page-title">{m.children}</h2>
                                {m.component ? <Component /> : "Docs to do."}
                            </Route>
                        })
                    }
                </Switch>

                <div className="footer">Created by Leonardo Grandolfo <span>IT</span> &copy; {new Date().getFullYear()}</div>
            </div>
        </div>} />
    </Router>
}

export class MenuItem extends React.Component<{ readonly link: string }>{
    static clickItem = (link: string) => {
        hashHistory.push(homepage + link)
        document.querySelector(".body-content").scrollTo(0, 0)
    }

    static findLink = (childrenTitle: string) => MenuItems.find(m => m.children === childrenTitle).link

    render = () => {
        const { link, children } = this.props,
        selected = (homepage + link) === hashHistory.location.pathname

        return <div className={"navigation-menu-item" + (selected ? " selected" : "")} onClick={() => MenuItem.clickItem(link)}>
            {children}
        </div>
    }
}