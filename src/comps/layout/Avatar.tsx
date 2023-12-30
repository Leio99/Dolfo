import React from "react"
import { CSSProperties } from "react"

interface IProps{
    /** Defines the source of the image
     * @type string
     * @required
     */
    readonly imageSource: string
    /** Additional className for the avatar
     * @type string
     */
    readonly className?: string
    /** Additional style for the avatar
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Defines the size of the avatar
     * @type "small" | "medium" | "large" | "xl
     */
    readonly size?: "small" | "medium" | "large" | "xl"
}

export class Avatar extends React.Component<IProps>{
    render = (): React.ReactNode => {
        const { props } = this

        return <div className={"dolfo-avatar " + (props.size || "medium") + (props.className ? (" " + props.className) : "")} style={props.style}>
            <img src={props.imageSource} alt="avatar" />
        </div> 
    }
}