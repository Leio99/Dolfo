import React from "react"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"
import { Option } from "./Option"

export interface RadioButtonProps extends BaseInputProps, React.PropsWithChildren{
    /** The name of the control inside the form
     * @type string
     */
    readonly controlName: string
    /** Defines the default value of the radio input
     * @type any
     */
    readonly defaultValue?: any
}

interface IState{
    readonly value: any
}

export class RadioButton extends React.PureComponent<RadioButtonProps, IState>{
    constructor(props: RadioButtonProps){
        super(props)

        this.state = {
            value: props.defaultValue
        }
    }

    componentDidUpdate = (prevProps: RadioButtonProps): void => {
        if(prevProps.defaultValue !== this.props.defaultValue){
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    changeValue = (value: any): void => {
        if(this.props.disabled) return
        
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
    }

    getOptions = (): Option[] =>  React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    render = (): React.ReactNode => {
        const { props } = this,
        options = this.getOptions(),
        { value } = this.state

        return <div className={"dolfo-input-radio-container" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.label && <label className="dolfo-input-radio-label">
                {props.label}
                {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>}  
            </label>}
            {
                options?.map((option, i) => <Option {...option.props} selected={value === option.props.value} onChange={this.changeValue} controlName={props.controlName} required={props.required} isRadio key={i} />)
            }
        </div>
    }
}