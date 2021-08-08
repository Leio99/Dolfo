import React from "react"
import { Constants } from "../shared/Constants"
import { ButtonColors } from "./Button"

export { SubMenu } from "./SubMenu"
export { MenuItem } from "./MenuItem"

interface IProps{
    readonly opened?: boolean
    readonly onToggle?: () => void
    readonly menuColor?: ButtonColors
}

interface IState{
    readonly opened: boolean
}

export class SideMenu extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: props.opened || false
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
                opened: this.props.opened
            })
        }
    }

    toggleMenu = () => {
        this.setState({ opened: !this.state.opened })

        this.props.onToggle && this.props.onToggle()
    }

    render = (): JSX.Element => {
        const props = this.props,
        { opened } = this.state

        return <div className={"dolfo-side-menu dolfo-side-menu-"+ (props.menuColor || "blue") + (opened ? " opened": "")}>
            <div className="dolfo-menu-overlay" onClick={this.toggleMenu}></div>
            {props.children}

            <div className="dolfo-side-menu-close">
                <span onClick={this.toggleMenu}>{Constants.CLOSE_TEXT}</span>
            </div>
        </div>
    }
}