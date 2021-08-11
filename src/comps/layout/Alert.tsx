import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Constants } from "../shared/Constants"
import Button, { ButtonColors } from "./Button"
import { DialogType } from "./Dialog"
import { CloseIcon } from "./Icon"

interface IProps{
    readonly type?: DialogType
    readonly style?: CSSProperties
    readonly className?: string
}

export class Alert extends React.Component<IProps>{
    getBtnColor = (): ButtonColors => {
        const { type } = this.props

        switch(type){
            case "success":
                return "green"
            case "error":
                return "red"
            case "info":
                return "darkblue"
            case "warning":
                return "orange"
            default:
                return "grey"
        }
    }

    closeAlert = (): void => ReactDOM.findDOMNode(this).remove()

    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-alert" + (props.type ? (" " + props.type) : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            <div className="dolfo-alert-content">{props.children}</div>
            
            <Button textBtn btnColor={this.getBtnColor()} className="dolfo-alert-close" onClick={this.closeAlert} tooltip={Constants.CLOSE_TEXT}>
                <CloseIcon large />
            </Button>
        </div>
    }
}