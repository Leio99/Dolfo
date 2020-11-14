import React from "react"
import { InputProps } from "../../models/InputProps"
import { LoadingIcon } from "./Icon"

export interface IProps extends InputProps{
    readonly type?: "button" | "submit"
    readonly fullSize?: boolean
    readonly smallBtn?: boolean
    readonly textBtn?: boolean
    readonly bigBtn?: boolean
    readonly loading?: boolean
    readonly btnColor?: "red" | "blue" | "green" | "black" | "orange" | "grey" | "white"
}

export class Button extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <button type={props.type || "button"} className={
            "dolfo-button" + 
            (props.btnColor ? (" btn-" + props.btnColor) : "") +
            (props.className ? " " + props.className : "") +
            (props.fullSize ? " full-size" : "") + 
            (props.smallBtn ? " small-button" : "") + 
            (props.textBtn ? " text-btn" : "") + 
            (props.bigBtn ? " big-button" : "")
        }
        style={props.style} disabled={props.disabled || props.loading} onClick={props.onClick ? props.onClick : null}>
            {props.loading && <LoadingIcon spinning />} {props.children}
        </button>
    }
}