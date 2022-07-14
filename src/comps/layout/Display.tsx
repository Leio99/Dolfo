import React, { CSSProperties } from "react"
import { BaseColors } from "./Button"

interface IProps extends React.PropsWithChildren{
    readonly color?: BaseColors
    readonly title?: string | JSX.Element
    readonly style?: CSSProperties
    readonly className?: string
}

export class Display extends React.Component<IProps>{
    render = () => {
        const { props } = this

        return <div className={"dolfo-display color-" + (props.color || "blue") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.title && <h3 className="dolfo-display-title">
                {props.title}    
            </h3>}

            <div className="dolfo-display-content">
                {props.children}
            </div>
        </div>
    }
}