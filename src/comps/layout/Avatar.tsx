import React from "react"
import { CSSProperties } from "react"
import { TooltipProps } from "./Tooltip"

interface IProps extends TooltipProps{
    readonly className?: string
    readonly style?: CSSProperties
    readonly size?: "small" | "medium" | "large" | "xl"
    readonly imageSource: string
}

export class Avatar extends React.Component<IProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-avatar " + (props.size || "medium") + (props.className ? (" " + props.className) : "")} style={props.style} data-tooltip={props.tooltip} data-place={props.placeTooltip}>
            <img src={props.imageSource} alt="avatar" />
        </div> 
    }
}