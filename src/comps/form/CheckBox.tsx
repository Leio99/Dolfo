import React from "react"
import { BaseInputProps } from "../shared/models/InputProps"
import { CheckIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { Tooltip } from "../layout/Tooltip"

export interface CheckBoxProps extends BaseInputProps{
    readonly checked?: boolean
}

export class CheckBox extends React.PureComponent<CheckBoxProps, CheckBoxProps>{ 
    constructor(props: CheckBoxProps){
        super(props)
        
        this.state = {
            checked: props.checked || false
        }
    }

    componentDidUpdate = (prevProps: CheckBoxProps): void => {
        if(prevProps.checked !== this.props.checked || this.props.checked !== this.state.checked)
            this.setState({ checked: !!this.props.checked })
    }

    onChange = (): void => {
        if(this.props.disabled) return
        
        this.setState({
            checked: !this.state.checked
        }, () => this.props.onChange && this.props.onChange(this.state.checked))
    }

    checkSpace = (e: any): void => {
        if(e.key.charCodeAt(0) === 32){
            this.onChange()
            e.preventDefault()
            e.stopPropagation()
        }
    }

    render = (): JSX.Element => {
        const { props } = this,
        { checked } = this.state

        return <div className={"dolfo-checkbox" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} style={props.style} onClick={this.onChange}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} readOnly />

            <div className={"dolfo-checkbox-square" + (checked ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace}>
                <CheckIcon />
            </div>
            {props.label && <label className="dolfo-checkbox-label">
                {props.label}
                {props.required && <Tooltip tooltip={Constants.REQUIRED_FIELD}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>} 
            </label>}
        </div>
    }
}