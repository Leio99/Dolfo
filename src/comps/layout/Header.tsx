import React, { CSSProperties } from "react"
import Button, { ButtonColors } from "./Button"
import { BaseIconProps, Icon } from "./Icon"

interface IProps extends React.PropsWithChildren<unknown>{
    readonly title?: string
    readonly menuColor?: ButtonColors
    readonly menuTogglerFn?: () => void
    readonly menuTogglerIcon?: BaseIconProps
    readonly menuTogglerStyle?: CSSProperties
    readonly style?: CSSProperties
    readonly className?: string
}

export class Header extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const { props } = this,
        icon = props.menuTogglerIcon || { type: "far", iconKey: "bars" }

        return <div className={"dolfo-header dolfo-header-" + (props.menuColor || "blue") + (props.className ? (" " + props.className) : "")} style={props.style}>
            {
                props.menuTogglerFn && <Button circleBtn size="big" onClick={this.props.menuTogglerFn} btnColor={props.menuColor || "blue"} className="dolfo-menu-button" style={props.menuTogglerStyle}>
                    <Icon {...icon} />
                </Button>
            }

            {props.title && <h2 className="dolfo-header-title">{props.title}</h2>}

            <div className="clearfix"></div>

            {props.children}
        </div>
    }
}