import React, { CSSProperties, createRef } from "react"
import { createRoot } from "react-dom/client"
import { getConstant } from "../shared/Constants"
import { Closable } from "../shared/models/Closable"
import Button, { ButtonColors } from "./Button"
import { CheckCircleOutlineIcon, CloseIcon, ErrorCircleOutlineIcon, InfoCircleOutlineIcon, LoadingIcon, QuestionCircleOutlineIcon, WarningIconOutline } from "./Icon"
import { Tooltip } from "./Tooltip"

export type DialogType = "success" | "info" | "error" | "warning"
export type DialogCloseType = "close" | "cancel"

export interface ComponentAsDialogProps{
    /** Invokes the dialog closing
     * @type Function
     */
    readonly close: () => void
}

interface BaseProps{
    /** The title of the dialog
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Defines the width of the dialog
     * @type string
     */
    readonly width?: string
    /** Defines the text of the 'ok' button
     * @type ReactNode
     */
    readonly okText?: React.ReactNode
    /** If true, the dialog will close when clicking outside
     * @type boolean
     */
    readonly clickOutside?: boolean
    /** If true, hides the 'X' button to close the dialog
     * @type boolean
     */
    readonly hideCloseX?: boolean
    /** Function triggered when clicking the 'ok' button
     * @type Function
     */
    readonly onOk?: () => void
}

export interface DialogFullProps extends BaseProps, React.PropsWithChildren{
    /** Function triggred when closing the dialog
     * @type Function
     * @param type DialogCloseType
     */
    readonly onClose?: (type: DialogCloseType) => void
    /** Defines if the dialog is visible
     * @type boolean
     */
    readonly visible?: boolean
    /** Additional class for the 'ok' button
     * @type string
     */
    readonly okBtnClass?: string
    /** Additional class for the 'cancel' button
     * @type string
     */
    readonly cancelBtnClass?: string
    /** Defines the text of the 'cancel' button
     * @type ReactNode
     */
    readonly cancelText?: React.ReactNode
    /** If true, hides the 'cancel' button
     * @type boolean
     */
    readonly hideCancel?: boolean
    /** The type of the 'ok' button
     * @type ButtonColors
     */
    readonly okType?: ButtonColors
    /** The type of the 'cancel' button
     * @type ButtonColors
     */
    readonly cancelType?: ButtonColors
    /** Additional style for the dialog
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the dialog
     * @type string
     */
    readonly className?: string
    /** Defines a custom footer for the dialog
     * @type ReactNode
     */
    readonly customFooter?: React.ReactNode
    /** If true, the dialog will show on top of the page
     * @type boolean
     */
    readonly top?: boolean
    /** If true, the footer of the dialog won't show
     * @type boolean
     */
    readonly hideFooter?: boolean
    /** Determines if the dialog can overflow its content without expanding its height
     * @type boolean
     */
    readonly overflows?: boolean
    /** If true, the dialog will be draggable using its header
     * @type boolean
     */
    readonly draggable?: boolean
}

interface IState{
    readonly visible: boolean
}

interface DialogProps extends DialogFullProps{
    /** The type of the dialog
     * @type DialogType
     */
    readonly type?: DialogType
    /** Custom icon for the dialog title
     * @type ReactNode
     */
    readonly icon?: React.ReactNode
    /** The content of the dialog
     * @type ReactNode
     */
    readonly content?: React.ReactNode
}

export class Dialog extends React.PureComponent<DialogFullProps, IState>{
    private initPosX: number
    private initPosY: number
    private mouseDown = false
    private innerRef = createRef<HTMLDivElement>()

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

    static yesNoDialog = (title: React.ReactNode, message: React.ReactNode, onYes: DialogProps["onOk"], onNo?: DialogProps["onClose"]): Closable => openDialog({
        title: title || getConstant("CONFIRM_TITLE"),
        content: message,
        onOk: onYes,
        okText: getConstant("YES_TEXT"),
        clickOutside: true,
        cancelText: getConstant("NO_TEXT"),
        icon: <QuestionCircleOutlineIcon color="var(--orange)" />,
        width: "350px",
        onClose: onNo
    })

