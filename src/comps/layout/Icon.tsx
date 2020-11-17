import React, { CSSProperties } from "react"

export interface BaseIconProps {
    readonly type?: "fa" | "far" | "fal" | "fas" | "fab"
    readonly iconKey: string
}
export interface DefaultIconProps{
    readonly className?: string
    readonly spinning?: boolean
    readonly style?: CSSProperties
    readonly onClick?: () => void
    readonly color?: string
}
export interface IProps extends DefaultIconProps, BaseIconProps{}

export class Icon extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <i className={"dolfo-icon " + 
            (props.type || "fa") +
            " fa-" +
            props.iconKey +
            " fa-fw" +
            (props.className ? (" " + props.className) : "") + 
            (props.spinning ? " spin" : "")
        }
        style={{ ...props.style, color: props.color }}
        onClick={props.onClick}></i>
    }
}

export const CheckIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="check" />
}
export const CheckCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="check-circle" />
}
export const CheckCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="check-circle" />
}
export const QuestionIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="question" />
}
export const QuestionCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="question-circle" />
}
export const QuestionCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="question-circle" />
}
export const ErrorIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="exclamation" />
}
export const ErrorCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="exclamation-circle" />
}
export const ErrorCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="exclamation-circle" />
}
export const InfoIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="info" />
}
export const InfoCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="info-circle" />
}
export const InfoCircleOutlineIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="info-circle" />
}
export const LoadingIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="spinner-third" />
}
export const CloseIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="times" />
}
export const WarningIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="exclamation-triangle" />
}
export const WarningIconOutline = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="exclamation-triangle" />
}
export const SearchIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="search" />
}