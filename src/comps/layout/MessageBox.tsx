import React from "react"
import { Constants } from "../shared/Constants"
import { CloseIcon } from "./Icon"
import { NotificationDelay, NotificationMsg, NotificationPosition } from "./NotificationMsg"

interface MessageProps{
    readonly position?: NotificationPosition,
    readonly title?: string | JSX.Element
    readonly content: string | JSX.Element
    readonly hideDelay?: NotificationDelay
	readonly onClose?: () => void
}

export class MessageBox{
    static show = (props: MessageProps) => {
        let message = NotificationMsg.show({
            message: <div className="dolfo-message-box-inner">
                <CloseIcon className="dolfo-message-close" onClick={() => message.close()} tooltip={Constants.CLOSE_TEXT} />
                {props.title && <h5 className="dolfo-message-box-title">{props.title}</h5>}
                <div className="dolfo-message-box-content">{props.content}</div>
            </div>,
            position: props.position || NotificationPosition.TOP_RIGHT,
            className: "dolfo-message-box",
            hideDelay: props.hideDelay,
			onClose: props.onClose
        })
    }
}
