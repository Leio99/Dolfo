import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { LoadingIcon } from "../layout/Icon"

export interface IProps extends InputProps{
    readonly value?: any
    readonly checked?: boolean
    readonly loading?: boolean
}

export class Switch extends React.PureComponent<IProps>{
    onChange = () => this.props.onChange && this.props.onChange(this.props.value)

    checkSpace = (e: any) => {
        if(e.keyCode === 32){
            e.preventDefault()
            
            !this.props.loading && this.onChange()
            e.target.blur()
        }
    }

    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-input-switch" + ((props.disabled || props.loading) ? " disabled" : "")} onClick={this.onChange}>
            <input type="checkbox" required={props.required} checked={props.checked} tabIndex={-1} />

            <div className={"dolfo-switch" + (props.checked ? " checked" : "") + (props.className ? (" " + props.className) : "")} tabIndex={props.loading ? -1 : 0} onKeyUp={this.checkSpace}>
                <div className={"dolfo-switch-dot" + (props.loading ? " loading" : "")}>
                    {props.loading && <LoadingIcon spinning />}
                </div>
            </div>
            
            <label>{props.label}</label>
        </div>
    }
}