import React, { createRef } from "react"
import { getConstant } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { CloseIcon, Icon } from "./Icon"
import { BaseNotificationProps, showNotification, NotificationPosition, NotificationMsg } from "./NotificationMsg"
import { Tooltip } from "./Tooltip"

interface MessageProps extends BaseNotificationProps{
    /** Defines the position of the message
     * @type NotificationPosition
     */
    readonly position?: NotificationPosition
    /** The title of the message
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** If true, hides the icon for closing the message
     * @type boolean
     */
    readonly hideClose?: boolean
}

export class MessageBox extends React.Component<MessageProps>{
    private ref = createRef<NotificationMsg>()

    static show = (props: MessageProps): Closable => {
        const internalProps = MessageBox.getInternalProps(props),
        messageBox = showNotification({
            ...internalProps,
            message: MessageBox.getInner(props, () => messageBox.close())
        })

        return messageBox
    }

    private static getInner = (props: MessageProps, closeFn: () => void): React.ReactNode => <div className={"dolfo-message-box-inner" + (props.className ? (" " + props.className) : "")}>
        <Tooltip tooltip={getConstant("CLOSE_TEXT")}>
            {!props.hideClose && <CloseIcon className="dolfo-message-close" onClick={() => {
                closeFn()
                props.onClose && props.onClose()
            }} />}
        </Tooltip>
        {props.title && <h5 className="dolfo-message-box-title">
            {!props.hideIcon && <Icon color="var(--blue)" iconKey="circle" />} {props.title}
        </h5>}
        <div className="dolfo-message-box-content">{props.message}</div>
    </div>

    private static getInternalProps = (props: MessageProps): MessageProps => {
        return {
            ...props,
            hideIcon: true,
            className: "dolfo-message-box",
            position: props.position || "top-right"
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        internalProps = MessageBox.getInternalProps(props),
        message = MessageBox.getInner(props, () => this.ref.current.getRef()?.remove())

        return <NotificationMsg {...internalProps} message={message} ref={this.ref} />
    }
}

export const showMessage = MessageBox.show