import React, { useEffect, useRef, useState } from "react"
import { BaseInputProps } from "../shared/models/InputProps"
import { CheckIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { Tooltip } from "../layout/Tooltip"

export interface CheckBoxProps extends BaseInputProps{
    readonly checked?: boolean
}

export const CheckBox = (props: CheckBoxProps) => {
    const [checked, setChecked] = useState(props.checked || false),
    onChange = () => {
        if(props.disabled) return
        
        setChecked(!checked)
        
        if(props.onChange)
            props.onChange(!checked)
    },
    checkSpace = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if(e.key.charCodeAt(0) === 32){
            onChange()
            e.preventDefault()
            e.stopPropagation()
        }
    },
    checkedRef = useRef<boolean>()

    useEffect(() => {
        if(checkedRef.current !== props.checked)
            setChecked(!!props.checked)
    }, [props.checked])

    useEffect(() => {
        checkedRef.current = checked
    }, [checked])

    return <div className={"dolfo-checkbox" + (props.className ? (" " + props.className) : "") + (props.disabled ? " disabled" : "")} style={props.style} onClick={onChange}>
        <input type="checkbox" required={props.required} checked={checked} tabIndex={-1} readOnly />

        <div className={"dolfo-checkbox-square" + (checked ? " checked" : "")} tabIndex={0} onKeyUp={checkSpace}>
            <CheckIcon />
        </div>
        {props.label && <label className="dolfo-checkbox-label">
            {props.label}
            {props.required && <Tooltip tooltip={Constants.REQUIRED_FIELD}>
                <span className="dolfo-input-required"> *</span>
            </Tooltip>} 
        </label>}
    </div>
}