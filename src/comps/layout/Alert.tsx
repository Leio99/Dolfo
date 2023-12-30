import React, { CSSProperties, createRef } from "react"
import { getConstant } from "../shared/Constants"
import Button, { ButtonColors } from "./Button"
import { DialogType } from "./Dialog"
import { CloseIcon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps extends React.PropsWithChildren{
    /** The type of alert
     * @type DialogType
     */
    readonly type?: DialogType
    /** Additional style for the alert
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the alert
     * @type string
     */
    readonly className?: string
    /** Defines if the alert can be closed */
    readonly closable?: boolean
    /** Defines a custom action instead of closing
     * @type ReactNode
     */
    readonly customAction?: React.ReactNode
    /** Function triggered when closing the alert
     * @type Function
     */
    readonly onClose?: () => void
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

    render = (): React.ReactNode => {
        const { props } = this

        return <div className={"dolfo-alert" + (props.type ? (" " + props.type) : "") + (props.className ? (" " + props.className) : "")} style={props.style} ref={this.ref}>
            <div className="dolfo-alert-content">{props.children}</div>

            {
                props.customAction || (props.closable && <Tooltip tooltip={getConstant("CLOSE_TEXT")}>
                    <Button type="text" btnColor={this.getBtnColor()} onClick={this.closeAlert}>
                        <CloseIcon large />
                    </Button>
                </Tooltip>)
            }
        </div>
    }
}