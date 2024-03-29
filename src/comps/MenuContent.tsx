import React, { createRef } from "react"
import { NavigateFunction, Routes } from "react-router"
import { Location, Route } from "react-router-dom"
import { Switch as InputSwitch } from "./form/Switch"
import Button from "./layout/Button"
import { Icon } from "./layout/Icon"
import { Tooltip } from "./layout/Tooltip"
import { MenuItems } from "./presentation/Menu"
import { IconKey } from "./shared/models/IconModel"
import { isDarkTheme, toggleDarkTheme } from "./shared/utility"

export interface MenuContentProps{
    readonly history: NavigateFunction
    readonly location: Location
}

export const homepage = process.env.PUBLIC_URL + "/"

export const goToApiBlock = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement

    document.querySelector(".body-content").scrollTo({
        top: element.offsetTop - 10,
        behavior: "smooth"
    })

    element.classList.add("api-animate")

    setTimeout(() => element.classList.remove("api-animate"), 500)
}

export class MenuContent extends React.Component<MenuContentProps, { readonly darkTheme: boolean }>{
    private ref = createRef<HTMLDivElement>()
    constructor(props: MenuContentProps){
        super(props)

        this.state = {
            darkTheme: isDarkTheme()
        }
    }

    componentDidMount = () => {
        if(window.location.pathname !== homepage){
            const nav = this.ref.current.querySelector(".navigation-menu"),
            selected = nav.querySelector(".navigation-menu-item.selected"),
            top = selected.getBoundingClientRect().top - 10

            setTimeout(() => nav.scrollTo(0, top))
        }
    }

    toggleSideMenu = () => document.querySelector(".navigation-menu").classList.toggle("show")

    toggleDarkMode = () => this.setState({ darkTheme: !this.state.darkTheme }, toggleDarkTheme)

    render = (): React.ReactNode => {
        const menuBtn = (color: "darkblue" | "white") => <Button circleBtn size="big" btnColor={color} onClick={this.toggleSideMenu} className="menu-toggler">
            <Icon iconKey="bars" type="far" />
        </Button>,
        { darkTheme } = this.state

        return <div className="page-content" ref={this.ref}>
            <div className="navigation-menu">
                <div style={{ float: "right", color: "var(--white)", marginRight: 10 }}>
                    <Tooltip tooltip="Toggle dark mode">
                        <InputSwitch checked={darkTheme} label={<Icon iconKey="moon" />} onChange={this.toggleDarkMode} />
                    </Tooltip>
                </div>

                {menuBtn("darkblue")} <h4 style={{ display: "inline" }}>Dolfo</h4>

                {
                    MenuItems.filter(m => m.section === "base").map((m, i) => <MenuItem {...m} {...this.props} key={"base_" + i}>{m.title}</MenuItem>)
                }

                <div className="navigation-menu-title">Form</div>
                {
                    MenuItems.filter(m => m.section === "form").map((m, i) => <MenuItem {...m} {...this.props} key={"form_" + i}>{m.title}</MenuItem>)
                }

                <div className="navigation-menu-title">Layout</div>
                {
                    MenuItems.filter(m => m.section === "layout").map((m, i) => <MenuItem {...m} {...this.props} key={"layout_" + i}>{m.title}</MenuItem>)
                }
            </div>

            <div className="body-content">
                <Routes>
                    {
                        MenuItems.map(m => {
                            const Component = m.component

                            return <Route path={homepage + m.link} key={m.link} element={<React.Fragment>
                                <h2 className="page-title">{menuBtn("white")} {m.title}</h2>
                                {React.createElement(Component, this.props)}
                            </React.Fragment>} />
                        })
                    }
                </Routes>

                <div className="footer">Created by Leonardo Grandolfo <span>IT</span> &copy; {new Date().getFullYear()}</div>
            </div>
        </div>
    }
}

export class MenuItem extends React.Component<React.PropsWithChildren<MenuContentProps & { readonly link: string, readonly icon: IconKey }>>{
    static clickItem = (link: string, navigate: NavigateFunction) => {
        navigate(homepage + link)
        document.querySelector(".body-content").scrollTo(0, 0)
        document.querySelector(".navigation-menu").classList.remove("show")
    }

    static findLink = (childrenTitle: string) => MenuItems.find(m => m.title === childrenTitle).link

    render = () => {
        const { link, children, icon, location, history } = this.props,
        selected = homepage + link === location.pathname

        return <div className={"navigation-menu-item" + (selected ? " selected" : "")} onClick={() => MenuItem.clickItem(link, history)}>
            <b></b>
            <b></b>
            <Icon type="far" iconKey={icon} large /> {children}
        </div>
    }
}