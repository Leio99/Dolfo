import React from "react"
import { Icon } from "../layout/Icon"
import { BaseInputProps } from "../shared/models/InputProps"
import { blurInput } from "../shared/utility"
import { CheckBox } from "./CheckBox"

interface IProps extends BaseInputProps{
    readonly value: any
    readonly label: string | React.ReactNode
    readonly selected?: boolean
    readonly multiple?: boolean
    readonly isRadio?: boolean
    readonly controlName?: string
    readonly focused?: boolean
    readonly getLabelString?: () => string
}

export class Option extends React.PureComponent<IProps>{
    selectOption = (): void => {
        if(this.props.disabled) return
        
        this.props.onChange(this.props.value)

        !this.props.multiple && blurInput()
    }

    checkSpace = (e: React.KeyboardEvent): void => {
        if(e.key.charCodeAt(0) === 32){
            this.selectOption()
            e.preventDefault()
        }
    }

    render = (): React.ReactNode => {
        const { props } = this

        if(props.isRadio){
            return <div className={"dolfo-input-radio" + (props.className ? (" " + props.className) : "")} style={props.style} onClick={this.selectOption}>
                <input type="radio" required={props.required} checked={props.selected} tabIndex={-1} name={props.controlName} onChange={() => {}} />

                <div className={"dolfo-radio-circle" + (props.selected ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace}>
                    {props.selected && <Icon iconKey="check" />}
                </div>
                {props.label && <label className="dolfo-radio-label">{props.label}</label>}
            </div>
        }

        return <div onClick={this.selectOption} className={"dolfo-option" + (props.selected ? " selected" : "") + (props.focused ? " focused" : "") + (props.className ? (" " + props.className) : "") + (!props.multiple && props.disabled ? " disabled" : "")} style={props.style}>
            {
                props.multiple ? <CheckBox checked={props.selected} label={props.label} disabled={props.disabled} /> : props.label
            }
        </div>
    }
}