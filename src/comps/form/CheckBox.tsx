import React from "react"
import { CheckIcon } from "../layout/Icon"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"

export interface CheckBoxProps extends BaseInputProps{
    /** Defines if the checkbox should be checked by default
     * @type boolean
     */
    readonly checked?: boolean
    /** Set this field to true if you don't want the switcher itself to be able to be changed internally, but only externally using props (remember to set onChange callback)
     * @type boolean
     */
    readonly manageChange?: boolean
}

export class CheckBox extends React.PureComponent<CheckBoxProps, CheckBoxProps>{ 
    constructor(props: CheckBoxProps){
        super(props)
        
        this.state = {
            checked: props.checked || false
        }
    }

    componentDidUpdate = (prevProps: CheckBoxProps): void => {
        if(prevProps.checked !== this.props.checked || (this.props.checked !== this.state.checked && this.props.checked !== prevProps.checked))
            this.setState({ checked: !!this.props.checked })
    }

    onChange = (): void => {
        if(this.props.disabled) return
        
        if(!this.props.manageChange)
            this.setState({ checked: !this.state.checked })
        
        if(this.props.onChange)
            this.props.onChange(!this.state.checked)
    }

    checkSpace = (e: React.KeyboardEvent): void => {
        if(e.key.charCodeAt(0) === 32){
            this.onChange()
            e.preventDefault()
            e.stopPropagation()
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { checked } = this.state

        return <div className={"dolfo-checkbox" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} style={props.style} onClick={this.onChange}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} onChange={() => {}} />

            <div className={"dolfo-checkbox-square" + (checked ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace}>
                <CheckIcon />
            </div>
            {props.label && <label className="dolfo-checkbox-label">
                {props.label}
                {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>} 
            </label>}
        </div>
    }
}