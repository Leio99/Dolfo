import React from "react"
import { Icon } from "../layout/Icon"
import { BaseInputProps } from "../shared/models/InputProps"
import { blurInput } from "../shared/utility"
import { CheckBox } from "./CheckBox"

interface IProps extends BaseInputProps{
    /** The value of the option
     * @type any
     * @required
     */
    readonly value: any
    /** The label of the option
     * @type ReactNode
     */
    readonly label: React.ReactNode
    /** Defines if the option is selected by default
     * @type boolean
     */
    readonly selected?: boolean
    /** If true, the option will show a checkbox near the label
     * @type boolean
     */
    readonly multiple?: boolean
    /** If true shows a radio button
     * @type boolean
     */
    readonly isRadio?: boolean
    /** The name of the control in case of radio button
     * @type string
     */
    readonly controlName?: string
    /** Defines if the option is focused
     * @type boolean
     */
    readonly focused?: boolean
    /** Function to retrieve a string value from the label, used for example in multiple select to show concatenated values or for searching
     * @type Function
     * @returns string
     */
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