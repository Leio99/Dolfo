import React, { CSSProperties } from "react"
import { BaseIconProps } from "../../layout/Icon"

export interface BaseInputProps{
    /** The label fo the input
     * @type ReactNode
     */
    readonly label?: React.ReactNode
    /** Defines if the input is disabled
     * @type boolean
     */
    readonly disabled?: boolean
    /** Defines if the input is required inside the form
     * @type boolean
     */
    readonly required?: boolean
    /** Additional style for the input
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional class for the input
     * @type string
     */
    readonly className?: string
    /** Event triggered on value change
     * @type Function
     * @param value The input value
     */
    readonly onChange?: (value: any) => void
}

export interface ExtendedInputProps extends BaseInputProps{
    /** Custom icon for the input
     * @type BaseIconProps
     */
    readonly icon?: BaseIconProps
    /** Custom style for the input wrapper
     * @type CSSProperties
     */
    readonly wrapperStyle?: CSSProperties
    /** Defines if the input should focus automatically when loaded
     * @type boolean
     */
    readonly autoFocus?: boolean
    /** Function triggered on paste from clipboard
     * @type Function
     * @param e React.ClipboardEvent
     */
    readonly onPaste?: (e: React.ClipboardEvent) => void
    /** Function triggered on key up
     * @type Function
     * @param e React.KeyboardEvent
     */
    readonly onKeyUp?: (e: React.KeyboardEvent) => void
    /** Function triggered on key down
     * @type Function
     * @param e React.KeyboardEvent
     */
    readonly onKeyDown?: (e: React.KeyboardEvent) => void
    /** Function triggered on key press
     * @type Function
     * @param e React.KeyboardEvent
     */
    readonly onKeyPress?: (e: React.KeyboardEvent) => void
}

export interface FullInputProps extends ExtendedInputProps{
    /** The name of the input inside the form
     * @type string
     */
    readonly name?: string
    /** Defines if the input should be read only
     * @type boolean
     */
    readonly readonly?: boolean
    /** Function triggered when focusing the input
     * @type Function
     * @param e React.FocusEvent
     */
    readonly onFocus?: (e: React.FocusEvent) => void
    /** Function triggered when blurring the input
     * @type Function
     * @param e React.FocusEvent
     */
    readonly onBlur?: (e: React.FocusEvent) => void
    /** Function triggered when copying the value of the input
     * @type Function
     * @param e React.ClipboardEvent
     */
    readonly onCopy?: (e: React.ClipboardEvent) => void
}