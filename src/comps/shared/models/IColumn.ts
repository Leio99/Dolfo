import { CSSProperties } from "react";

export interface IColumn{
    readonly field: string
    readonly label: string | JSX.Element
    readonly width?: number | string
    readonly align?: "left" | "right" | "center"
    readonly canSearch?: boolean
    readonly tooltip?: boolean
}

export interface IDataColumn{
    readonly onDoubleClick?: () => void
    readonly rowStyle?: CSSProperties
    readonly [key: string]: any
}