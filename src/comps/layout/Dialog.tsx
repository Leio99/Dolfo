import React, { CSSProperties } from "react"
import Button, { ButtonColors } from "./Button"
import { CheckCircleOutlineIcon, CloseIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon, QuestionCircleOutlineIcon, WarningIconOutline } from "./Icon"
import { Constants } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import { createRoot } from "react-dom/client"
import { Tooltip } from "./Tooltip"

export type DialogType = "success" | "info" | "error" | "warning"
export type DialogCloseType = "close" | "cancel"

export interface ComponentAsDialogProps{
    readonly close?: () => void
}

interface BaseProps{
    readonly title?: string | JSX.Element
    readonly onOk?: () => void
    readonly width?: string
    readonly okText?: string
    readonly clickOutside?: boolean
}

export interface DialogFullProps extends BaseProps, React.PropsWithChildren{
    readonly onClose?: (type: DialogCloseType) => void
    readonly visible?: boolean
    readonly okBtnClass?: string
    readonly cancelBtnClass?: string
    readonly cancelText?: string | JSX.Element
    readonly hideCancel?: boolean
    readonly style?: CSSProperties
    readonly okType?: ButtonColors
    readonly cancelType?: ButtonColors
    readonly className?: string
    readonly customFooter?: React.ReactNode
    readonly top?: boolean
    readonly hideFooter?: boolean
    readonly overflows?: boolean
}

interface IState{
    readonly visible: boolean
}

interface DialogProps extends DialogFullProps{
    readonly type?: DialogType
    readonly icon?: JSX.Element
    readonly content?: string | JSX.Element
}

export class Dialog extends React.PureComponent<DialogFullProps, IState>{
    constructor(props: DialogFullProps) {
        super(props)

        this.state = {
            visible: props.visible
        }
    }

    static infoDialog = (data: DialogProps): Closable => {
        let title = data.title || Dialog.getInfoTitle(data.type),
        okType: DialogProps["okType"] = Dialog.getColor(data.type)

        return openDialog({
            ...data,
            title,
            hideCancel: true,
            icon: Dialog.getIcon(data.type || "info"),
            okType,
            width: "350px"
        })
    }

    static yesNoDialog = (title: string | JSX.Element, message: string | JSX.Element, onYes: DialogProps["onOk"], onNo?: DialogProps["onClose"]): Closable => openDialog({
        title: title || Constants.CONFIRM_TITLE,
        content: message,
        onOk: onYes,
        okText: Constants.YES_TEXT,
        clickOutside: true,
        cancelText: Constants.NO_TEXT,
        icon: <QuestionCircleOutlineIcon color="var(--orange)" />,
        width: "350px",
        onClose: onNo
    })

    static loadingDialog = (loadingText: string | JSX.Element = Constants.LOADING_TEXT): Closable => openDialog({
        title: "",
        content: <div>
            <LoadingIcon spinning /> {loadingText}
        </div>,
        style: { height: 100 },
        width: "270px",
        className: "loading-dialog"
    })

    static openDialog = (data: DialogProps): Closable => {
        const popup = document.createElement("div"),
        root = createRoot(popup),
        onCloseFunction = (props: DialogFullProps, e: DialogCloseType) => {
            popup.remove()
            props.onClose && props.onClose(e)
            setTimeout(() => root.unmount())
        },
        onOkFunction = (props: DialogFullProps) => {
            popup.remove()
            props.onOk && props.onOk()
            setTimeout(() => root.unmount())
        },
        icon = data.icon || Dialog.getIcon(data.type),
        okType = data.okType || Dialog.getColor(data.type)

        document.body.appendChild(popup)

        root.render(<Dialog visible {...data} onClose={e => onCloseFunction(data, e)} onOk={() => onOkFunction(data)} title={<span>{icon} {data.title}</span>} hideCancel={data.type ? true : data.hideCancel} okType={okType} children={data.content} />)

        return new Closable(() => onCloseFunction(data, "close"))
    }

