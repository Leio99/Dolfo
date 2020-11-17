import React from "react"

export interface IProps{
    readonly onClick?: () => void
    readonly text: string | JSX.Element
    readonly selected?: boolean
}

export class MenuVoice extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-menu-voice" + (props.selected ? " selected": "")} onClick={props.onClick}>
            {props.text}
        </div>
    }
}