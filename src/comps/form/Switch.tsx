import React from "react"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { LoadingIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { Tooltip } from "../layout/Tooltip"

export interface SwitchProps extends ExtendedInputProps{
    readonly checked?: boolean
    readonly loading?: boolean
    readonly leftText?: string | JSX.Element
    readonly rightText?: string | JSX.Element
}

export class Switch extends React.PureComponent<SwitchProps, SwitchProps>{
    constructor(props: SwitchProps){
        super(props)
        
        this.state = {
            checked: props.checked || false
        }
    }

    componentDidUpdate = (prevProps: SwitchProps): void => {
        if(prevProps.checked !== this.props.checked || (this.props.checked !== this.state.checked && this.props.checked !== prevProps.checked))
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
            e.preventDefault()
            
            !this.props.loading && this.onChange()
            e.target.blur()
        }
    }

    render = (): JSX.Element => {
        const { props } = this,
        { checked } = this.state

        return <div className={"dolfo-input-switch" + ((props.disabled || props.loading) ? " disabled" : "") + (props.className ? (" " + props.className) : "")} onClick={this.onChange} style={props.wrapperStyle}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} />

            <div className={"dolfo-switch" + (checked ? " checked" : "")} tabIndex={props.loading ? -1 : 0} onKeyUp={this.checkSpace} style={props.style}>
                {props.leftText && checked && <span className="left-text">{props.leftText}</span>}
                <div className={"dolfo-switch-dot" + (props.loading ? " loading" : "")}>
                    {props.loading && <LoadingIcon spinning />}
                </div>
                {props.rightText && !checked && <span className="right-text">{props.rightText}</span>}
            </div>
            
            {props.label && <label>
                {props.label}
                {props.required && <Tooltip tooltip={Constants.REQUIRED_FIELD}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>} 
            </label>}
        </div>
    }
}