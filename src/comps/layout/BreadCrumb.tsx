import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import { Icon } from "./Icon"

interface IProps{
    readonly style?: CSSProperties,
    readonly className?: string
}

interface BredcrumbItemProps{
    readonly onClick?: () => void
    readonly isNotLast?: boolean
}

export class BreadCrumb extends React.PureComponent<IProps>{
    getOptions = () => {
        return React.Children.map(this.props.children, (child: any) => {
            if(child.type === BreadCrumbItem) return child
        })
    }

    render = (): JSX.Element => {
        const options = this.getOptions(),
        props = this.props

        return <div className={"dolfo-breadcrumb" + (props.className ? (" " + props.className) : "")} style={props.style}>
            {
                options.map((opt, i) => {
                    return <BreadCrumbItem {...opt.props} isNotLast={options[i + 1]} isFirst={i === 0}>
                        {opt.props.children}
                    </BreadCrumbItem>
                })
            }
        </div>
    }
}

export class BreadCrumbItem extends React.PureComponent<BredcrumbItemProps>{
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