import React, { CSSProperties } from "react"

interface CardActionsProps extends React.PropsWithChildren{
    readonly className?: string
    readonly style?: CSSProperties
    readonly layout?: "flat" | "tab"
}

interface CardProps extends CardActionsProps{
    readonly title?: string | JSX.Element
    readonly onDoubleClick?: (e: any) => void
}

export class Card extends React.PureComponent<CardProps>{
    render = (): JSX.Element => {
        const { props } = this,
        layout = " " + (props.layout || "flat") + "-layout"

        return <div className={"dolfo-card" + layout + (!props.title ? " no-title" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onDoubleClick={props.onDoubleClick}>
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