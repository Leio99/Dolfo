import { CSSProperties } from "react"
import { TooltipPlacement } from "../../layout/Tooltip"

export interface IColumn{
    readonly field?: string
    readonly label?: string
    readonly width?: number | string
    readonly align?: "left" | "right" | "center" | "justify"
    readonly canSearch?: boolean
    readonly searchField?: string
    readonly tooltip?: boolean
    readonly placeTooltip?: TooltipPlacement
    readonly type?: "date" | "time" | "check"
    readonly onCheckAll?: () => void
    readonly checked?: boolean
    readonly checkTooltip?: string
    readonly exportable?: boolean
    readonly exportField?: string
}

export interface IDataColumn{
    onDoubleClick?: () => void
    rowStyle?: CSSProperties
    onCheckChange?: (obj: any) => void
    checked?: boolean
    checkDisabled?: boolean
    hideCheck?: boolean
    [key: string]: any
}
