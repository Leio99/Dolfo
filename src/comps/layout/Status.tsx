import React, { CSSProperties } from "react"
import { DialogType } from "./Dialog"
import { CheckIcon, ErrorCircleIcon, Icon, InfoCircleIcon, WarningIcon } from "./Icon"

interface IProps extends React.PropsWithChildren<unknown>{
    readonly type: DialogType | "pending"
    readonly hideIcon?: boolean
    readonly style?: CSSProperties
    readonly className?: string
}

export class Status extends React.Component<IProps>{
    render = (): JSX.Element => {
        const { props } = this,
        icons = {
            success: <CheckIcon />,
            error: <ErrorCircleIcon />,
            info: <InfoCircleIcon />,
            warning: <WarningIcon />,
            pending: <Icon iconKey="clock" />
        }

        return <div className={"dolfo-status" + (props.type ? (" " + props.type) : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            {!props.hideIcon && icons[props.type]} {props.children}
        </div>
    }
}