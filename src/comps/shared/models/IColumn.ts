import { CSSProperties } from "react"

export interface IColumn{
    readonly field?: string
    readonly label?: string
    readonly width?: number | string
    readonly align?: "left" | "right" | "center" | "justify"
    readonly canSearch?: boolean
    readonly tooltip?: boolean
    readonly type?: "date" | "time" | "check"
    readonly onCheckAll?: () => void
    readonly checked?: boolean
    readonly checkTooltip?: string
    readonly exportable?: boolean
}

export interface IDataColumn{
    readonly onDoubleClick?: () => void
    readonly rowStyle?: CSSProperties
    readonly [key: string]: any
    readonly onCheckChange?: (obj: any) => void
    readonly checked?: boolean
    readonly checkDisabled?: boolean
}