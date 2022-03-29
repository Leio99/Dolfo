import React from "react"
import { SideMenu } from "./SideMenu"

export class ListSideMenu extends SideMenu{
    render = (): JSX.Element => {
        const { props } = this,
        { opened } = this.state

        return <div className={"dolfo-list-side-menu dolfo-list-side-menu-"+ (props.menuColor || "blue") + (opened ? " opened": "")}>
            {props.children}
        </div>
    }
}