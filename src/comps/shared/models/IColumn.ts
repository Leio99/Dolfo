import { CSSProperties } from "react"
import { TooltipPlacement } from "../../layout/Tooltip"

export interface IColumn{
    readonly tooltip?: boolean
    readonly placeTooltip?: TooltipPlacement
    readonly field?: string
    readonly label?: string
    readonly width?: number | string
    readonly align?: "left" | "right" | "center" | "justify"
    readonly canSearch?: boolean
    readonly searchField?: string
    readonly type?: "date" | "time" | "check" | "boolean"
    readonly checked?: boolean
    readonly checkTooltip?: string
    readonly exportable?: boolean
    readonly exportField?: string
    readonly hideCard?: boolean
    readonly checkDisabled?: boolean
    readonly orderable?: boolean
    readonly orderKey?: string
    readonly onCheckAll?: () => void
}

export interface IDataColumn{
    [key: string]: any
    rowStyle?: CSSProperties
    checked?: boolean
    checkDisabled?: boolean
    hideCheck?: boolean
    onCheckChange?: () => void
    onDoubleClick?: () => void
}