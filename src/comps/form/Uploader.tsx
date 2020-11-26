import React from "react"
import { NotificationMsg } from "../layout/NotificationMsg";
import { Constants } from "../shared/Constants";
import { InputProps } from "../shared/models/InputProps";
import { InputWrapper } from "./InputWrapper";

export interface IProps extends InputProps{
    readonly multiple?: boolean
    readonly accept?: string
    readonly dropArea?: boolean
}
export interface IState{
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

        this.props.onChange && this.props.onChange(input.files)
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

        if(!this.props.multiple && e.dataTransfer.files.length > 1)
            return

        let files = e.dataTransfer.files

        input.files = files

        this.setState({
            files,
            value: input.value
        })
    }

    getFilesNameSeparated = () => {
        let names: string[] = []

        for(let i = 0; i < this.state.files.length; i++)
            names.push(this.state.files[i].name)

        

        return names.join(", ")
    }

    resetFiles = (e: any) => {
        e.stopPropagation()
        this.setState({
            files: null,
            value: ""
        })
    }

    render = (): JSX.Element => {
        const props = this.props,
        { files, value } = this.state,
        icon = props.icon || { iconKey: "upload" }
        let input: HTMLInputElement

        return <div className="dolfo-uploader">
            <input type="file" accept={props.accept} value={value} multiple={props.multiple} ref={r => input = r} onChange={() => this.onChange(input)} />

            {
                !props.dropArea ? <InputWrapper onClick={() => input.click()} icon={icon} style={props.wrapperStyle}label={props.label} resetFunction={this.resetFiles} value={files ? this.getFilesNameSeparated() : ""}>
                    <input type="text" readOnly value={files && value.length ? this.getFilesNameSeparated() : Constants.UPLOAD_FILE_LABEL} style={props.style} />
                </InputWrapper> : <div className="dolfo-uploader-drop" onDrop={(e) => this.onDrop(e, input)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onClick={() => input.click()} style={props.style} onMouseLeave={this.onDragLeave}>
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