import React from "react"
import { FullInputProps } from "../shared/models/InputProps"
import { Icon } from "../layout/Icon"
import { InputWrapper } from "./InputWrapper"
import { getConstant } from "../shared/Constants"
import { Tooltip } from "../layout/Tooltip"
import { IconKey } from "../shared/models/IconModel"

type InputTypes = "textarea" | "password" | "email" | "number"

export interface TextInputProps extends FullInputProps{
    readonly type?: InputTypes
    readonly expandTextarea?: boolean
    readonly rows?: number
    readonly togglePassword?: boolean
    readonly minLength?: number
    readonly maxLength?: number
    readonly value?: string
    readonly max?: number
    readonly min?: number
    readonly placeHolder?: string
    readonly autocomplete?: string
}

interface IState{
    readonly focused: boolean
    readonly rows: number
    readonly value: string
    readonly inputType: string
}

const MAX_ROWS = 5

export class TextInput extends React.PureComponent<TextInputProps, IState>{
    constructor(props: TextInputProps){
        super(props)
        
        this.state = {
            focused: false,
            rows: 1,
            value: props.value || "",
            inputType: !props.type || props.type === "number" ? "text" : props.type
        }
    }

    componentDidUpdate = (prevProps: TextInputProps): void => {
        let value = this.state.value,
        inputType = this.state.inputType

        if(prevProps.value !== this.props.value)
            value = this.props.value
        if(prevProps.type !== this.props.type)
            inputType = this.props.type

        this.setState({ value, inputType })
    }

    toggleInputType = (): void => this.setState({ inputType: this.state.inputType === "password" ? "text" : "password" })

    onBlur = (e: React.FocusEvent): void => this.setState({ focused: false },  () => this.props.onBlur && this.props.onBlur(e))

    onFocus = (e: React.FocusEvent): void => this.setState({ focused: true }, () => this.props.onFocus && this.props.onFocus(e))

    onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if(this.props.disabled) return

        let value: string = e.target.value

        if(this.props.type === "number"){
            const number = Number(e.target.value)

            value = number.toString()

            if((isNaN(number) || number > this.props.max || number < this.props.min) && e.target.value) return

            if(!e.target.value)
                value = ""
        }
		
		this.checkRows(e)

        this.props.onChange && this.props.onChange(value)
        this.setState({ value })
    }
    
    resetInput = (): void => {
        if(this.props.disabled) return
        
        this.props.onChange && this.onChange({ target: { value: "" }} as React.ChangeEvent<HTMLInputElement>)

        this.setState({
            rows: 1,
            value: ""
        })
    }

    checkRows = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if(this.props.expandTextarea){
            const rows = e.target.value.split("\n").length,
            max = this.props.rows || MAX_ROWS

            this.setState({
                rows: rows <= max ? rows : max
            })
        }
    }

    getDefaultIcon = (): IconKey => {
        const { props } = this

        if(props.type === "password") return "lock"
        if(props.type === "email") return "envelope"
        if(props.type === "number") return "calculator"

        return "pen"
    }

    increaseValue = (): void => this.onChange({ target: { value: (Number(this.state.value) + 1).toString() }} as React.ChangeEvent<HTMLInputElement>)

    decreaseValue = (): void => this.onChange({ target: { value: (Number(this.state.value) - 1).toString() }} as React.ChangeEvent<HTMLInputElement>)

    render = (): React.ReactNode => {
        const { props } = this,
        { focused, rows, value, inputType } = this.state,
        icon = props.icon || {
            iconKey: this.getDefaultIcon(),
	        type: "far"
        }
        let input: HTMLInputElement | HTMLTextAreaElement

        return <InputWrapper style={props.wrapperStyle} label={props.label} focusBool={focused} icon={icon} value={value} resetFunction={this.resetInput} forceFocus={() => input.focus()} disabled={props.disabled} className={(props.type === "number" ? "input-number" : (props.type === "password" && props.togglePassword) ? "toggle-password" : "") + (props.className ? (" " + props.className) : "")} required={props.required}>
            {
                props.type === "password" && props.togglePassword && value.length > 0 && <Tooltip tooltip={inputType === "password" ? getConstant("SHOW_PASSWORD_TEXT") : getConstant("HIDE_PASSWORD_TEXT")}>
                    <Icon type="far" iconKey={inputType === "password" ? "eye" : "eye-slash"} onClick={this.toggleInputType} className="toggle-password" />
                </Tooltip>
            }

            {
                props.type === "number" && <div className="dolfo-input-number-btns">
                    <Tooltip tooltip={getConstant("INCREASE_TEXT")}>
                        <Icon iconKey="caret-up" className="increase" onClick={this.increaseValue} />
                    </Tooltip>
                    <Tooltip tooltip={getConstant("DECREASE_TEXT")} placeTooltip="bottom">
                        <Icon iconKey="caret-down" className="decrease" onClick={this.decreaseValue} />
                    </Tooltip>
                </div>
            }

            {
                props.type !== "textarea" ? <input
                    placeholder={props.placeHolder}
                    type={inputType}
                    name={props.name}
                    autoFocus={props.autoFocus}
                    onChange={this.onChange}
                    disabled={props.disabled}
                    maxLength={props.type !== 'number' && props.maxLength ? props.maxLength : null}
                    minLength={props.type !== 'number' && props.minLength ? props.minLength : null}
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
                    autoComplete={props.autocomplete}
                    style={props.style}
                /> : <textarea
                    placeholder={props.placeHolder}
                    name={props.name}
                    onChange={this.onChange}
                    disabled={props.disabled}
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    className={props.className}
                    readOnly={props.readonly}
                    autoFocus={props.autoFocus}
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
                    style={props.style}
                ></textarea>
            }
        </InputWrapper>
    }
}