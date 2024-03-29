import React from "react"
import { showNotification, showError } from "../layout/NotificationMsg"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"

export interface UploaderProps extends ExtendedInputProps{
    /** Allows multiple files uploading
     * @type boolean
     */
    readonly multiple?: boolean
    /** Allowed file types
     * @type string (look for HTML upload input 'accept' attribute)
     */
    readonly accept?: string
    /** Shows drop area
     * @type boolean
     */
    readonly dropArea?: boolean
}

interface IState{
    readonly files: FileList
    readonly value: string
    readonly showingMsg: boolean
}

export class Uploader extends React.PureComponent<UploaderProps, IState>{
    constructor(props: UploaderProps){
        super(props)

        this.state = {
            files: null,
            value: "",
            showingMsg: false
        }
    }

    onChange = (input: HTMLInputElement): void => {
        this.setState({
            files: input.files,
            value: input.value
        })

        input.files && input.value && this.props.onChange && this.props.onChange(input.files)
    }

    onDragEnter = (e: React.DragEvent<HTMLInputElement>): void => {
        (e.target as HTMLInputElement).classList.add("dragging")
        e.preventDefault()

        if(!this.props.multiple && e.dataTransfer.items.length > 1 && !this.state.showingMsg){
            this.toggleShowing()

            showNotification({
                type: "error",
                message: getConstant("UPLOAD_FILE_ERROR_NOT_MULTIPLE"),
                onClose: this.toggleShowing
            })
        }
    }

    toggleShowing = (): void => this.setState({ showingMsg: !this.state.showingMsg })

    onDragOver = (e: React.DragEvent): void => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDragLeave = (e: React.MouseEvent): void => (e.target as HTMLInputElement).classList.remove("dragging")

    onDrop = (e: React.DragEvent<HTMLDivElement>, input: HTMLInputElement): void => {
        e.preventDefault()

        const files = e.dataTransfer.files,
        { accept } = this.props

        let notAcceptable = false

        if(accept && accept !== "" && accept !== "all"){
            for(let i = 0; i < files.length; i++){
                const loop = accept.split(",")
                
                for(let i2 = 0; i2 < loop.length; i2++){
                    const ext = loop[i2].trim()

                    if(files[i].name.indexOf(ext) !== files[i].name.length - ext.length){
                        notAcceptable = true
                        showError(getConstant("UPLOAD_FILE_NOT_ACCEPTABLE"))
                    }
                }
            }
        }

        if(notAcceptable) return

        input.value = null

        if(!this.props.multiple && files.length > 1)
            return

        input.files = files

        this.setState({
            files,
            value: input.value
        })

        input.files && input.value && this.props.onChange && this.props.onChange(input.files)
    }

    getFilesNameSeparated = (): string => {
        const names: string[] = []

        for(let i = 0; i < this.state.files.length; i++)
            names.push(this.state.files[i].name)

        return names.join(", ")
    }

    resetFiles = (e: React.MouseEvent): void => {
        e.stopPropagation()

        this.setState({
            files: null,
            value: ""
        })
    }

    clickInput = (e: React.MouseEvent<HTMLInputElement>): void => {
        if(this.props.disabled) return
        
        (e.target as HTMLInputElement).value = null
        this.setState({ value: "" })
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { files, value } = this.state,
        icon = props.icon || { iconKey: "file-upload", type: "far" }
        let input: HTMLInputElement

        return <div className="dolfo-uploader">
            <input type="file" accept={props.accept} value={value} multiple={props.multiple} ref={r => input = r} onChange={() => this.onChange(input)} onClick={this.clickInput} required={props.required} />

            {
                !props.dropArea ? <InputWrapper onClick={() => input.click()} icon={icon} style={props.wrapperStyle} label={props.label || getConstant("UPLOAD_FILE_LABEL")} resetFunction={this.resetFiles} value={files ? this.getFilesNameSeparated() : ""} disabled={props.disabled} required={props.required} className={props.className}>
                    <input
                        type="text"
                        value={files && value.length ? this.getFilesNameSeparated() : ""}
                        style={props.style}
                        disabled={props.disabled}
                        readOnly
                    />
                </InputWrapper> : <div className={"dolfo-uploader-drop" + (props.disabled ? " disabled" : "")} onDrop={(e) => this.onDrop(e, input)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onClick={() => input.click()} style={props.style} onMouseLeave={this.onDragLeave}>
                    <div className="dolfo-uploader-drop-label">{props.label || getConstant("UPLOAD_FILE_DROP_LABEL")}</div>

                    {
                        files && value.length ? <Tooltip tooltip={this.getFilesNameSeparated()}>
                            <div className="selected-files">
                                <strong>{getConstant("SELECTED_FILES_LABEL")}</strong> {this.getFilesNameSeparated()}
                            </div>
                        </Tooltip> : null
                    }
                </div>
            }
        </div>
    }
}