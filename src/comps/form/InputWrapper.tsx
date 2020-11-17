import React, { CSSProperties } from "react"
import { CloseIcon, Icon, BaseIconProps } from "../layout/Icon"

export interface IProps{
    readonly label?: JSX.Element | string
    readonly style?: CSSProperties
    readonly icon: BaseIconProps
    readonly focusBool?: boolean
    readonly value?: string
    readonly isFocusable?: boolean
    readonly disabled?: boolean
    readonly className?: string
    readonly onFocus?: (e: any) => void
    readonly onBlur?: (e: any) => void
    readonly resetFunction?: () => void
    readonly forceFocus?: () => void
    readonly onKeyDown?: (e: any) => void
}
export class InputWrapper extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-form-input" + (props.disabled ? " disabled" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onFocus={props.onFocus} tabIndex={props.isFocusable ? 0 : -1} onBlur={props.onBlur} onKeyDown={props.onKeyDown}>
            {props.label && <label className="dolfo-input-label">{props.label}</label>}
            
            <div className={"dolfo-input-wrapper" + (props.focusBool ? " focused" : "")} onClick={props.forceFocus}>
                { (props.value && props.value.length && props.resetFunction) ? <CloseIcon className="reset-input" onClick={props.resetFunction} /> : null }

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