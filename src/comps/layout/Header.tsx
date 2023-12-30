import React, { CSSProperties } from "react"
import Button, { ButtonColors } from "./Button"
import { BaseIconProps, Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    /** Defines the title of the header
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Defines the color of the header
     * @type ButtonColors
     */
    readonly headerColor?: ButtonColors
    /** Defines the icon for the menu button
     * @type BaseIconProps
     */
    readonly menuTogglerIcon?: BaseIconProps
    /** Additional style for the menu button
     * @type CSSProperties
     */
    readonly menuTogglerStyle?: CSSProperties
    /** Additional className for the header
     * @type string
     */
    readonly className?: string
    /** Additional style for the dropdown
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Function triggered when clicking the menu button
     * @type Function
     */
    readonly menuTogglerFn?: () => void
}

export class Header extends React.PureComponent<IProps>{
    render = (): React.ReactNode => {
        const { props } = this,
        icon = props.menuTogglerIcon || { type: "far", iconKey: "bars" }

        return <div className={"dolfo-header dolfo-header-" + (props.headerColor || "blue") + (props.className ? (" " + props.className) : "")} style={props.style}>
            {
                props.menuTogglerFn && <Button circleBtn size="big" onClick={this.props.menuTogglerFn} btnColor={props.headerColor || "blue"} className="dolfo-menu-button" style={props.menuTogglerStyle}>
                    <Icon {...icon} />
                </Button>
            }

            {props.title && <h2 className="dolfo-header-title">{props.title}</h2>}

            {props.children}
        </div>
    }
}