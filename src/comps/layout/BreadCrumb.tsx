import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import { Icon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps extends React.PropsWithChildren{
    readonly style?: CSSProperties,
    readonly className?: string
    readonly arrowStyle?: boolean
}

export interface BreadcrumbItemProps extends React.PropsWithChildren{
    readonly onClick?: (e: any) => void
    readonly onMouseDown?: (e: any) => void
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

        return <div className={"dolfo-breadcrumb" + (props.className ? (" " + props.className) : "") + (props.arrowStyle ? " arrow-style" : "")} style={props.style}>
            {
                options.map((opt, i) => {
                    return <div className="dolfo-breadcrumb-item" key={i}>
                        <Tooltip tooltip={opt.props.onClick && Constants.NAVIGATE_BREADCRUMB}>
                            <div className={"dolfo-breadcrumb-item-inner" + (opt.props.onClick ? " clickable" : "")} onClick={opt.props.onClick} onMouseDown={opt.props.onMouseDown}>
                                {opt.props.children}
                            </div>
                        </Tooltip>
            
                        {!!options[i + 1] && <div className="dolfo-breadcrumb-arrow">
                            <Icon iconKey="chevron-right" type="fal" />    
                        </div>}
                    </div>
                })
            }
        </div>
    }
}

export class BreadCrumbItem extends React.PureComponent<BreadcrumbItemProps>{
    render = (): JSX.Element => <></>
}