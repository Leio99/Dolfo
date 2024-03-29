import React from "react"
import { LoadingIcon } from "../layout/Icon"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { ExtendedInputProps } from "../shared/models/InputProps"

export interface SwitchProps extends ExtendedInputProps{
    /** Defines if the switch is checked by default
     * @type boolean
     */
    readonly checked?: boolean
    /** Defines if the switch is loading
     * @type boolean
     */
    readonly loading?: boolean
    /** Set this field to true if you don't want the switcher itself to be able to be changed internally, but only externally using props (remember to set onChange callback)
     * @type boolean
     */
    readonly manageChange?: boolean
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
        
        if(!this.props.manageChange)
            this.setState({ checked: !this.state.checked })
        
        if(this.props.onChange)
            this.props.onChange(!this.state.checked)
    }

    checkSpace = (e: React.KeyboardEvent): void => {
        if(e.key.charCodeAt(0) === 32){
            e.preventDefault()
            
            !this.props.loading && this.onChange();
            (e.target as HTMLElement).blur()
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { checked } = this.state

        return <div className={"dolfo-input-switch" + ((props.disabled || props.loading) ? " disabled" : "") + (props.className ? (" " + props.className) : "")} onClick={this.onChange} style={props.wrapperStyle}>
            <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} onChange={() => {}} />

            <div className={"dolfo-switch" + (checked ? " checked" : "")} tabIndex={props.loading ? -1 : 0} onKeyUp={this.checkSpace} style={props.style}>
                <div className={"dolfo-switch-dot" + (props.loading ? " loading" : "")}>
                    {props.loading && <LoadingIcon spinning />}
                </div>
            </div>
            
            {props.label && <label>
                {props.label}
                {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>} 
            </label>}
        </div>
    }
}