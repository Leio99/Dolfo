import React, { CSSProperties } from "react"

export interface BaseIconProps {
    readonly type?: "fa" | "far" | "fal" | "fas" | "fab"
    readonly iconKey: string
}
export interface DefaultIconProps{
    readonly className?: string
    readonly spinning?: boolean
    readonly style?: CSSProperties
    readonly onClick?: (e: any) => void
    readonly color?: string
    readonly large?: boolean
    readonly tooltip?: string
    readonly notFW?: boolean
}

export class Icon extends React.PureComponent<DefaultIconProps & BaseIconProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <i className={"dolfo-icon " + 
            (props.type || "fa") +
            " fa-" +
            props.iconKey +
            (!props.notFW ? " fa-fw" : "") +
            (props.large ? " fa-lg" : "") +
            (props.className ? (" " + props.className) : "") + 
            (props.spinning ? " spin" : "")
        } data-tooltip={props.tooltip}
        style={{ ...props.style, color: props.color }}
        onClick={props.onClick}></i>
    }
}

export const DeleteIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="fa" iconKey="trash-alt" />
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
    return <Icon {...props} type="fal" iconKey="spinner-third" />
}
export const CloseIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="far" iconKey="times" />
}
export const CloseCircleIcon = (props: DefaultIconProps) => {
    return <Icon {...props} type="fa" iconKey="times-circle" />
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
export const DetailIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="external-link" />
}
export const EditIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="pen" />
}
export const AddIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="plus" />
}
export const MinusIcon = (props: DefaultIconProps) => {
    return <Icon {...props} iconKey="minus" />
}