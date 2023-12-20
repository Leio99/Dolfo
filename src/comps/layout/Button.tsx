import React, { CSSProperties } from "react"
import { Icon, LoadingIcon } from "./Icon"
import onClickOutside from "react-onclickoutside"

export type BaseColors = "red" | "blue" | "green" | "black" | "orange" | "grey" | "darkblue" | "violet"
export type ButtonColors = BaseColors | "white"

export interface ButtonProps extends React.PropsWithChildren{
    readonly type?: "button" | "submit" | "popup" | "text"
    readonly size?: "full" | "small" | "big"
    readonly loading?: boolean
    readonly circleBtn?: boolean
    readonly btnColor?: ButtonColors
    readonly options?: BtnOptions[]
    readonly popupPosition?: "top" | "bottom"
    readonly className?: string
    readonly style?: CSSProperties
    readonly disabled?: boolean
    readonly outline?: boolean
    readonly onClick?: (e: React.MouseEvent) => void
    readonly onMouseDown?: (e: React.MouseEvent) => void
}

export interface BtnOptions{
    readonly text: string | JSX.Element
    readonly onClick: () => void
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

    render = (): JSX.Element => {
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