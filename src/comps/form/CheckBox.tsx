import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { CheckIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { TooltipProps } from "../layout/Tooltip"

interface IProps extends InputProps, TooltipProps{
    readonly checked?: boolean
    readonly value?: any
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
        if(this.props.disabled) return
        
        !this.props.onChange && this.setState({
            checked: !this.state.checked
        })

        this.props.onChange && this.props.onChange(this.props.value)
    }

    checkSpace = (e: any) => {
        if(e.key.charCodeAt(0) === 32){
            this.onChange()
            e.preventDefault()
            e.stopPropagation()
        }
    }

    render = (): JSX.Element => {
        const props = this.props,
        { checked } = this.state

        return <div className={"dolfo-checkbox" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} style={props.style} onClick={this.onChange}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} />

            <div className={"dolfo-checkbox-square" + (checked ? " checked" : "")} tabIndex={0} onKeyUp={this.checkSpace} data-tooltip={props.tooltip} data-place={props.placeTooltip}>
                <CheckIcon />
            </div>
            {props.label && <label className="dolfo-checkbox-label">
                {props.label}
                {props.required && <span className="dolfo-input-required" data-tooltip={Constants.REQUIRED_FIELD}> *</span>} 
            </label>}
        </div>
    }
}
