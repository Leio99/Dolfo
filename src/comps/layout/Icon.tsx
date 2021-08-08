import React, { CSSProperties } from "react"
import { TooltipProps } from "./Tooltip"

export interface BaseIconProps {
    readonly type?: "fa" | "far" | "fal" | "fas" | "fab" | "fad"
    readonly iconKey: string
}

interface DefaultIconProps extends TooltipProps{
    readonly className?: string
    readonly spinning?: boolean
    readonly style?: CSSProperties
    readonly onClick?: (e: any) => void
    readonly color?: string
    readonly large?: boolean
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
        } data-tooltip={props.tooltip} data-place={props.placeTooltip} style={{ ...props.style, color: props.color }} onClick={props.onClick}></i>
    }
}

export const DeleteIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="trash-alt" />

export const CheckIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="check" />

export const CheckCircleIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="check-circle" />

export const CheckCircleOutlineIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="check-circle" />

export const QuestionIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="question" />

export const QuestionCircleIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="question-circle" />

export const QuestionCircleOutlineIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="question-circle" />

export const ErrorIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="exclamation" />

export const ErrorCircleIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="exclamation-circle" />

export const ErrorCircleOutlineIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="exclamation-circle" />

export const InfoIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="info" />

export const InfoCircleIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="info-circle" />

export const InfoCircleOutlineIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="info-circle" />

export const LoadingIcon = (props: DefaultIconProps) => <Icon {...props} type="fal" iconKey="spinner-third" />

export const CloseIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="times" />

export const CloseCircleIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="times-circle" />

export const WarningIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="exclamation-triangle" />

export const WarningIconOutline = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="exclamation-triangle" />

export const SearchIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="search" />

export const DetailIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="external-link" />

export const EditIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="pen" type="far" />

export const AddIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="plus" />

export const MinusIcon = (props: DefaultIconProps) => <Icon {...props} type="far" iconKey="minus" />

export const ReloadIcon = (props: DefaultIconProps) => <Icon {...props} iconKey="sync" />