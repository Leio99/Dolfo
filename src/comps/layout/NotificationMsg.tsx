Type } from "./Dialog"
import { CheckCircleOutlineIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon, WarningIconOutline } from "./Icon"

export type NotificationPosition ="top-left" | "top-right" | "bottom-left" | "bottom-right"
export type NotificationDelay = number | "never"

interface NotificationProps{
    readonly type?: DialogType | "loading"
    readonly icon?: JSX.Element
    readonly message: string | JSX.Element
    readonly hideDelay?: NotificationDelay
    readonly position?: NotificationPosition | "centered-top" | "centered-bottom"
    readonly style?: CSSProperties
    readonly className?: string
    readonly dismissOnClick?: boolean
	readonly onClose?: () => void
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

    static showLoading = (message?: string | JSX.Element) => {
        return NotificationMsg.show({
            message: message || Constants.LOADING_TEXT,
            type: "loading"
        })
    }

    static showWarning = (message: string | JSX.Element) => {
        return NotificationMsg.show({
            message,
            type: "warning"
        })
    }

    static show = (data: string | NotificationProps) => {
        const props = _.isString(data) ? { message: data } : data,
        notification = document.createElement("div"),
        getIcon = (type: string) => {
            if(type === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
            if(type === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
            if(type === "loading") return <LoadingIcon spinning />
            if(type === "success") return <CheckCircleOutlineIcon color="var(--green)" />
            if(type === "warning") return <WarningIconOutline color="var(--orange)" />

            return null
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

        (notification as any).close = closeFunc

        setTimeout(NotificationMsg.moveNotifications)
        
        ReactDOM.render(<div className={"dolfo-notification " + position + (props.className ? (" " + props.className) : "")} style={props.style} onClick={props.type !== "loading" && props.dismissOnClick ? closeFunc : null}>
            {props.icon || (props.type ? getIcon(props.type) : null)} {props.message}
        </div>, notification)

        return notification as Closable
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
