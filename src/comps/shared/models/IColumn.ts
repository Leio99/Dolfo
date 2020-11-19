import { CSSProperties } from "react";

export interface IColumn{
    readonly field: string
    readonly label: string | JSX.Element
    readonly width?: number | string
    readonly align?: "left" | "right" | "center"
}

export interface IDataColumn{
    readonly onDoubleClick?: () => void
    readonly rowStyle?: CSSProperties
    readonly [key: string]: any
}