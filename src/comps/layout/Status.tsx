import React from "react"
import { DialogType } from "./Dialog"
import { CheckIcon, ErrorCircleIcon, InfoCircleIcon, WarningIcon } from "./Icon"

interface IProps{
    readonly type: DialogType
    readonly hideIcon?: boolean
    readonly tooltip?: string
}

export class Status extends React.Component<IProps>{
    render = (): JSX.Element => {
        const { props } = this,
        icons = {
            success: <CheckIcon color="var(--green)" />,
            error: <ErrorCircleIcon color="var(--red)" />,
            info: <InfoCircleIcon color="var(--darkblue)" />,
            warning: <WarningIcon color="var(--orange)" />
        }

        return <div className={"dolfo-status" + (props.type ? (" " + props.type) : "")} data-tooltip={props.tooltip}>
            {!props.hideIcon && icons[props.type]} {props.children}
        </div>
    }
}