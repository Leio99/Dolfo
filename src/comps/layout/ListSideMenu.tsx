import React from "react"
import { BaseSideMenuProps } from "./SideMenu"

export class ListSideMenu extends React.Component<BaseSideMenuProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-list-side-menu dolfo-list-side-menu-" + (props.menuColor || "blue") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.children}
        </div>
    }
}