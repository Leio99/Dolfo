import React, { CSSProperties } from "react"
import { Icon, LoadingIcon } from "./Icon"
import onClickOutside from "react-onclickoutside"

export type BaseColors = "red" | "blue" | "green" | "black" | "orange" | "grey" | "darkblue" | "violet"
export type ButtonColors = BaseColors | "white"

export interface ButtonProps extends React.PropsWithChildren{
    /** The type of button
     * @type "button" | "submit" | "popup" | "text"
     */
    readonly type?: "button" | "submit" | "popup" | "text"
    /** The size of the button
     * @type "full" | "small" | "big"
     */
    readonly size?: "full" | "small" | "big"
    /** Defines if the button is loading
     * @type boolean
     */
    readonly loading?: boolean
    /** Defines if the button has a circled shape
     * @type boolean
     */
    readonly circleBtn?: boolean
    /** Determines the color of the button
     * @type ButtonColors
     */
    readonly btnColor?: ButtonColors
    /** If type is 'popup', defines the options of the popup
     * @type BtnOptions[]
     */
    readonly options?: BtnOptions[]
    /** If type is 'popup', defines the position where the popup will show
     * @type "top" | "bottom"
     * @default "botton"
     */
    readonly popupPosition?: "top" | "bottom"
    /** Additional className for the button
     * @type string
     */
    readonly className?: string
    /** Additional style for the button
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Defines if the button is disabled
     * @type boolean
     */
    readonly disabled?: boolean
    /** Defines the layout of the button showing an outlined button
     * @type boolean
     */
    readonly outline?: boolean
    /** Function triggered when clicking the button
     * @type Function
     * @param e React.MouseEvent
     */
    readonly onClick?: (e: React.MouseEvent) => void
    /** Functrion triggered on mouse down on the button
     * @type Function
     * @param e React.MouseEvent
     */
    readonly onMouseDown?: (e: React.MouseEvent) => void
}

export interface BtnOptions{
    /** The text of the option
     * @type ReactNode
     * @required
     */
    readonly text: React.ReactNode
    /** Function triggered when clicking the option
     * @type Function
     * @required
     */
    readonly onClick: () => void
    /** Defines if the option is disabled
     * @type boolean
     */
    readonly disabled?: boolean
}

interface IState{
    readonly openPopup: boolean
}

class Button extends React.PureComponent<ButtonProps, IState>{
    constructor(props: ButtonProps){
        super(props)

        this.state = {
            openPopup: false
        }
    }

    togglePopup = () => {
        if(this.props.disabled)
            return

        this.setState({ openPopup: !this.state.openPopup })
    }

    closePopup = () => this.setState({ openPopup: false })

    handleClickOutside = () => this.props.type === "popup" && this.props.options && this.closePopup()

    render = (): React.ReactNode => {
        const { props } = this,
        btnType = props.type === "popup" && props.options ? "popup" : (props.type || "button"),
        { openPopup } = this.state

        if(btnType === "popup"){
            const popupDir = props.popupPosition || "bottom"

            return <div className={"dolfo-popup-button-container" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} onClick={this.togglePopup} style={props.style}>
                <div className={"dolfo-popup-options" + (openPopup ? " show" : "") + (" pos-" + popupDir)}>
                    {
                        props.options?.map((opt, i) => <div className={"dolfo-popup-option" + (opt.disabled ? " disabled" : "")} onClick={!opt.disabled && !props.disabled ? opt.onClick : e => e.stopPropagation()} key={i}>
                            {opt.text}
                        </div>)
                    }
                </div>

                <div className={"dolfo-button dolfo-popup-button btn-" + (props.btnColor || "blue")}>
                    {
                        <div className="dolfo-popup-arrow">
                            <Icon iconKey="caret-down" />
                        </div>
                    }

                    <div className="dolfo-popup-button-content">{props.children}</div>
                </div>
            </div>
        }

        return <button type={btnType === "text" ? "button" : btnType} className={
            "dolfo-button" + 
            (props.btnColor ? (" btn-" + props.btnColor) : "") +
            (props.className ? " " + props.className : "") +
            (props.size === "full" ? " full-size" : "") + 
            (props.size === "small" ? " small-button" : "") + 
            (props.type === "text" ? " text-btn" : "") + 
            (props.circleBtn ? " circle-btn" : "") + 
            (props.size === "big" ? " big-button" : "") + 
            (props.outline ? " outline" : "")
        } style={props.style} disabled={props.disabled || props.loading} onClick={props.onClick} onMouseDown={props.onMouseDown}>
            {props.loading && <LoadingIcon className="btn-loading-icon" spinning />}{props.circleBtn && props.loading ? <></> : props.children}
        </button>
    }
}

export default onClickOutside(Button)