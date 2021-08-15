import { CSSProperties } from "react"
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
    readonly onPaste?: (e: any) => void
    readonly onKeyUp?: (e: any) => void
    readonly onKeyDown?: (e: any) => void
    readonly onKeyPress?: (e: any) => void
}

export interface FullInputProps extends ExtendedInputProps{
    readonly onFocus?: (e: any) => void
    readonly onBlur?: (e: any) => void
    readonly name?: string
    readonly readonly?: boolean
    readonly onCopy?: (e: any) => void
}