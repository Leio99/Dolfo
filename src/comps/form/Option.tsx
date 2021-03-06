import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { blurInput } from "../shared/utility"
import { CheckBox } from "./CheckBox"

export interface IProps extends InputProps{
    readonly value: any
    readonly label: string
    readonly selected?: boolean
    readonly unclickable?: boolean
    readonly multiple?: boolean
    readonly isRadio?: boolean
    readonly controlName?: string
    readonly focused?: boolean
}

export class Option extends React.PureComponent<IProps>{
    selectOption = () => {
        if(this.props.disabled) return
        
        this.props.onChange(this.props.value)

        !this.props.multiple && blurInput()
    }

    checkSpace = (e: any) => {
        if(e.key.charCodeAt(0) === 32){
            this.selectOption()
            e.preventDefault()
        }
    }

    render = (): JSX.Element => {
        const props = this.props

        if(props.isRadio){
            return <div className={"dolfo-input-radio" + (props.className ? (" " + props.className) : "")} style={props.style} onClick={this.selectOption}>
                <input type="radio" required={props.required} checked={props.selected} tabIndex={-1} name={props.controlName} />

                <div className={"dolfo-radio-circle" + (props.selected ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace}></div>
                {props.label && <label className="dolfo-radio-label">{props.label}</label>}
            </div>
        }

        return <div onClick={!props.unclickable ? this.selectOption : blurInput} className={"dolfo-option" + (props.selected ? " selected" : "") + (props.unclickable ? " unclick" : "") + (props.focused ? " focused" : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            {
                (props.multiple && !props.unclickable) ? <CheckBox checked={props.selected} label={props.label} disabled={props.disabled} /> : props.label
            }
        </div>
    }
}
