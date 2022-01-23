import React, { CSSProperties } from "react"
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
    
    open = () => !this.props.disabled && this.setState({ opened: true })

    getItems = (): DropDownItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    clickItem = (e: any, item: DropDownItem) => {
        if(item.props.disabled) return

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
                        items.map(i => <div className={"dolfo-dropdown-item" + (i.props.disabled ? " disabled" : "") + (i.props.className ? " " + i.props.className : "")} onClick={e => this.clickItem(e, i)} style={i.props.style}>{i.props.children}</div>)
                    }
                </div>
            }
        </ul>
    }
}

export class DropDownItem extends React.Component<DropDownItemProps>{
    render = (): JSX.Element => <></>
}