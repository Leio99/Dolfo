import React from "react"
import { NotificationMsg } from "../layout/NotificationMsg"
import { Constants } from "../shared/Constants"
import { InputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"

interface IProps extends InputProps{
    readonly multiple?: boolean
    readonly accept?: string
    readonly dropArea?: boolean
}

interface IState{
    readonly files: FileList
    readonly value: string
    readonly showingMsg: boolean
}

export class Uploader extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            files: null,
            value: "",
            showingMsg: false
        }
    }

    onChange = (input: HTMLInputElement) => {
        this.setState({
            files: input.files,
            value: input.value
        })

        input.files && input.value && this.props.onChange && this.props.onChange(input.files)
    }

    onDragEnter = (e: any) => {
        e.preventDefault()
        e.target.classList.add("dragging")

        if(!this.props.multiple && e.dataTransfer.items.length > 1 && !this.state.showingMsg){
            this.toggleShowing()

            NotificationMsg.show({
                type: "error",
                message: Constants.UPLOAD_FILE_ERROR_NOT_MULTIPLE,
                onClose: this.toggleShowing
            })
        }
    }

    toggleShowing = () => this.setState({ showingMsg: !this.state.showingMsg })

    onDragOver = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDragLeave = (e: any) => e.target.classList.remove("dragging")

    onDrop = (e: any, input: HTMLInputElement) => {
        e.preventDefault()

        const files = e.dataTransfer.files,
        accepts = this.props.accept

        let notAcceptable = false

        if(accepts && accepts !== "" && accepts !== "all"){
            for(let i = 0; i < files.length; i++){
                const loop = accepts.split(",")
                
                for(let i2 = 0; i2 < loop.length; i2++){
                    const ext = loop[i2].trim()

                    if(files[i].name.indexOf(ext) !== files[i].name.length - ext.length){
                        notAcceptable = true
                        NotificationMsg.showError(Constants.UPLOAD_FILE_NOT_ACCEPTABLE)
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

    getFilesNameSeparated = () => {
        let names: string[] = []

        for(let i = 0; i < this.state.files.length; i++)
            names.push(this.state.files[i].name)

        return names.join(", ")
    }

    resetFiles = (e: Event) => {
        e.stopPropagation()
        this.setState({
            files: null,
            value: ""
        })
    }

    clickInput = (e: any) => {
        this.setState({ value: "" })
        e.target.value = null
    }

    render = (): JSX.Element => {
        const props = this.props,
        { files, value } = this.state,
        icon = props.icon || { iconKey: "file-upload", type: "far" }
        let input: HTMLInputElement

        return <div className="dolfo-uploader">
            <input type="file" accept={props.accept} value={value} multiple={props.multiple} ref={r => input = r} onChange={() => this.onChange(input)} onClick={this.clickInput} required={props.required} />

            {
                !props.dropArea ? <InputWrapper onClick={() => input.click()} icon={icon} style={props.wrapperStyle} label={props.label || Constants.UPLOAD_FILE_LABEL} resetFunction={this.resetFiles} value={files ? this.getFilesNameSeparated() : ""} disabled={props.disabled} required={props.required} className={props.className}>
                    <input type="text" value={files && value.length ? this.getFilesNameSeparated() : ""} style={props.style} />
                </InputWrapper> : <div className={"dolfo-uploader-drop" + (props.disabled ? " disabled" : "")} onDrop={(e) => this.onDrop(e, input)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onClick={() => input.click()} style={props.style} onMouseLeave={this.onDragLeave}>
                    <div className="dolfo-uploader-drop-label">{props.label || Constants.UPLOAD_FILE_DROP_LABEL}</div>

                    {
                        files && value.length ? <div className="selected-files" data-tooltip={this.getFilesNameSeparated()}>
                            <strong>{Constants.SELECTED_FILES_LABEL}</strong> {this.getFilesNameSeparated()}
                        </div> : null
                    }
                </div>
            }
        </div>
    }
}