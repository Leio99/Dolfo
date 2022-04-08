import React from "react"
import ReactDOM from "react-dom"
import { Constants } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { CloseIcon, Icon } from "./Icon"
import { BaseNotificationProps, showNotification, NotificationPosition, NotificationMsg } from "./NotificationMsg"

interface MessageProps extends BaseNotificationProps{
    readonly position?: NotificationPosition
    readonly title?: string | JSX.Element
}

export class MessageBox extends React.Component<MessageProps>{
    static show = (props: MessageProps): Closable => {
        const internalProps = MessageBox.getInternalProps(props),
        messageBox = showNotification({
            ...internalProps,
            message: MessageBox.getInner(props, () => messageBox.close())
        })

        return messageBox
    }

    private static getInner = (props: MessageProps, closeFn: () => void): JSX.Element => <div className={"dolfo-message-box-inner" + (props.className ? (" " + props.className) : "")} style={props.style}>
        <CloseIcon className="dolfo-message-close" onClick={() => {
            closeFn()
            props.onClose && props.onClose()
        }} tooltip={Constants.CLOSE_TEXT} />
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

    render = (): JSX.Element => {
        const { props } = this,
        internalProps = MessageBox.getInternalProps(props),
        message = MessageBox.getInner(props, () => ReactDOM.findDOMNode(this)?.remove())

        return <NotificationMsg {...internalProps} message={message} />
    }
}

export const showMessage = MessageBox.show