    static loadingDialog = (loadingText: React.ReactNode = getConstant("LOADING_TEXT")): Closable => openDialog({
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

    static openDialogComponent = <T extends unknown>(Class: React.ComponentType<T & ComponentAsDialogProps>, props?: Omit<React.ComponentProps<typeof Class>, "close">): Closable => {
        const popup = document.createElement("div"),
        root = createRoot(popup),
        closeFn = () => {
            popup.remove()
            setTimeout(() => root.unmount())
        },
        Component = React.createElement(Class, { ...props, close: closeFn } as React.ComponentProps<typeof Class>)

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
            return getConstant("SUCCESS_TEXT")

        if(type === "error")
            return getConstant("ERROR_TEXT")

        if(type === "warning")
            return getConstant("WARNING_TEXT")

        return getConstant("INFO_TEXT")
    }

    public static getIcon = (icon: string): React.ReactNode => {
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

    initDrag = (e: React.MouseEvent): void => {
        this.initPosX = e.clientX
        this.initPosY = e.clientY
        this.mouseDown = true
    }

    stopDrag = () => this.mouseDown = false

    drag = (e: React.MouseEvent) => {
        if (this.mouseDown && this.props.visible) {
            e.preventDefault()
            const { clientX, clientY } = e,
            { current } = this.innerRef,
            left = Number(getComputedStyle(current).left.split("px")[0]),
            top = Number(getComputedStyle(current).top.split("px")[0]),
            newLeft = left - (this.initPosX - clientX),
            newTop = top - (this.initPosY - clientY)

            current.style.top = newTop + "px"
            current.style.left = newLeft + "px"
            this.initPosX = clientX
            this.initPosY = clientY
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { visible } = this.state

        return <div className={"dolfo-dialog" + (visible ? " show" : "") + (props.className ? (" " + props.className) : "") + (props.top ? " place-top" : "") + (props.overflows ? " overflows" : "")} onMouseMove={props.draggable ? this.drag : null}>
            <div className="dolfo-dialog-overlay" onClick={props.clickOutside ? () => this.onClose("cancel") : null}></div>

            <div className="dolfo-dialog-inner" ref={this.innerRef} style={{ ...props.style, width: props.width || props.style?.width }}>
                <div className={"dolfo-dialog-header" + (props.draggable ? " draggable" : "")} onMouseDown={props.draggable ? this.initDrag : null} onMouseUp={props.draggable ? this.stopDrag : null}>
                    <h4 className="dolfo-dialog-title">{props.title}</h4>
                    {
                        !props.hideCloseX && <Tooltip tooltip={getConstant("CLOSE_TEXT")}>
                            <Button circleBtn btnColor="white" onMouseDown={e => e.stopPropagation()} onClick={() => this.onClose("cancel")} className="dialog-close">
                                <CloseIcon style={{ fontSize: 20 }} />
                            </Button>
                        </Tooltip>
                    }
                </div>

                <div className="dolfo-dialog-content">
                    {props.children}
                </div>

                {
                    !props.hideFooter ? (props.customFooter ? <div className="dolfo-dialog-footer">
                            {props.customFooter}
                        </div> : <div className="dolfo-dialog-footer">
                            <Button onClick={this.onOk} className={props.okBtnClass ? (" " + props.okBtnClass) : ""} size="small" btnColor={props.okType || "darkblue"}>
                                {props.okText || getConstant("OK_TEXT")}
                            </Button>

                            {
                                !props.hideCancel && <Button onClick={() => this.onClose("close")} className={props.cancelBtnClass ? (" " + props.cancelBtnClass) : ""} size="small" type="text" btnColor={props.cancelType || "red"}>
                                    {props.cancelText || getConstant("CANCEL_TEXT")}
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