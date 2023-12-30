import React, { CSSProperties } from "react"
import { getConstant } from "../shared/Constants"
import { ButtonColors } from "./Button"
export { SubMenu } from "./SubMenu"
export { MenuItem } from "./MenuItem"

export interface BaseSideMenuProps extends React.PropsWithChildren{
    /** Additional className for the menu
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the menu
     * @type string
     */
    readonly className?: string
    /** Defines the color of the menu
     * @type ButtonColors
     */
    readonly menuColor?: ButtonColors
}

interface IProps extends BaseSideMenuProps{
    /** Defines the direction which the menu will slide from
     * @type "left" | "right"
     * @default "left"
     */
    readonly direction?: "left" | "right"
    /** Defines if the menu is opened by default
     * @type boolean
     */
    readonly opened?: boolean
    /** Function triggered when the menu is toggled
     * @type Function
     */
    readonly onToggle?: () => void
}

interface IState{
    readonly opened: boolean
}

export class SideMenu extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: props.opened || false
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
                opened: this.props.opened
            })
        }
    }

    toggleMenu = (): void => {
        this.setState({ opened: !this.state.opened })

        this.props.onToggle && this.props.onToggle()
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { opened } = this.state

        return <div className={"dolfo-side-menu dolfo-side-menu-"+ (props.menuColor || "blue") + (opened ? " opened": "") + (props.className ? " " + props.className : "") + " direction-" + (props.direction || "left")} style={props.style}>
            <div className="dolfo-menu-overlay" onClick={this.toggleMenu}></div>
            {props.children}

            <div className="dolfo-side-menu-close">
                <span onClick={this.toggleMenu}>{getConstant("CLOSE_TEXT")}</span>
            </div>
        </div>
    }
}