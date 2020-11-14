import React, { CSSProperties } from "react"
import { IIcon } from "../../models/IIcon";

export interface IProps extends DefaultIconProps{
    readonly icon: IIcon
}
export interface DefaultIconProps{
    readonly className?: string
    readonly spinning?: boolean
    readonly style?: CSSProperties
    readonly onClick?: () => void
    readonly color?: string
}

export class Icon extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <i className={"dolfo-icon " + 
            (props.icon.type || "fa") +
            " fa-" +
            props.icon.key +
            " fa-fw" +
            (props.className ? (" " + props.className) : "") + 
            (props.spinning ? " spin" : "")
        }
        style={{ ...props.style, color: props.color }}
        onClick={props.onClick ? props.onClick : null}></i>
    }
}

export const CheckIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "check" }} />
}
export const CheckCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "check-circle" }} />
}
export const CheckCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "check-circle" }} />
}
export const QuestionIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "question" }} />
}
export const QuestionCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "question-circle" }} />
}
export const QuestionCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "question-circle" }} />
}
export const ErrorIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "exclamation" }} />
}
export const ErrorCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "exclamation-circle" }} />
}
export const ErrorCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "exclamation-circle" }} />
}
export const InfoIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "info" }} />
}
export const InfoCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "info-circle" }} />
}
export const InfoCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "info-circle" }} />
}
export const LoadingIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "spinner-third" }} />
}
export const CloseIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "times" }} />
}
export const WarningIcon = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "fa", key: "exclamation-triangle" }} />
}
export const WarningIconOutline = (props: DefaultIconProps) => {
    return <Icon {...props} icon={{ type: "far", key: "exclamation-triangle" }} />
}