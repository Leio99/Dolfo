import React, { CSSProperties } from "react"
import { Icon, LoadingIcon } from "./Icon"
import onClickOutside from "react-onclickoutside"
import { openContextMenu } from "./ContextMenu"

export type BaseColors = "red" | "blue" | "green" | "black" | "orange" | "grey" | "darkblue" | "violet"
export type ButtonColors = BaseColors | "white"

export interface ButtonProps{
    readonly type?: "button" | "submit" | "popup" | "text"
    readonly size?: "full" | "small" | "big"
    readonly loading?: boolean
    readonly circleBtn?: boolean
    readonly btnColor?: ButtonColors
    readonly options?: BtnOptions[]
    readonly popupPosition?: "top" | "bottom"
    readonly iconPopup?: boolean
    readonly className?: string
    readonly style?: CSSProperties
    readonly disabled?: boolean
    readonly onClick?: (e: any) => void
    readonly onMouseDown?: (e: any) => void
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

    togglePopup = (e: any) => {
        if(this.props.disabled)
            return

        if(!this.props.iconPopup)
            this.setState({ openPopup: !this.state.openPopup })
        else if(this.props.options){
            openContextMenu(e, this.props.options.map(o => {
                return {
                    label: o.text,
                    onClick: o.onClick,
                    disabled: o.disabled
                }
            }))
        }
    }

    closePopup = () => this.setState({ openPopup: false })

    handleClickOutside = () => this.props.type === "popup" && this.props.options && this.closePopup()

    render = (): JSX.Element => {
        const { props } = this,
        btnType = props.type === "popup" && props.options ? "popup" : (props.type || "button"),
        { openPopup } = this.state

        if(btnType === "popup"){
            const popupDir = props.popupPosition || "bottom"

            return <div className={"dolfo-popup-button-container" + (props.className ? (" " + props.className) : "") + (props.iconPopup ? " icon-popup" : "") + (props.disabled ? " disabled" : "")} onClick={this.togglePopup} style={props.style}>
                <div className={"dolfo-popup-options" + (openPopup ? " show" : "") + (" pos-" + popupDir)}>
                    {
                        props.options?.map(opt => <div className={"dolfo-popup-option" + (opt.disabled ? " disabled" : "")} onClick={!opt.disabled && !props.disabled ? opt.onClick : (e: any) => e.stopPropagation()}>
                            {opt.text}
                        </div>)
                    }
                </div>

                <div className={"dolfo-button dolfo-popup-button" + (!props.iconPopup ? (" btn-" + (props.btnColor || "blue")) : "")}>
                    {
                        !props.iconPopup && <div className="dolfo-popup-arrow">
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
            (props.size === "big" ? " big-button" : "")
        } style={props.style} disabled={props.disabled || props.loading} onClick={props.onClick} onMouseDown={props.onMouseDown}>
            {props.loading && <LoadingIcon spinning />} {props.circleBtn && props.loading ? null : props.children}
        </button>
    }
}

export default onClickOutside(Button)