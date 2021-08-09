import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { LoadingIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"

interface IProps extends InputProps{
    readonly value?: any
    readonly checked?: boolean
    readonly loading?: boolean
}

export class Switch extends React.PureComponent<IProps, IProps>{
    constructor(props: IProps){
        super(props)
        
        this.state = {
            checked: props.checked || false
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.checked !== this.props.checked){
            this.setState({
                checked: this.props.checked
            })
        }
    }

    onChange = (): void => {
        if(this.props.disabled) return
        
        !this.props.onChange && this.setState({
            checked: !this.state.checked
        })

        this.props.onChange && this.props.onChange(this.props.value)
    }

    checkSpace = (e: any): void => {
        if(e.key.charCodeAt(0) === 32){
            e.preventDefault()
            
            !this.props.loading && this.onChange()
            e.target.blur()
        }
    }

    render = (): JSX.Element => {
        const props = this.props,
        { checked } = this.state

        return <div className={"dolfo-input-switch" + ((props.disabled || props.loading) ? " disabled" : "") + (props.className ? (" " + props.className) : "")} onClick={this.onChange} style={props.wrapperStyle}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} />

            <div className={"dolfo-switch" + (checked ? " checked" : "")} tabIndex={props.loading ? -1 : 0} onKeyUp={this.checkSpace} style={props.style}>
                <div className={"dolfo-switch-dot" + (props.loading ? " loading" : "")}>
                    {props.loading && <LoadingIcon spinning />}
                </div>
            </div>
            
            {props.label && <label>
                {props.label}
                {props.required && <span className="dolfo-input-required" data-tooltip={Constants.REQUIRED_FIELD}> *</span>} 
            </label>}
        </div>
    }
}