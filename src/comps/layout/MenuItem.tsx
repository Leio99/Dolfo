import React from "react"

export interface IProps{
    readonly onClick?: () => void
    readonly selected?: boolean
}

export class MenuItem extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <li className={"dolfo-menu-voice" + (props.selected ? " selected": "")} onClick={props.onClick}>
            {props.children}
        </li>
    }
}