import { CSSProperties } from "react"
import { TooltipPlacement } from "../../layout/Tooltip"

export interface IColumn{
    /** Defines if the column header should show a tooltip
     * @type ReactNode
     */
    readonly tooltip?: React.ReactNode
    /** Defines the position of the tooltip for the header
     * @type TooltipPlacement
     * @default "top"
     */
    readonly placeTooltip?: TooltipPlacement
    /** Defines the field which the column should refer
     * @type string
     * @required
     */
    readonly field: string
    /** Defines the label of the column
     * @type string
     * @required
     */
    readonly label: string
    /** Defines the width of the column
     * @type number or string
     */
    readonly width?: number | string
    /** Defines the alignment of the column
     * @type "left" | "right" | "center" | "justify"
     * @default "left"
     */
    readonly align?: "left" | "right" | "center" | "justify"
    /** Defines if the column can be searchable
     * @type boolean
     */
    readonly canSearch?: boolean
    /** Defines a different field which is used for searching
     * @type string
     */
    readonly searchField?: string
    /** The type of the column
     * @type "date" | "time" | "check" | "boolean"
     * @default uses 'field'
     */
    readonly type?: "date" | "time" | "check" | "boolean"
    /** Defines if the 'check all' checkbox is checked
     * @type boolean
     */
    readonly checked?: boolean
    /** Defines a tooltip for the checkbox to select all the elements
     * @type ReactNode
     */
    readonly checkTooltip?: React.ReactNode
    /** Defines if the columns is exportable
     * @type boolean
     */
    readonly exportable?: boolean
    /** Defines a different field which is used for exporting
     * @type string
     */
    readonly exportField?: string
    /** While in card layout, the filed will be hidden
     * @type boolean
     * @default uses 'field'
     */
    readonly hideCard?: boolean
    /** Defines wether the 'check all' checkbox is disabled
     * @type boolean
     */
    readonly checkDisabled?: boolean
    /** Defines if the column is orderable
     * @type boolean
     */
    readonly orderable?: boolean
    /** Defines a different field which is used for ordering
     * @type string
     */
    readonly orderKey?: string
    /** Function triggered when the 'check all' checkbox is selected
     * @type Function
     * @default uses 'field'
     */
    readonly onCheckAll?: () => void
}

export interface IDataColumn{
    [key: string]: any
    /** Additional style for the row
     * @type CSSProperties
     */
    rowStyle?: CSSProperties
    /** Defines if the row is checked
     * @type boolean
     */
    checked?: boolean
    /** Defines if the checkbox is disbled
     * @type boolean
     */
    checkDisabled?: boolean
    /** Defines if the checkbox is hidden
     * @type boolean
     */
    hideCheck?: boolean
    /** Function triggered when the checkbox value changes on the row
     * @type Function
     */
    onCheckChange?: () => void
    /** Function triggered when doubleclicking the row
     * @type Function
     */
    onDoubleClick?: () => void
}