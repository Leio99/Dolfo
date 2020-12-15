import React from "react"
import { BtnOptions } from "../shared/models/BtnOptions"
import { InputProps } from "../shared/models/InputProps"
import { Icon, LoadingIcon } from "./Icon"
import onClickOutside from "react-onclickoutside"

export type BaseColors = "red" | "blue" | "green" | "black" | "orange" | "grey" | "white" | "darkblue"
export type ButtonColors = BaseColors | "white"

export interface IProps extends InputProps{
    readonly type?: "button" | "submit" | "popup"
    readonly fullSize?: boolean
    readonly smallBtn?: boolean
    readonly textBtn?: boolean
    readonly bigBtn?: boolean
    readonly loading?: boolean
    readonly circleBtn?: boolean
    readonly btnColor?: ButtonColors
    readonly options?: BtnOptions[]
    readonly popupPosition?: "top" | "bottom"
    readonly tooltip?: string
    readonly iconPopup?: boolean
}
export interface IState{
    readonly openPopup: boolean
}

class Button extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            openPopup: false
        }
    }

    togglePopup = () => this.setState({ openPopup: !this.state.openPopup })

    closePopup = () => this.setState({ openPopup: false })

    handleClickOutside = () => this.props.type === "popup" && this.props.options && this.closePopup()

    render = (): JSX.Element => {
        const props = this.props,
        btnType = props.type === "popup" && props.options ? "popup" : (props.type || "button"),
        { openPopup } = this.state

        if(btnType === "popup"){
            const popupDir = props.popupPosition || "bottom"

            return <div className={"dolfo-popup-button-container" + (props.className ? (" " + props.className) : "") + (props.iconPopup ? " icon-popup" : "")} onClick={this.togglePopup} data-tooltip={props.tooltip}>
                <div className={"dolfo-popup-options" + (openPopup ? " show" : "") + (" pos-" + popupDir)}>
                    {
                        props.options?.map(opt => {
                            if(!opt.hiddenIf)
                                return <div className="dolfo-popup-option" onClick={opt.onClick}>
                                    {opt.text}
                                </div>

                            return null
                        })
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

        return <button type={btnType} className={
            "dolfo-button" + 
            (props.btnColor ? (" btn-" + props.btnColor) : "") +
            (props.className ? " " + props.className : "") +
            (props.fullSize ? " full-size" : "") + 
            (props.smallBtn ? " small-button" : "") + 
            (props.textBtn ? " text-btn" : "") + 
            (props.circleBtn ? " circle-btn" : "") + 
            (props.bigBtn ? " big-button" : "")
        } data-tooltip={props.tooltip} style={props.style} disabled={props.disabled || props.loading} onClick={props.onClick}>
            {props.loading && <LoadingIcon spinning />} {props.circleBtn && props.loading ? null : props.children}
        </button>
    }
}

export default onClickOutside(Button)