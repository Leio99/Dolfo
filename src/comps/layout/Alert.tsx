import React, { CSSProperties, createRef } from "react"
import { Constants } from "../shared/Constants"
import Button, { ButtonColors } from "./Button"
import { DialogType } from "./Dialog"
import { CloseIcon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps extends React.PropsWithChildren{
    readonly type?: DialogType
    readonly style?: CSSProperties
    readonly className?: string
    readonly onClose?: () => void
    readonly closable?: boolean
    readonly customAction?: JSX.Element
}

export class Alert extends React.Component<IProps>{
	private ref = createRef<HTMLDivElement>()
    private isComponentMounted = true

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

    closeAlert = (): void => {
        this.props.onClose && this.props.onClose()

        setTimeout(() => this.isComponentMounted && this.ref.current.remove())
    }

    componentWillUnmount = () => this.isComponentMounted = false

    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-alert" + (props.type ? (" " + props.type) : "") + (props.className ? (" " + props.className) : "")} style={props.style} ref={this.ref}>
            <div className="dolfo-alert-content">{props.children}</div>

            {
                props.customAction || (props.closable && <Tooltip tooltip={Constants.CLOSE_TEXT}>
                    <Button type="text" btnColor={this.getBtnColor()} onClick={this.closeAlert}>
                        <CloseIcon large />
                    </Button>
                </Tooltip>)
            }
        </div>
    }
}