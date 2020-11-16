import React, { CSSProperties } from "react"
import { IIcon } from "../shared/models/IIcon"
import { CloseIcon, Icon } from "../layout/Icon"

export interface IProps{
    readonly label?: JSX.Element | string
    readonly style?: CSSProperties
    readonly onFocus?: (e: any) => void
    readonly onBlur?: (e: any) => void
    readonly icon: IIcon
    readonly focusBool?: boolean
    readonly value?: string
    readonly isFocusable?: boolean
    readonly resetFunction?: () => void
    readonly forceFocus?: () => void
    readonly disabled?: boolean
    readonly className?: string
}
export class InputWrapper extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-form-input" + (props.disabled ? " disabled" : "") + (props.className ? (" " + props.className) : "")} style={props.style} onFocus={props.onFocus ? props.onFocus : null} tabIndex={props.isFocusable ? 0 : -1} onBlur={props.onBlur ? props.onBlur : null}>
            {props.label && <label className="dolfo-input-label">{props.label}</label>}
            
            <div className={"dolfo-input-wrapper" + (props.focusBool ? " focused" : "")} onClick={props.forceFocus ? props.forceFocus : null}>
                { (props.value && props.value.length && props.resetFunction) ? <CloseIcon className="reset-input" onClick={props.resetFunction} /> : null}

                <div className="dolfo-input-icon">
                    <Icon icon={props.icon} />
                </div>

                <div className="dolfo-input-content">
                    {props.children}
                </div>
            </div>
        </div>
    }
}