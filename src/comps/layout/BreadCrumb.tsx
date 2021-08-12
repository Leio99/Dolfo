import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import { Icon } from "./Icon"

interface IProps{
    readonly style?: CSSProperties,
    readonly className?: string
}

interface BredcrumbItemProps{
    readonly onClick?: () => void
}

export class BreadCrumb extends React.PureComponent<IProps>{
    getOptions = (): BreadCrumbItem[] => {
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
                    return <div className="dolfo-breadcrumb-item">
                        <div className={"dolfo-breadcrumb-item-inner" + (opt.props.onClick ? " clickable" : "")} onClick={opt.props.onClick} data-tooltip={opt.props.onClick && Constants.NAVIGATE_BREADCRUMB}>
                            {opt.props.children}
                        </div>
            
                        {!!options[i + 1] && <div className="dolfo-breadcrumb-arrow">
                            <Icon iconKey="chevron-right" type="fal" />    
                        </div>}
                    </div>
                })
            }
        </div>
    }
}

export class BreadCrumbItem extends React.PureComponent<BredcrumbItemProps>{
    render = (): JSX.Element => <></>
}