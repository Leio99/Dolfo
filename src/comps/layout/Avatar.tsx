import React, { CSSProperties } from "react"

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
    /** Specifices an alternative string for the avatar. If 'imageSource' is not set, it takes the first letter of the string and uses it as the avatar.
     * Note: use 'style' prop to set the background color and additional styles
     * @type string
     */
    readonly alternativeStr?: string
}

export class Avatar extends React.Component<IProps>{
    render = (): React.ReactNode => {
        const { props } = this

        return <div className={"dolfo-avatar " + (props.size || "medium") + (props.className ? (" " + props.className) : "") + (!props.imageSource && props.alternativeStr ? " dolfo-avatar-alternative" : "")} style={props.style}>
            {props.imageSource ? <img src={props.imageSource} alt="avatar" /> : props.alternativeStr ? props.alternativeStr[0].toUpperCase() : <></>}
        </div> 
    }
}