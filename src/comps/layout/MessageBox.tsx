import React from "react"
import { Constants } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { CloseIcon, Icon } from "./Icon"
import { BaseNotificationProps, showNotification, NotificationPosition } from "./NotificationMsg"

interface MessageProps extends BaseNotificationProps{
    readonly content: string | JSX.Element
    readonly position?: NotificationPosition,
    readonly title?: string | JSX.Element
}

export class MessageBox{
    static show = (props: MessageProps): Closable => {
        const message = showNotification({
            message: <div className={"dolfo-message-box-inner" + (props.className ? (" " + props.className) : "")} style={props.style}>
                <CloseIcon className="dolfo-message-close" onClick={() => {
                    message.close()
                    props.onClose && props.onClose()
                }} tooltip={Constants.CLOSE_TEXT} />
                {props.title && <h5 className="dolfo-message-box-title">
                    {!props.hideIcon && <Icon color="var(--blue)" iconKey="circle" />} {props.title}
                </h5>}
                <div className="dolfo-message-box-content">{props.content}</div>
            </div>,
            position: props.position || "top-right",
            className: "dolfo-message-box",
            hideDelay: props.hideDelay,
			onClose: props.onClose,
            hideIcon: true
        })
        
        return message
    }
}

export const showMessage = MessageBox.show