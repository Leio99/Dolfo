import React from "react"
import { ButtonColors } from "./Button"

interface IProps{
    readonly color?: ButtonColors
    readonly size?: "small" | "big"
}

export class Label extends React.Component<React.PropsWithChildren<IProps>>{
    render = () => {
        const { props } = this

        return <label className={"dolfo-label" + (props.size ? " " + props.size : "") + (props.color ? " " + props.color : "")}>
            {props.children}
        </label>
    }
}