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
        },
        closeFunc = () => {
            notification.remove()
            NotificationMsg.moveNotifications(1, props.position)
        },
        position = props.position || "centered-top"
        
        props.type !== "loading" && setTimeout(closeFunc, props.hideDelay ? (props.hideDelay * 1000) : 2000)
        
        document.body.appendChild(notification);

        (notification as any).close = closeFunc

        NotificationMsg.moveNotifications(0, position)
        
        ReactDOM.render(<div className={"dolfo-notification " + position + (props.className ? (" " + props.className) : "")} style={props.style} onClick={props.type !== "loading" ? closeFunc : null}>
            {props.icon || (props.type ? getIcon(props.type) : null)} {props.message}
        </div>, notification)

        return notification as { close?: () => void }
    }

    static moveNotifications = (minus?: number, pos = "") => {
        let notsBtmLeft = document.querySelectorAll(".dolfo-notification.bottom-left"),
        lengthBtmLeft = notsBtmLeft.length - (pos === "bottom-left" ? minus : 1)

        notsBtmLeft.forEach((not: any) => {
            not.style.marginBottom = (lengthBtmLeft * 3.5) + "rem"
            lengthBtmLeft--
        })

        let notsBtmRight = document.querySelectorAll(".dolfo-notification.bottom-right"),
        lengthBtmRight = notsBtmRight.length - (pos === "bottom-right" ? minus : 1)

        notsBtmRight.forEach((not: any) => {
            not.style.marginBottom = (lengthBtmRight * 3.5) + "rem"
            lengthBtmRight--
        })

        let notsTopRight = document.querySelectorAll(".dolfo-notification.top-right"),
        lengthTopRight = notsTopRight.length - (pos === "top-right" ? minus : 1)

        notsTopRight.forEach((not: any) => {
            not.style.marginTop = (lengthTopRight * 3.5) + "rem"
            lengthTopRight--
        })

        let notsTopLeft = document.querySelectorAll(".dolfo-notification.top-left"),
        lengthTopLeft = notsTopLeft.length - (pos === "top-left" ? minus : 1)

        notsTopLeft.forEach((not: any) => {
            not.style.marginTop = (lengthTopLeft * 3.5) + "rem"
            lengthTopLeft--
        })

        let notsCentered = document.querySelectorAll(".dolfo-notification.centered-top"),
        lengthCentered = notsCentered.length - (pos === "centered-top" ? minus : 1)

        notsCentered.forEach((not: any) => {
            not.style.marginTop = (lengthCentered * 3.5) + "rem"
            lengthCentered--
        })
    }
}