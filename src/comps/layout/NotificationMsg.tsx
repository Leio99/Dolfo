import _ from "lodash"
import React, { createRef } from "react"
import { CSSProperties } from "react"
import { createRoot } from "react-dom/client"
import { Constants } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { DialogType } from "./Dialog"
import { CheckCircleOutlineIcon, ErrorCircleOutlineIcon, ExclamationCircleIcon, FullIconProps, Icon, InfoCircleOutlineIcon, LoadingIcon, WarningIconOutline } from "./Icon"

export type NotificationPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"
export type NotificationDelay = number | "never"

export interface BaseNotificationProps{
    readonly message: string | React.ReactNode
    readonly hideIcon?: boolean
    readonly hideDelay?: NotificationDelay
    readonly style?: CSSProperties
    readonly className?: string
	readonly onClose?: () => void
}

interface NotificationProps extends BaseNotificationProps{
    readonly type?: DialogType | "loading"
    readonly icon?: FullIconProps
    readonly position?: NotificationPosition | "centered-top" | "centered-bottom"
    readonly dismissOnClick?: boolean
    readonly isStatic?: boolean
}

export class NotificationMsg extends React.Component<NotificationProps>{
    private ref = createRef<HTMLDivElement>()

    getRef = () => this.ref.current

    static showError = (message: string | React.ReactNode): Closable => showNotification({
        message,
        type: "error"
    })

    static showInfo = (message: string | React.ReactNode): Closable => showNotification({
        message,
        type: "info"
    })

    static showSuccess = (message: string | React.ReactNode): Closable => showNotification({
        message,
        type: "success"
    })

    static showLoading = (message?: string | React.ReactNode): Closable => showNotification({
        message: message || Constants.LOADING_TEXT,
        type: "loading"
    })

    static showWarning = (message: string | React.ReactNode): Closable => showNotification({
        message,
        type: "warning"
    })

    static show = (data: string | NotificationProps): Closable => {
        let interval: NodeJS.Timeout

        const props = _.isString(data) ? { message: data } : data,
        notification = document.createElement("div"),
        root = createRoot(notification),
        delay = props.hideDelay ?? 2000,
        closeFunc = () => {
            NotificationMsg.onClose(notification, props)
            root.unmount()
        }
        
        document.body.appendChild(notification)

        setTimeout(NotificationMsg.moveNotifications)
        
        root.render(<NotificationMsg {...props} isStatic={false} onClose={closeFunc} />)

        if(delay && delay !== "never" && props.type !== "loading"){
            let percentage = (delay - 200) / 100

            const fn = () => {
                if(notification.classList.contains("removed"))
                    return
                
                const not = notification.childNodes[0] as HTMLElement,
                current = not.querySelector(".dolfo-notification-elapser") as HTMLElement,
                elapser = current || document.createElement("div"),
                perc = ((percentage * 10000) / delay)

                elapser.classList.add("dolfo-notification-elapser")
                elapser.style.width = perc + "%"
                
                if(!current)
                    not.appendChild(elapser)
                
                percentage--
            }

            interval = setInterval(fn, 100)

            setTimeout(() => clearInterval(interval), delay)
        }
        
        props.type !== "loading" && delay !== "never" && setTimeout(closeFunc, delay)

        return new Closable(closeFunc)
    }

    private static moveNotifications = (): void => ["bottom-left", "bottom-right", "top-left", "top-right", "centered-top", "centered-bottom"].forEach(dir => {
        const nots = document.querySelectorAll(`.dolfo-notification.${dir}:not(.static)`)
        let base = 0

        Array.from(nots).filter((_: any, i: number) => i < nots.length).reverse().forEach((not: any) => {
            if(dir.indexOf("bottom") !== -1)
                not.style.marginBottom = base + "px"
            else
                not.style.marginTop = base + "px"
            
            base += not.clientHeight + 15
        })
    })
    
    static onClose = (notification: HTMLElement, props: NotificationProps): void => {
        props.onClose && props.onClose()

        notification.remove()

        if(!notification.classList.contains("removed"))
            NotificationMsg.moveNotifications()
        
        notification.classList.add("removed")
    }

    getIcon = (type: string): React.ReactNode => {
        if(type === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
        if(type === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
        if(type === "loading") return <LoadingIcon spinning />
        if(type === "success") return <CheckCircleOutlineIcon color="var(--green)" />
        if(type === "warning") return <WarningIconOutline color="var(--orange)" />

        return <ExclamationCircleIcon color="var(--blue)" />
    }

    render = (): React.ReactNode => {
        const { props } = this,
        position = props.position || "centered-top",
        closeFunc = props.type !== "loading" && props.dismissOnClick ? () => NotificationMsg.onClose(this.ref.current, props) : null,
        isStatic = props.isStatic != null ? props.isStatic : true

        return <div className={"dolfo-notification " + position + (isStatic ? " static" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onClick={closeFunc} ref={this.ref}>
            {props.icon ? <Icon {...props.icon} /> : !props.hideIcon ? this.getIcon(props.type) : null} {props.message}
        </div>
    }
}

export const showNotification = NotificationMsg.show

export const showError = NotificationMsg.showError

export const showInfo = NotificationMsg.showInfo

export const showWarning = NotificationMsg.showWarning

export const showSuccess = NotificationMsg.showSuccess

export const showLoading = NotificationMsg.showLoading