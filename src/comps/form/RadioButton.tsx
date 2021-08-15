import React from "react"
import { Constants } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"
import { Option } from "./Option"

interface IProps extends BaseInputProps{
    readonly controlName: string
    readonly defaultValue?: any
}

interface IState{
    readonly value: any
}

export class RadioButton extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            value: props.defaultValue || ""
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.defaultValue !== this.props.defaultValue){
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    changeValue = (value: any): void => {
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
    }

    getOptions = (): Option[] =>  React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    render = (): JSX.Element => {
        const { props } = this,
        options = this.getOptions(),
        { value } = this.state

        return <div className={"dolfo-input-radio-container" + (props.disabled ? " disabled" : "")} style={props.style}>
            {props.label && <label className="dolfo-input-radio-label">
                {props.label}
                {props.required && <span className="dolfo-input-required" data-tooltip={Constants.REQUIRED_FIELD}> *</span>}  
            </label>}
            {
                options?.map(option => {
                    if((option as any).type !== Option) return option

                    return <Option {...option.props} selected={value === option.props.value} onChange={this.changeValue} controlName={props.controlName} required={props.required} isRadio />
                })
            }
        </div>
    }
}