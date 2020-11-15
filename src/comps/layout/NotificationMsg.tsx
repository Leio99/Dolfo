import React from "react"
import { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { CheckCircleOutlineIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon } from "./Icon"

export interface NotificationProps{
    readonly type?: "info" | "error" | "success" | "loading" | "warning"
    readonly icon?: JSX.Element
    readonly message: string | JSX.Element
    readonly hideDelay?: number
    readonly position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "centered-top" | "centered-bottom"
    readonly style?: CSSProperties
    readonly className?: string
    readonly closeOnClick?: boolean
}

export class NotificationMsg{
    static showError = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "error"
        })
    }

    static showInfo = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "info"
        })
    }

    static showSuccess = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "success"
        })
    }

    static showLoading = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "loading"
        })
    }

    static showWarning = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "warning"
        })
    }

    static show = (props: NotificationProps) => {
        const notification = document.createElement("div"),
        getIcon = (type: string) => {
            if(type === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
            if(type === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
            if(type === "loading") return <LoadingIcon spinning />
            if(type === "success") return <CheckCircleOutlineIcon color="var(--green)" />
            if(type === "warning") return <CheckCircleOutlineIcon color="var(--orange)" />

            return null
        },
        closeFunc = () => {
            notification.remove()

            if(!notification.classList.contains("removed"))
                NotificationMsg.moveNotifications()
            
            notification.classList.add("removed")
        },
        position = props.position || "centered-top"
        
        props.type !== "loading" && setTimeout(closeFunc, props.hideDelay ? props.hideDelay : 2000)
        
        document.body.appendChild(notification);

        (notification as any).close = closeFunc

        setTimeout(() => NotificationMsg.moveNotifications())
        
        ReactDOM.render(<div className={"dolfo-notification " + position + (props.className ? (" " + props.className) : "")} style={props.style} onClick={props.type !== "loading" && props.closeOnClick ? closeFunc : null}>
            {props.icon || (props.type ? getIcon(props.type) : null)} {props.message}
        </div>, notification)

        return notification as { close?: () => void }
    }

    static moveNotifications = () => {
        ["bottom-left", "bottom-right", "top-left", "top-right", "centered-top", "centered-bottom"].forEach(dir => {
            let nots = document.querySelectorAll(`.dolfo-notification.${dir}`),
            base = 0

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