import React, { CSSProperties } from "react"

export interface IProps{
    readonly title?: string | JSX.Element
    readonly className?: string
    readonly style?: CSSProperties
}

export class Card extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-card" + (props.className ? (" " + props.className) : "")} style={props.style}>
            {props.title && <div className="dolfo-card-title">{props.title}</div>}
            {props.children}
        </div>
    }
}