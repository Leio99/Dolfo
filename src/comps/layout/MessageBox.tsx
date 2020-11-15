import React from "react"
import { CloseIcon } from "./Icon"
import { NotificationMsg } from "./NotificationMsg"

export interface MessageProps{
    readonly position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    readonly title?: string | JSX.Element
    readonly content: string | JSX.Element
    readonly hideDelay?: number
}

export class MessageBox{
    static show = (props: MessageProps) => {
        let message = NotificationMsg.show({
            message: <div className="dolfo-message-box-inner">
                <CloseIcon className="dolfo-message-close" onClick={() => message.close()} />
                {props.title && <h5 className="dolfo-message-box-title">{props.title}</h5>}
                <div className="dolfo-message-box-content">{props.content}</div>
            </div>,
            position: props.position || "top-right",
            className: "dolfo-message-box",
            hideDelay: props.hideDelay
        })
    }
}