import React from "react"

export interface IProps{
    readonly title?: string | JSX.Element
}

export class Card extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className="dolfo-card">
            {props.title && <div className="dolfo-card-title">{props.title}</div>}
            {props.children}
        </div>
    }
}