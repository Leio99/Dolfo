import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { CheckIcon } from "../layout/Icon"

export interface IProps extends InputProps{
    readonly checked?: boolean
    readonly value?: any
    readonly tooltip?: string
}

export class CheckBox extends React.PureComponent<IProps, IProps>{ 
    constructor(props: IProps){
        super(props)
        
        this.state = {
            checked: props.checked || false
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.checked !== this.props.checked){
            this.setState({
                checked: this.props.checked
            })
        }
    }

    onChange = () => {
        !this.props.onChange && this.setState({
            checked: !this.state.checked
        })

        this.props.onChange && this.props.onChange(this.props.value)
    }

    checkSpace = (e: any) => {
        if(e.keyCode === 32){
            this.onChange()
            e.preventDefault()
        }
    }

    render = (): JSX.Element => {
        const props = this.props,
        { checked } = this.state

        return <div className={"dolfo-checkbox" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} style={props.style} onClick={this.onChange}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} />

            <div className={"dolfo-checkbox-square" + (checked ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace} data-tooltip={props.tooltip}>
                <CheckIcon color="var(--white)" />
            </div>
            {props.label && <label className="dolfo-checkbox-label">{props.label}</label>}
        </div>
    }
}