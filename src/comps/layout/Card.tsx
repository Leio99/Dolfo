import React, { CSSProperties } from "react"

interface CardActionsProps extends React.PropsWithChildren{
    /** Additional className for the component
     * @type string
     */
    readonly className?: string
    /** Additional style for the component
     * @type CSSProperties
     */
    readonly style?: CSSProperties
}

interface CardProps extends CardActionsProps{
    /** The type of layout of the card
     * @type "flat" | "tab"
     */
    readonly layout?: "flat" | "tab"
    /** The title fo the card
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Function triggered when doubleclicking the card
     * @type Functrion
     * @param e React.MouseEvent
     */
    readonly onDoubleClick?: (e: React.MouseEvent) => void
}

export class Card extends React.PureComponent<CardProps>{
    render = (): React.ReactNode => {
        const { props } = this,
        layout = " " + (props.layout || "flat") + "-layout"

        return <div className={"dolfo-card" + layout + (!props.title ? " no-title" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onDoubleClick={props.onDoubleClick}>
            {props.title && <div className="dolfo-card-title">{props.title}</div>}
            {props.children}
        </div>
    }
}

export class CardActions extends React.PureComponent<CardActionsProps>{
    render = (): React.ReactNode => {
        const { props } = this

        return <div className="dolfo-card-actions-inner">
            <br />
            <div className={"dolfo-card-actions" + (props.className ? (" " + props.className) : "")} style={props.style}>
                {props.children}
            </div>
        </div>
    }
}