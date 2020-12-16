import React, { CSSProperties } from "react"

export interface IProps{
    readonly className?: string
    readonly style?: CSSProperties
}
export class CardActions extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className="dolfo-card-actions-inner">
            <br />
            <div className={"dolfo-card-actions" + (props.className ? (" " + props.className) : "")} style={props.style}>
                {props.children}
            </div>
        </div>
    }
}