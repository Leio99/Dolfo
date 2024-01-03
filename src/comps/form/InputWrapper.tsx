import _ from "lodash"
import React, { CSSProperties, createRef } from "react"
import { BaseIconProps, CloseIcon, Icon } from "../layout/Icon"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"

interface IProps extends React.PropsWithChildren{
    readonly label?: React.ReactNode
    readonly style?: CSSProperties
    readonly icon: BaseIconProps
    readonly focusBool?: boolean
    readonly value?: string
    readonly isFocusable?: boolean
    readonly disabled?: boolean
    readonly required?: boolean
    readonly className?: string
    readonly selectedOption?: any
    readonly onFocus?: (e: React.FocusEvent) => void
    readonly onBlur?: (e: React.FocusEvent) => void
    readonly resetFunction?: (e: React.MouseEvent) => void
    readonly forceFocus?: () => void
    readonly onKeyDown?: (e: React.KeyboardEvent) => void
    readonly onClick?: () => void
}

interface IState{
    readonly error: boolean
}

export class InputWrapper extends React.PureComponent<IProps, IState>{
    private ref = createRef<HTMLDivElement>()

    constructor(props: IProps){
        super(props)

        this.state = {
            error: false
        }
    }

    getRef = (): HTMLDivElement => this.ref.current

    componentDidUpdate = (prevProps: IProps) => {
        if(!_.isEqual(prevProps.value, this.props.value)){
            if((this.props.value == null || this.props.value.toString().trim() === "") && this.props.required)
                this.setState({ error: true })
            else
                this.setState({ error: false })
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { error } = this.state

        return <div className={"dolfo-form-input" + (props.disabled ? " disabled" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onFocus={props.onFocus} tabIndex={props.isFocusable ? 0 : -1} onBlur={props.onBlur} onKeyDown={props.onKeyDown} onClick={props.onClick} ref={this.ref}>
            {props.label && <label className={"dolfo-input-label" + (props.focusBool || props.value || props.selectedOption ? " dirty" : "")}>
                <span>
                    {props.label}
                    {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                        <span className="dolfo-input-required"> *</span>
                    </Tooltip>}  
                </span>  
            </label>}
            
            <div className={"dolfo-input-wrapper" + (props.focusBool ? " focused" : "") + (error ? " invalid" : "")} onClick={props.forceFocus}>
                {(props.value && props.value.length && props.resetFunction) ? <Tooltip tooltip={getConstant("RESET_INPUT_TEXT")}>
                    <CloseIcon className="reset-input" onClick={props.resetFunction} />
                </Tooltip> : null}
                
                <div className="dolfo-input-icon">
                    <Icon {...props.icon} />
                </div>

                <div className="dolfo-input-content">
                    {props.children}
                </div>
            </div>
        </div>
    }
}