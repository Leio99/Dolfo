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

export type FullIconProps = DefaultIconProps & BaseIconProps

export class Icon extends React.PureComponent<FullIconProps>{
    render = (): JSX.Element => {
        const { props } = this

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

export const DeleteIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="trash-alt" />

export const CheckIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="check" />

export const CheckCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="check-circle" />

export const CheckCircleOutlineIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="check-circle" />

export const ExclamationIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="exclamation" />

export const ExclamationCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="exclamation-circle" />

export const QuestionIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="question" />

export const QuestionCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="question-circle" />

export const QuestionCircleOutlineIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="question-circle" />

export const ErrorIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="exclamation" />

export const ErrorCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="exclamation-circle" />

export const ErrorCircleOutlineIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="exclamation-circle" />

export const InfoIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="info" />

export const InfoCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="info-circle" />

export const InfoCircleOutlineIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="info-circle" />

export const LoadingIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="fal" iconKey="spinner-third" />

export const CloseIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="times" />

export const CloseCircleIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="times-circle" />

export const WarningIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="exclamation-triangle" />

export const WarningIconOutline = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="exclamation-triangle" />

export const SearchIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="search" />

export const DetailIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="external-link" />

export const EditIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="pen" type="far" />

export const AddIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="plus" />

export const MinusIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} type="far" iconKey="minus" />

export const ReloadIcon = (props: DefaultIconProps): JSX.Element => <Icon {...props} iconKey="sync" />