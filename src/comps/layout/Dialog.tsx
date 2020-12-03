import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import Button from "./Button"
import { CheckCircleOutlineIcon, CloseIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon, QuestionCircleOutlineIcon, WarningIconOutline } from "./Icon"
import { Constants } from "../shared/Constants"

export interface IProps{
    readonly clickOutside?: boolean
    readonly onClose?: () => void
    readonly visible?: boolean
    readonly onOk?: () => void
    readonly okBtnClass?: string
    readonly cancelBtnClass?: string
    readonly okText?: string | JSX.Element
    readonly cancelText?: string | JSX.Element
    readonly hideCancel?: boolean
    readonly title: string | JSX.Element
    readonly content?: string | JSX.Element
    readonly autoLoad?: boolean
    readonly width?: string
    readonly style?: CSSProperties
    readonly okType?: "red" | "blue" | "green" | "black" | "orange" | "grey" | "white" | "darkblue"
    readonly cancelType?: "red" | "blue" | "green" | "black" | "orange" | "grey" | "white" | "darkblue"
    readonly className?: string
    readonly customFooter?: React.ReactNode
    readonly top?: boolean
    readonly hideFooter?: boolean
}
export interface IState{
    readonly visible: boolean
}
export interface DialogProps extends IProps{
    readonly type?: "success" | "info" | "error" | "warning"
    readonly icon?: JSX.Element
}
export interface ComponentAsDialogProps{
    readonly close: () => void
}

export class Dialog extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = {
            visible: props.visible || props.autoLoad ? true : false
        }
    }

    static infoDialog = (data: {
        title?: string | JSX.Element,
        content: string | JSX.Element,
        onOk?: () => void,
        type?: "success" | "info" | "error" | "warning",
        width?: string,
        okText?: string
    }) => {
        let title = data.title || Constants.INFO_TEXT,
        okType: DialogProps["okType"] = "blue"

        if(data.type === "success"){
            if(!data.title) title = Constants.SUCCESS_TEXT
            okType = "green"
        }

        if(data.type === "error"){
            if(!data.title) title = Constants.ERROR_TEXT
            okType = "red"
        }

        if(data.type === "warning"){
            if(!data.title) title = Constants.WARNING_TEXT
            okType = "orange"
        }

        return Dialog.openDialog({
            ...data,
            title,
            hideCancel: true,
            icon: Dialog.getIcon(data.type || "info"),
            okType
        })
    }

    static yesNoDialog = (title: string | JSX.Element, message: string | JSX.Element, onYes: () => void) => {
        return Dialog.openDialog({
            title,
            content: message,
            onOk: onYes,
            okText: Constants.YESY_TEXT,
            cancelText: Constants.NO_TEXT,
            icon: <QuestionCircleOutlineIcon color="var(--orange)" />
        })
    }

    static loadingDialog = (loadingText: string | JSX.Element = Constants.LOADING_TEXT) => {
        return Dialog.openDialog({
            title: "",
            content: <div>
                <LoadingIcon spinning /> {loadingText}
            </div>,
            style: { height: 100 },
            width: "270px",
            className: "loading-dialog"
        })
    }

    static openDialog = (data: DialogProps) => {
        const popup = document.createElement("div"),
        onCloseFunction = (props: IProps) => {
            popup.remove()
            props.onClose && props.onClose()
        },
        onOkFunction = (props: IProps) => {
            popup.remove()
            props.onOk && props.onOk()
        },
        icon = data.icon || Dialog.getIcon(data.type)

        document.getElementById("root").appendChild(popup);

        (popup as any).close = () => {
            popup.remove()
        }

        ReactDOM.render(<Dialog autoLoad {...data} onClose={() => onCloseFunction(data)} onOk={() => onOkFunction(data)} title={<span>{icon} {data.title}</span>} width={data.width || "350px"} hideCancel={data.type ? true : data.hideCancel} className={data.className} customFooter={data.customFooter} />, popup)

        return popup as { close?: () => void }
    }

    static openComponentAsDialog = (Class: any, props: any) => {
        const popup = document.createElement("div"),
        Component = <Class close={() => popup.remove()} {...props} />

        document.getElementById("root").appendChild(popup)

        ReactDOM.render(Component, popup)
    }

    static getIcon = (icon: string) => {
        if(icon === "success") return <CheckCircleOutlineIcon color="var(--green)" />
        if(icon === "info") return <InfoCircleOutlineIcon color="var(--blue)" />
        if(icon === "error") return <ErrorCircleOutlineIcon color="var(--red)" />
        if(icon === "warning") return <WarningIconOutline color="var(--orange)" />

        return null
    }

    componentDidUpdate = () => {
        this.setState({
            visible: this.props.visible !== null ? this.props.visible : this.props.autoLoad ? true : false
        })
    }

    onClose = () => {
        this.setState({ visible: false })

        this.props.onClose && this.props.onClose()
    }

    onOk = () => {
        this.props.autoLoad && this.setState({ visible: false })

        this.props.onOk && this.props.onOk()
    }

    render = (): JSX.Element => {
        const props = this.props,
        { visible } = this.state

        return <div className={"dolfo-dialog" + (visible ? " show" : "") + (props.className ? (" " + props.className) : "") + (props.top ? " place-top" : "")}>
            <div className="dolfo-dialog-overlay" onClick={props.clickOutside ? this.onClose : null}></div>

            <div className="dolfo-dialog-inner" style={{ ...props.style, width: props.width }}>
                <div className="dolfo-dialog-header">
                    <Button textBtn onClick={this.onClose} className="dialog-close" tooltip={Constants.CLOSE_TEXT}>
                        <CloseIcon style={{ fontSize: 20 }} />
                    </Button>

                    <h4 className="dolfo-dialog-title">{props.title}</h4>
                </div>

                <div className="dolfo-dialog-content">
                    {props.content || props.children}
                </div>

                {
                    !props.hideFooter ? (props.customFooter ? <div className="dolfo-dialog-footer">
                            {props.customFooter}
                        </div> : <div className="dolfo-dialog-footer">
                            {
                                !props.hideCancel && <Button onClick={this.onClose} className={props.cancelBtnClass ? (" " + props.cancelBtnClass) : ""} smallBtn textBtn btnColor={props.cancelType || "red"}>
                                    {props.cancelText || Constants.CANCEL_TEXT}
                                </Button>
                            }

                            <Button onClick={this.onOk} className={props.okBtnClass ? (" " + props.okBtnClass) : ""} smallBtn btnColor={props.okType || "darkblue"}>
                                {props.okText || Constants.OK_TEXT}
                            </Button>
                        </div>
                    ) : <div className="dolfo-hidden-footer"></div>
                }
            </div>
        </div>
    }
}