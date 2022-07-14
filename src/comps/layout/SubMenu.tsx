import React from "react"
import { Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    readonly opened?: boolean
    readonly text: string | JSX.Element
    readonly onClick?:() => void
}

interface IState{
    readonly opened: boolean
}

export class SubMenu extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: props.opened || false
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
                opened: this.props.opened
            })
        }
    }

    toggleSubMenu = (): void => {
        this.setState({ opened: !this.state.opened })

        this.props.onClick && this.props.onClick()
    }

    render = (): JSX.Element => {
        const { props } = this,
        { opened } = this.state

        return <div className={"dolfo-submenu" + (opened ? " opened" : "")}>
            <div className="dolfo-submenu-title" onClick={this.toggleSubMenu}>
                <Icon iconKey="chevron-down" className="dolfo-submenu-arrow" />
                {props.text}
            </div>

            <div className="dolfo-submenu-inner">{props.children}</div>
        </div>
    }
}