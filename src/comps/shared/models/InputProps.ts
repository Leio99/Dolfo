import React, { CSSProperties } from "react"
import { BaseIconProps } from "../../layout/Icon"

export interface BaseInputProps{
    readonly label?: JSX.Element | string
    readonly disabled?: boolean
    readonly required?: boolean
    readonly style?: CSSProperties
    readonly className?: string
    readonly onChange?: (value: any) => void
}

export interface ExtendedInputProps extends BaseInputProps{
    readonly icon?: BaseIconProps
    readonly wrapperStyle?: CSSProperties
    readonly autoFocus?: boolean
    readonly onPaste?: (e: React.ClipboardEvent) => void
    readonly onKeyUp?: (e: React.KeyboardEvent) => void
    readonly onKeyDown?: (e: React.KeyboardEvent) => void
    readonly onKeyPress?: (e: React.KeyboardEvent) => void
}

export interface FullInputProps extends ExtendedInputProps{
    readonly onFocus?: (e: React.FocusEvent) => void
    readonly onBlur?: (e: React.FocusEvent) => void
    readonly name?: string
    readonly readonly?: boolean
    readonly onCopy?: (e: React.ClipboardEvent) => void
}