    static openDialogComponent = <T extends unknown>(Class: React.ComponentType<T & ComponentAsDialogProps>, props?: React.ComponentProps<typeof Class>): Closable => {
        const popup = document.createElement("div"),
        root = createRoot(popup),
        closeFn = () => {
            popup.remove()
            setTimeout(() => root.unmount())
        },
        Component = React.createElement(Class, { ...props, close: closeFn })

        document.body.appendChild(popup)

        root.render(Component)
        
        return new Closable(closeFn)
    }

    private static getColor = (type: DialogProps["type"]): DialogProps["okType"] => {
        if(type === "success") return "green"
        if(type === "error") return "red"
        if(type === "warning") return "orange"

        return "blue"
    }

    private static getInfoTitle = (type: DialogProps["type"]): string => {
        if(type === "success")
            return Constants.SUCCESS_TEXT

        if(type === "error")
            return Constants.ERROR_TEXT

        if(type === "warning")
            return Constants.WARNING_TEXT

        return Constants.INFO_TEXT
    }

    public static getIcon = (icon: string): JSX.Element => {
        if(icon === "success") return <CheckCircleOutlineIcon color="var(--green)" />
        if(icon === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
        if(icon === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
        if(icon === "warning") return <WarningIconOutline color="var(--orange)" />

        return null
    }

    componentDidUpdate = (): void => this.setState({
        visible: this.props.visible != null ? this.props.visible : this.state.visible
    })

    onClose = (event: DialogCloseType): void => this.setState({ visible: false }, () => this.props.onClose && this.props.onClose(event))

    onOk = (): void => {
        this.props.visible && this.setState({ visible: false })

        this.props.onOk && this.props.onOk()
    }

    render = (): JSX.Element => {
        const { props } = this,
        { visible } = this.state

        return <div className={"dolfo-dialog" + (visible ? " show" : "") + (props.className ? (" " + props.className) : "") + (props.top ? " place-top" : "") + (props.overflows ? " overflows" : "")}>
            <div className="dolfo-dialog-overlay" onClick={props.clickOutside ? () => this.onClose("cancel") : null}></div>

            <div className="dolfo-dialog-inner" style={{ ...props.style, width: props.width || props.style?.width }}>
                <div className="dolfo-dialog-header">
                    <Tooltip tooltip={Constants.CLOSE_TEXT}>
                        <Button circleBtn btnColor="white" onClick={() => this.onClose("cancel")} className="dialog-close">
                            <CloseIcon style={{ fontSize: 20 }} />
                        </Button>
                    </Tooltip>

                    <h4 className="dolfo-dialog-title">{props.title}</h4>
                </div>

                <div className="dolfo-dialog-content">
                    {props.children}
                </div>

                {
                    !props.hideFooter ? (props.customFooter ? <div className="dolfo-dialog-footer">
                            {props.customFooter}
                        </div> : <div className="dolfo-dialog-footer">
                            <Button onClick={this.onOk} className={props.okBtnClass ? (" " + props.okBtnClass) : ""} size="small" btnColor={props.okType || "darkblue"}>
                                {props.okText || Constants.OK_TEXT}
                            </Button>

                            {
                                !props.hideCancel && <Button onClick={() => this.onClose("close")} className={props.cancelBtnClass ? (" " + props.cancelBtnClass) : ""} size="small" type="text" btnColor={props.cancelType || "red"}>
                                    {props.cancelText || Constants.CANCEL_TEXT}
                                </Button>
                            }
                        </div>
                    ) : <div className="dolfo-hidden-footer"></div>
                }
            </div>
        </div>
    }
}

export const openYesNoDialog = Dialog.yesNoDialog

export const openDialog = Dialog.openDialog

export const openDialogComponent = Dialog.openDialogComponent

export const openInfoDialog = Dialog.infoDialog

export const openLoadingDialog = Dialog.loadingDialog