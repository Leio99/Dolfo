import React, { CSSProperties } from "react"

interface CardActionsProps{
    readonly className?: string
    readonly style?: CSSProperties
    readonly tabLayout?: boolean
}

interface CardProps extends CardActionsProps{
    readonly title?: string | JSX.Element
    readonly onDoubleClick?: (e: any) => void
}

export class Card extends React.PureComponent<CardProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-card" + (props.tabLayout ? " tab-layout" : "") + (!props.title ? " no-title" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onDoubleClick={props.onDoubleClick}>
            {props.title && <div className="dolfo-card-title">{props.title}</div>}
            {props.children}
        </div>
    }
}

export class CardActions extends React.PureComponent<CardActionsProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className="dolfo-card-actions-inner">
            <br />
            <div className={"dolfo-card-actions" + (props.className ? (" " + props.className) : "")} style={props.style}>
                {props.children}
            </div>
        </div>
    }
}