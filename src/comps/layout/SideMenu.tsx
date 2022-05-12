import React from "react"
import { Constants } from "../shared/Constants"
import { ButtonColors } from "./Button"

export { SubMenu } from "./SubMenu"
export { MenuItem } from "./MenuItem"

export interface BaseSideMenuProps extends React.PropsWithChildren<unknown>{
    readonly menuColor?: ButtonColors
}

interface IProps extends BaseSideMenuProps{
    readonly opened?: boolean
    readonly onToggle?: () => void
}

interface IState{
    readonly opened: boolean
}

export class SideMenu<P extends IProps = IProps> extends React.PureComponent<P, IState>{
    constructor(props: P){
        super(props)

        this.state = {
            opened: props.opened || false
        }
    }

    componentDidUpdate = (prevProps: P): void => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
                opened: this.props.opened
            })
        }
    }

    toggleMenu = (): void => {
        this.setState({ opened: !this.state.opened })

        this.props.onToggle && this.props.onToggle()
    }

    render = (): JSX.Element => {
        const { props } = this,
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