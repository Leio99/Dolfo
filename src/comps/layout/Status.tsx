import React, { CSSProperties } from "react"
import { DialogType } from "./Dialog"
import { CheckIcon, ErrorCircleIcon, Icon, InfoCircleIcon, WarningIcon } from "./Icon"
import { TooltipProps } from "./Tooltip"

interface IProps extends TooltipProps{
    readonly type: DialogType | "pending"
    readonly hideIcon?: boolean
    readonly style?: CSSProperties
    readonly className?: string
}

export class Status extends React.Component<IProps>{
    render = (): JSX.Element => {
        const { props } = this,
        icons = {
            success: <CheckIcon color="var(--green)" />,
            error: <ErrorCircleIcon color="var(--red)" />,
            info: <InfoCircleIcon color="var(--darkblue)" />,
            warning: <WarningIcon color="var(--orange)" />,
            pending: <Icon iconKey="clock" color="var(--dark)" />
        }

        return <div className={"dolfo-status" + (props.type ? (" " + props.type) : "") + (props.className ? (" " + props.className) : "")} style={props.style} data-tooltip={props.tooltip} data-place={props.placeTooltip}>
            {!props.hideIcon && icons[props.type]} {props.children}
        </div>
    }
}