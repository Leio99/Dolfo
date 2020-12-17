import React, { CSSProperties } from "react"
import { BreadCrumbItem } from "./BreadCrumbItem"

export interface IProps{
    readonly style?: CSSProperties,
    readonly className?: string
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