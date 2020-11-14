import React from "react"
import { InputProps } from "../../models/InputProps";
import { Option } from "./Option";

export interface IProps extends InputProps{
    readonly controlName: string
    readonly defaultValue?: any
}
export interface IState{
    readonly value: any
}

export class RadioButton extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            value: props.defaultValue || ""
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.defaultValue !== this.props.defaultValue){
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    changeValue = (value: any) => {
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
    }

    getOptions = (children = this.props.children): Option[] => {
        let list: Option[] = [];

        (children as Option[]).forEach(child => {
            if(Array.isArray(child)){
                list = list.concat(this.getOptions(child))
            }else{
                list.push(child)
            }
        })

        return list
    }

    render = (): JSX.Element => {
        const props = this.props,
        options = this.getOptions(),
        { value } = this.state

        return <div className={"dolfo-input-radio-container" + (props.disabled ? " disabled" : "")} style={props.style}>
            {
                options.map(option => {
                    return <Option {...option.props} selected={value === option.props.value} onChange={this.changeValue} controlName={props.controlName} required={props.required} isRadio />
                })
            }
        </div>
    }
}