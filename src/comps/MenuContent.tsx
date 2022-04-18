import React from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import { MenuItems } from "./presentation/Menu"
import { Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import Button from "./layout/Button"
import { Icon } from "./layout/Icon"
import { Switch as InputSwitch } from "./form/Switch"
import { isDarkTheme, toggleDarkTheme } from "./shared/utility"
import { Tooltip } from "./layout/Tooltip"

const homepage = process.env.PUBLIC_URL + "/",
hashHistory = createBrowserHistory()

export const goToApiBlock = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement

    document.querySelector(".body-content").scrollTo({
        top: element.offsetTop - 10,
        behavior: "smooth"
    })

    element.classList.add("api-animate")

    setTimeout(() => element.classList.remove("api-animate"), 500)
}

export class MenuContent extends React.Component<unknown, { readonly darkTheme: boolean }>{
    constructor(props: unknown){
        super(props)

        this.state = {
            darkTheme: isDarkTheme()
        }
    }

    componentDidMount = () => {
        if(window.location.pathname !== homepage){
            const nav = (ReactDOM.findDOMNode(this) as Element).querySelector(".navigation-menu"),
            selected = nav.querySelector(".navigation-menu-item.selected"),
            top = selected.getBoundingClientRect().top - 10

            setTimeout(() => nav.scrollTo(0, top))
        }
    }

    toggleSideMenu = () => document.querySelector(".navigation-menu").classList.toggle("show")

    toggleDarkMode = () => this.setState({ darkTheme: !this.state.darkTheme }, toggleDarkTheme)

    render = (): JSX.Element => {
        const menuBtn = (color: "darkblue" | "white") => <Button circleBtn size="big" btnColor={color} onClick={this.toggleSideMenu} className="menu-toggler">
            <Icon iconKey="bars" type="far" />
        </Button>,
        { darkTheme } = this.state


        return <Router history={hashHistory}>
            <Route render={({ location }) => <div className="page-content">
                <div className="navigation-menu">
                    <div style={{ float: "right", color: "var(--white)", marginRight: 10 }}>
                        <Tooltip tooltip="Toggle dark mode">
                            <InputSwitch checked={darkTheme} label={<Icon iconKey="moon" />} onChange={this.toggleDarkMode} />
                        </Tooltip>
                    </div>

                    {menuBtn("darkblue")} <h4 style={{ display: "inline" }}>Dolfo</h4>

                    <MenuItem link="" icon="info-square">Getting started</MenuItem>

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
                            <h2 className="page-title">{menuBtn("white")} Getting started</h2>
                            <p>This is a simple website to show the <strong>Dolfo components</strong>, developed by me.</p>
                            <p>Use the side menu to navigate.</p>
                            In each page, you will find:
                            <ul>
                                <li>What the component is used for</li>
                                <li>How to use it</li>
                                <li>Its appearance</li>
                                <li>The APIs the component can take</li>
                            </ul>

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
                                    <h2 className="page-title">{menuBtn("white")} {m.children}</h2>
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
}

export class MenuItem extends React.Component<{ readonly link: string, readonly icon: string }>{
    static clickItem = (link: string) => {
        hashHistory.push(homepage + link)
        document.querySelector(".body-content").scrollTo(0, 0)
        document.querySelector(".navigation-menu").classList.remove("show")
    }

    static findLink = (childrenTitle: string) => MenuItems.find(m => m.children === childrenTitle).link

    render = () => {
        const { link, children, icon } = this.props,
        selected = homepage + link === hashHistory.location.pathname

        return <div className={"navigation-menu-item" + (selected ? " selected" : "")} onClick={() => MenuItem.clickItem(link)}>
            <b></b>
            <b></b>
            <Icon type="far" iconKey={icon} large /> {children}
        </div>
    }
}