import _ from "lodash"
import React from "react"
import { CSSProperties } from "react"
import { createRoot } from "react-dom/client"
import { Constants } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { DialogType } from "./Dialog"
import { CheckCircleOutlineIcon, ErrorCircleOutlineIcon, ExclamationCircleIcon, FullIconProps, Icon, InfoCircleOutlineIcon, LoadingIcon, WarningIconOutline } from "./Icon"

export type NotificationPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"
export type NotificationDelay = number | "never"

export interface BaseNotificationProps{
    readonly hideIcon?: boolean
    readonly hideDelay?: NotificationDelay
    readonly style?: CSSProperties
    readonly className?: string
	readonly onClose?: () => void
}

interface NotificationProps extends BaseNotificationProps{
    readonly type?: DialogType | "loading"
    readonly icon?: FullIconProps
    readonly message: string | JSX.Element
    readonly position?: NotificationPosition | "centered-top" | "centered-bottom"
    readonly dismissOnClick?: boolean
}

export class NotificationMsg{
    static showError = (message: string | JSX.Element): Closable => {
        return showNotification({
            message,
            type: "error"
        })
    }

    static showInfo = (message: string | JSX.Element): Closable => {
        return showNotification({
            message,
            type: "info"
        })
    }

    static showSuccess = (message: string | JSX.Element): Closable => {
        return showNotification({
            message,
            type: "success"
        })
    }

    static showLoading = (message?: string | JSX.Element): Closable => {
        return showNotification({
            message: message || Constants.LOADING_TEXT,
            type: "loading"
        })
    }

    static showWarning = (message: string | JSX.Element): Closable => {
        return showNotification({
            message,
            type: "warning"
        })
    }

    static show = (data: string | NotificationProps): Closable => {
        const props = _.isString(data) ? { message: data } : data,
        notification = document.createElement("div"),
        getIcon = (type: string) => {
            if(type === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
            if(type === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
            if(type === "loading") return <LoadingIcon spinning />
            if(type === "success") return <CheckCircleOutlineIcon color="var(--green)" />
            if(type === "warning") return <WarningIconOutline color="var(--orange)" />

            return <ExclamationCircleIcon color="var(--blue)" />
        },
        closeFunc = () => {
            notification.remove()

            if(!notification.classList.contains("removed"))
                NotificationMsg.moveNotifications()
            
            notification.classList.add("removed")
			
			props.onClose && props.onClose()
        },
        position = props.position || "centered-top"
        
        props.type !== "loading" && props.hideDelay !== "never" && setTimeout(closeFunc, props.hideDelay ? props.hideDelay : 2000)
        
        document.body.appendChild(notification);

        setTimeout(NotificationMsg.moveNotifications)
        
        createRoot(notification).render(<div className={"dolfo-notification " + position + (props.className ? (" " + props.className) : "")} style={props.style} onClick={props.type !== "loading" && props.dismissOnClick ? closeFunc : null}>
            {props.icon ? <Icon {...props.icon} /> : !props.hideIcon ? getIcon(props.type) : null} {props.message}
        </div>)

        return new Closable(closeFunc)
    }

    private static moveNotifications = (): void => {
        ["bottom-left", "bottom-right", "top-left", "top-right", "centered-top", "centered-bottom"].forEach(dir => {
            const nots = document.querySelectorAll(`.dolfo-notification.${dir}`)
            let base = 0

            Array.from(nots).filter((_: any, i: number) => i < nots.length).reverse().forEach((not: any) => {
                if(dir.indexOf("bottom") !== -1)
                    not.style.marginBottom = base + "px"
                else
                    not.style.marginTop = base + "px"
                
                base += not.clientHeight + 15
            })
        })
    }
}

export const showNotification = NotificationMsg.show

export const showError = NotificationMsg.showError

export const showInfo = NotificationMsg.showInfo

export const showWarning = NotificationMsg.showWarning

export const showSuccess = NotificationMsg.showSuccess