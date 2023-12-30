import React, { CSSProperties } from "react"
import { BaseColors } from "./Button"

interface IProps extends React.PropsWithChildren{
    /** The color of the display
     * @type BaseColors
     */
    readonly color?: BaseColors
    /** The title of the display
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Additional style for the display
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the display
     * @type string
     */
    readonly className?: string
}

export class Display extends React.Component<IProps>{
    render = () => {
        const { props } = this

        return <div className={"dolfo-display color-" + (props.color || "blue") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.title && <h3 className="dolfo-display-title">
                {props.title}    
            </h3>}

            <div className="dolfo-display-content">
                {props.children}
            </div>
        </div>
    }
}