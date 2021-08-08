import React, { CSSProperties } from "react"

interface IProps{
    readonly className?: string
    readonly style?: CSSProperties
}

interface CardProps extends IProps{
    readonly title?: string | JSX.Element
}

export class Card extends React.PureComponent<CardProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-card" + (props.className ? (" " + props.className) : "")} style={props.style}>
            {props.title && <div className="dolfo-card-title">{props.title}</div>}
            {props.children}
        </div>
    }
}

export class CardActions extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className="dolfo-card-actions-inner">
            <br />
            <div className={"dolfo-card-actions" + (props.className ? (" " + props.className) : "")} style={props.style}>
                {props.children}
            </div>
        </div>
    }
}