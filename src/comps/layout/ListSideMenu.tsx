import React from "react"
import { BaseSideMenuProps, SideMenu } from "./SideMenu"

export class ListSideMenu extends SideMenu<BaseSideMenuProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-list-side-menu dolfo-list-side-menu-"+ (props.menuColor || "blue")}>
            {props.children}
        </div>
    }
}