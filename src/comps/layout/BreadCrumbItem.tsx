import React from "react"
import { Constants } from "../shared/Constants"
import { Icon } from "./Icon"

export interface IProps{
    readonly onClick?: () => void
    readonly isNotLast?: boolean
}

export class BreadCrumbItem extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className="dolfo-breadcrumb-item">
            <div className={"dolfo-breadcrumb-item-inner" + (props.onClick ? " clickable" : "")} onClick={props.onClick} data-tooltip={props.onClick && Constants.NAVIGATE_BREADCRUMB}>
                {props.children}
            </div>

            {props.isNotLast && <div className="dolfo-breadcrumb-arrow">
                <Icon iconKey="chevron-right" type="fal" />    
            </div>}
        </div>
    }
}