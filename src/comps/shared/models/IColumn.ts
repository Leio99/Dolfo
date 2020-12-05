import { CSSProperties } from "react"

export interface IColumn{
    readonly field?: string
    readonly label?: string | JSX.Element
    readonly width?: number | string
    readonly align?: "left" | "right" | "center" | "justify"
    readonly canSearch?: boolean
    readonly tooltip?: boolean
    readonly isCheck?: boolean
    readonly onCheckAll?: () => void
    readonly checked?: boolean
    readonly checkTooltip?: string
}

export interface IDataColumn{
    readonly onDoubleClick?: () => void
    readonly rowStyle?: CSSProperties
    readonly [key: string]: any
    readonly onCheckChange?: (obj: any) => void
    readonly checked?: boolean
    readonly checkDisabled?: boolean
}