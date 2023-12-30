import React, { CSSProperties } from "react"
import { DialogType } from "./Dialog"
import { CheckIcon, ErrorCircleIcon, Icon, InfoCircleIcon, WarningIcon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    /** The type of status
     * @type DialogType | "pending"
     * @required
     */
    readonly type: DialogType | "pending"
    /** If true, hides the status icon
     * @type boolean
     */
    readonly hideIcon?: boolean
    /** Additional className for the status
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the status
     * @type string
     */
    readonly className?: string
}

export class Status extends React.Component<IProps>{
    render = (): React.ReactNode => {
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