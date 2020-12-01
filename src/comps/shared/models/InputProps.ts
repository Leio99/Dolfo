import { CSSProperties } from "react"
import { BaseIconProps } from "../../layout/Icon"

export interface InputProps{
    readonly name?: string
    readonly label?: JSX.Element | string
    readonly style?: CSSProperties
    readonly wrapperStyle?: CSSProperties
    readonly required?: boolean
    readonly className?: string
    readonly disabled?: boolean
    readonly readonly?: boolean
    readonly icon?: BaseIconProps
    readonly onChange?: (value: any) => void
    readonly onKeyUp?: (e: any) => void
    readonly onKeyDown?: (e: any) => void
    readonly onKeyPress?: (e: any) => void
    readonly onPaste?: (e: any) => void
    readonly onCopy?: (e: any) => void
    readonly onClick?: (e: any) => void
}