import React from "react"
import { Icon } from "./Icon"

interface IProps{
    readonly label: string | JSX.Element
    readonly preventCloseOnClick?: boolean
    readonly disabled?: boolean
}

interface DropDownItemProps{
    readonly disabled?: boolean
    readonly onClick?: (e: any) => void
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

    close = (): void => this.setState({ opened: false })
    
    open = (): void => !this.props.disabled && this.setState({ opened: true })

    getItems = (): DropDownItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    clickItem = (e: any, item: DropDownItem): void => {
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

        return <ul className={"dolfo-dropdown" + (props.disabled ? " disabled" : "")} onMouseEnter={this.open} onMouseLeave={this.close}>
            <li className="dolfo-dropdown-label">
                {props.label} <Icon iconKey="caret-down" className="dropdown-icon" />
            </li>

            {
                opened && <div className="dropdown-items-container">
                    {
                        items.map(i => <div className={"dolfo-dropdown-item" + (i.props.disabled ? " disabled" : "")} onClick={e => this.clickItem(e, i)}>{i.props.children}</div>)
                    }
                </div>
            }
        </ul>
    }
}

export class DropDownItem extends React.Component<DropDownItemProps>{
    render = (): JSX.Element => <></>
}