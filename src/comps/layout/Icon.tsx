import React, { CSSProperties } from "react"
import { IconKey, IconType } from "../shared/models/IconModel"

export interface BaseIconProps {
    /** The key of the icon
     * @type IconKey
     * @required
     */
    readonly iconKey: IconKey
    /** The type of icon
     * @type IconType
     */
    readonly type?: IconType
}

interface DefaultIconProps{
    /** Defines if the icon is spinning
     * @type boolean
     */
    readonly spinning?: boolean
    /** Defines a color for the icon
     * @type string (CSS color)
     */
    readonly color?: string
    /** Defines if the icon has a large size
     * @type boolean
     */
    readonly large?: boolean
    /** Removes the fixed width for the icon
     * @type boolean
     */
    readonly notFW?: boolean
    /** Additional className for the icon
     * @type string
     */
    readonly className?: string
    /** Additional style for the icon
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Function triggered when clicking the icon
     * @type Function
     * @param e React.MouseEvent
     */
    readonly onClick?: (e: React.MouseEvent) => void
}

export type FullIconProps = DefaultIconProps & BaseIconProps

export class Icon extends React.PureComponent<FullIconProps>{
    render = (): React.ReactElement => {
        const { props } = this

        return <i className={"dolfo-icon " + 
            (props.type || "fa") +
            " fa-" +
            props.iconKey +
            (!props.notFW ? " fa-fw" : "") +
            (props.large ? " fa-lg" : "") +
            (props.className ? (" " + props.className) : "") + 
            (props.spinning ? " spin" : "")
        } style={{ ...props.style, color: props.color }} onClick={props.onClick}></i>
    }
}

export const DeleteIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="trash-alt" />

export const CheckIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="check" />

export const CheckCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="check-circle" />

export const CheckCircleOutlineIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="check-circle" />

export const QuestionIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="question" />

export const QuestionCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="question-circle" />

export const QuestionCircleOutlineIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="question-circle" />

export const ExclamationIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="exclamation" />

export const ExclamationCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="exclamation-circle" />

export const ErrorIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="exclamation" />

export const ErrorCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="exclamation-circle" />

export const ErrorCircleOutlineIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="exclamation-circle" />

export const InfoIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="info" />

export const InfoCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="info-circle" />

export const InfoCircleOutlineIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="info-circle" />

export const LoadingIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="fal" iconKey="spinner-third" />

export const CloseIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="times" />

export const CloseCircleIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="times-circle" />

export const WarningIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="exclamation-triangle" />

export const WarningIconOutline = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="exclamation-triangle" />

export const SearchIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="search" />

export const DetailIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="external-link" />

export const EditIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="pen" type="far" />

export const AddIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="plus" />

export const MinusIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} type="far" iconKey="minus" />

export const ReloadIcon = (props: DefaultIconProps): React.ReactElement => <Icon {...props} iconKey="sync" />