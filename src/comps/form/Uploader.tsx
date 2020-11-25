import React from "react"
import { InputProps } from "../shared/models/InputProps";
import { InputWrapper } from "./InputWrapper";

export interface IProps extends InputProps{
    readonly multiple?: boolean
    readonly accept?: string
    readonly dropArea?: boolean
}

export class Uploader extends React.PureComponent<IProps>{
    onChange = (input: { files: FileList }) => {
        console.log("ci son cascato di nuovo")
        this.props.onChange && this.props.onChange(input.files)
    }

    onDragEnter = (e: any) => {
        e.preventDefault()
        e.target.classList.add("dragging")
    }

    onDragOver = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDragLeave = (e: any) => e.target.classList.remove("dragging")

    onDrop = (e: any, input: HTMLInputElement) => {
        e.preventDefault()

        console.log(e.dataTransfer.files)

        if(this.props.multiple)
            input.files = e.dataTransfer.files
        else
            input.files = e.dataTransfer.files
    }

    render = (): JSX.Element => {
        const props = this.props,
        icon = props.icon || { iconKey: "upload" }
        let input: HTMLInputElement

        return <div className="dolfo-uploader">
            <input type="file" accept={props.accept} multiple={props.multiple} ref={r => input = r} onChange={() => this.onChange(input)} />

            {
                !props.dropArea ? <InputWrapper onClick={() => input.click()} icon={icon}>
                    <input type="text" readOnly value={(input as any)?.files?.map((f: File) => f.name).join(", ")} />
                </InputWrapper> : <div className="dolfo-uploader-drop" onDrop={(e) => this.onDrop(e, input)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter}>
                    Carica un file
                </div>
            }
        </div>
    }
}