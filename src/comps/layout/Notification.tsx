import React from "react"
import { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { CheckCircleOutlineIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon } from "./Icon"

export interface NotificationProps{
    type?: "info" | "error" | "success" | "loading" | "warning"
    icon?: JSX.Element
    message: string | JSX.Element
    hideDelay?: number
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "centered-top"
    style?: CSSProperties
    className?: string
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
        }
        
        props.type !== "loading" && setTimeout(function(){
            notification.remove()
        }, props.hideDelay ? (props.hideDelay * 1000) : 2000)
        
        document.body.appendChild(notification);

        (notification as any).close = function(){
            notification.remove()
        }
        
        ReactDOM.render(<div className={"dolfo-notification " + (props.position || "centered-top") + (props.className ? (" " + props.className) : "")} style={props.style} onClick={props.type !== "loading" ? (() => notification.remove()) : null}>
            {props.icon || (props.type ? getIcon(props.type) : null)} {props.message}
        </div>, notification)

        return notification as { close?: () => void }
    }
}