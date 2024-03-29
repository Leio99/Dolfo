import _ from "lodash"
import React, { createRef } from "react"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"

export interface PinInputProps extends BaseInputProps{
    /** The length of the pin
     * @type number
     * @required
     */
    readonly length: number
    /** The default value of the input
     * @type string
     */
    readonly value?: string
    /** If true, increases the input size
     * @type boolean
     */
    readonly big?: boolean
}

interface IState{
    readonly value: {
        [x: number]: string
    }
}

export class PinInput extends React.Component<PinInputProps, IState>{
    private ref = createRef<HTMLDivElement>()
    constructor(props: PinInputProps){
        super(props)

        this.state = {
            value: props.value ? this.getValueFromString(props.value) : {}
        }
    }

    onChange = (value: string, index: number) => {
        const { disabled, onChange, length } = this.props

        if(disabled) return

        let valueTmp = {...this.state.value}

        valueTmp[index] = value

        this.setState({ value: valueTmp })
        
        onChange && onChange(Object.values(valueTmp).join(""))

        if(index !== length - 1 && value){
            const node = this.ref.current,
            childInput = node.querySelector(".dolfo-input-wrapper").childNodes[index] as HTMLElement,
            sibling = childInput.nextSibling,
            input = sibling.childNodes[0] as HTMLInputElement

            input.focus()
        }
    }

    checkBackSpace = (index: number, key: string) => {
        if(index > 0 && key === "Backspace"){
            this.onChange("", index)
            const node = this.ref.current,
            childInput = node.querySelector(".dolfo-input-wrapper").childNodes[index] as HTMLElement,
            sibling = childInput.previousSibling,
            input = sibling.childNodes[0] as HTMLInputElement

            input.focus()
        }
    }

    getValueFromString = (str: string) => {
        const letters = str.split("")
        let obj: IState["value"] = {}

        letters.forEach((l, i) => obj[i] = l)

        return obj
    }

    pasteFromIndex = (index: number, e: React.ClipboardEvent) => {
        e.preventDefault()
        
        const toPaste = e.clipboardData.getData("text").split(""),
        { length, disabled, onChange } = this.props

        if(disabled)
            return

        let valueTmp = {...this.state.value},
        iTmp = 0


        for(let i = index; i < length; i++){
            valueTmp[i] = toPaste[iTmp] || valueTmp[i]
            iTmp++
        }

        this.setState({ value: valueTmp })

        onChange && onChange(Object.values(valueTmp).join(""))
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { value } = this.state,
        range = _.range(0, props.length)

        return <div className={"dolfo-input-pin dolfo-form-input" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} style={props.style} ref={this.ref}>
            {props.label && <label className="dolfo-input-label">
                {props.label}
                {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>  
                </Tooltip>}
            </label>}
            
            <div className="dolfo-input-wrapper">
                {
                    range.map(n => <div className="dolfo-input-pin-field dolfo-input-content" key={n}>
                        <input type="text" disabled={props.disabled} value={value[n] || ""} onChange={e => this.onChange((e.nativeEvent as any).data, n)} className={props.big ? " big" : ""} onPaste={e => this.pasteFromIndex(n, e)} required={props.required} onKeyDown={e => this.checkBackSpace(n, e.key)} />
                    </div>)
                }
            </div>
        </div>
    }
}