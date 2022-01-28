import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Icon } from "./Icon"

interface IProps{
    readonly label: string | JSX.Element
    readonly preventCloseOnClick?: boolean
    readonly disabled?: boolean
    readonly className?: string
    readonly style?: CSSProperties
}

interface DropDownItemProps{
    readonly disabled?: boolean
    readonly onClick?: (e: any) => void
    readonly className?: string
    readonly style?: CSSProperties
    readonly static?: boolean
}

interface IState{
    readonly opened: boolean
}

export class DropDown extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: false
        }
    }

    close = () => this.setState({ opened: false })
    
    open = () => {
        if(this.props.disabled)
            return

        this.setState({ opened: true }, () => {
            const node = ReactDOM.findDOMNode(this) as HTMLElement,
            container = node.querySelector(".dropdown-items-container") as HTMLElement,
            items = node.querySelectorAll(".dropdown-items-container .dolfo-dropdown-item")
            let maxWidth = 0

            items.forEach(i => {
                const span = document.createElement("span"),
                label = node.querySelector(".dolfo-dropdown-label"),
                pL = window.getComputedStyle(label, null).getPropertyValue("padding-left"),
                pR = window.getComputedStyle(label, null).getPropertyValue("padding-right")

                span.innerHTML = i.innerHTML
                span.style.position = "fixed"
                span.style.opacity = "0"
                span.style.pointerEvents = "none"
                span.style.paddingLeft = pL
                span.style.paddingRight = pR

                document.body.append(span)

                const width = span.clientWidth

                span.remove()

                if(width > maxWidth)
                    maxWidth = width
            })

            if(node.clientWidth < maxWidth)
                container.style.width = maxWidth + "px"
        })
    }

    getItems = (): DropDownItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    clickItem = (e: any, item: DropDownItem) => {
        if(item.props.disabled || item.props.static) return

        if(item.props.onClick)
            item.props.onClick(e)

        if(!this.props.preventCloseOnClick)
            this.close()
    }

    render = (): JSX.Element => {
        const { props } = this,
        { opened } = this.state,
        items = this.getItems()

        return <ul className={"dolfo-dropdown" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} onMouseEnter={this.open} onMouseLeave={this.close} style={props.style}>
            <li className="dolfo-dropdown-label">
                {props.label} <Icon iconKey="caret-down" className="dropdown-icon" />
            </li>

            {
                opened && <div className="dropdown-items-container">
                    {
                        items.map(i => <div className={"dolfo-dropdown-item" + (i.props.static ? " static" : "") + (i.props.disabled ? " disabled" : "") + (i.props.className ? " " + i.props.className : "")} onClick={e => this.clickItem(e, i)} style={i.props.style}>{i.props.children}</div>)
                    }
                </div>
            }
        </ul>
    }
}

export class DropDownItem extends React.Component<DropDownItemProps>{
    render = (): JSX.Element => <></>
}
