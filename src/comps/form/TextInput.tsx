import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { Icon } from "../layout/Icon"
import { InputWrapper } from "./InputWrapper"
import { Constants } from "../shared/Constants"

export type InputTypes = "textarea" | "password" | "email" | "number"

export interface IProps extends InputProps{
    readonly type?: InputTypes
    readonly expandTextarea?: boolean
    readonly rows?: number
    readonly togglePassword?: boolean
    readonly placeHolder?: string
    readonly minLength?: number
    readonly maxLength?: number
    readonly value?: string
    readonly max?: number
    readonly min?: number
}
export interface IState{
    readonly focused: boolean
    readonly rows: number
    readonly value: string
    readonly inputType: string
}

const MAX_ROWS = 5

export class TextInput extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)
        
        this.state = {
            focused: false,
            rows: 1,
            value: props.value || "",
            inputType: !props.type || props.type === "number" ? "text" : props.type
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        let value = this.state.value,
        inputType = this.state.inputType

        if(prevProps.value !== this.props.value)
            value = this.props.value
        if(prevProps.type !== this.props.type)
            inputType = this.props.type

        this.setState({ value, inputType })
    }

    toggleInputType = () => this.setState({ inputType: this.state.inputType === "password" ? "text" : "password" })

    onBlur = () => this.setState({ focused: false })

    onFocus = () => this.setState({ focused: true })

    onChange = (e: any) => {
        if(this.props.type === "number"){
            let number =  Number(e.target.value)

            if(isNaN(number) || number > this.props.max || number < this.props.min) return
        }
		
		this.checkRows(e)

        this.props.onChange && this.props.onChange(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    
    resetInput = () => {
        this.props.onChange && this.onChange({ target: { value: "" }})

        this.setState({
            rows: 1,
            value: ""
        })
    }

    checkRows = (e: any) => {
        if(this.props.expandTextarea){
            let rows = e.target.value.split("\n").length,
            max = this.props.rows || MAX_ROWS

            this.setState({
                rows: rows <= max ? rows : max
            })
        }

        this.props.onKeyUp && this.props.onKeyUp(e)
    }

    getDefaultIcon = () => {
        const props = this.props

        if(props.type === "password") return "lock"
        if(props.type === "email") return "envelope"
        if(props.type === "number") return "calculator"

        return "pen"
    }

    increaseValue = () => this.onChange({ target: { value: Number(this.state.value) + 1 }})

    decreaseValue = () => this.onChange({ target: { value: Number(this.state.value) - 1 }})

    render = (): JSX.Element => {
        const props = this.props,
        { focused, rows, value, inputType } = this.state,
        icon = props.icon || {
            iconKey: this.getDefaultIcon()
        }
        let input: HTMLInputElement | HTMLTextAreaElement

        return <InputWrapper style={props.wrapperStyle} label={props.label} focusBool={focused} icon={icon} value={value} resetFunction={this.resetInput} forceFocus={() => input.focus()} disabled={props.disabled} className={props.type === "number" ? "input-number" : (props.type === "password" && props.togglePassword) ? "toggle-password" : ""} required={props.required}>
            {
                props.type === "password" && props.togglePassword && value.length > 0 && <Icon type="far" iconKey={inputType === "password" ? "eye" : "eye-slash"} onClick={this.toggleInputType} className="toggle-password" tooltip={inputType === "password" ? Constants.SHOW_PASSWORD_TEXT : Constants.HIDE_PASSWORD_TEXT} />
            }

            {
                props.type === "number" && <div className="dolfo-input-number-btns">
                    <Icon iconKey="caret-up" className="increase" onClick={this.increaseValue} tooltip={Constants.INCREASE_TEXT} />
                    <Icon iconKey="caret-down" className="decrease" onClick={this.decreaseValue} tooltip={Constants.DECREASE_TEXT} />
                </div>
            }

            {
                props.type !== "textarea" ? <input
                    type={inputType}
                    name={props.name}
                    onChange={this.onChange}
                    className={props.className}
                    disabled={props.disabled}
                    placeholder={props.placeHolder}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    value={value}
                    readOnly={props.readonly}
                    ref={r => input = r}
                    required={props.required}
                    onKeyDown={props.onKeyDown}
                    onKeyPress={props.onKeyPress}
                    onKeyUp={props.onKeyUp}
                    onPaste={props.onPaste}
                    onCopy={props.onCopy}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                /> : <textarea
                    name={props.name}
                    onChange={this.onChange}
                    disabled={props.disabled}
                    placeholder={props.placeHolder}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    className={props.className}
                    readOnly={props.readonly}
                    rows={props.expandTextarea ? rows : props.rows}
                    onKeyUp={props.onKeyUp}
                    onKeyDown={props.onKeyDown}
                    onKeyPress={props.onKeyPress}
                    onPaste={props.onPaste}
                    onCopy={props.onCopy}
                    required={props.required}
                    value={value}
                    ref={r => input = r}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                ></textarea>
            }
        </InputWrapper>
    }
}