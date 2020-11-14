import React, { CSSProperties } from "react"

export interface IProps{
    readonly selected?: boolean
    readonly imageUrl?: string
    readonly style?: CSSProperties
}
export class Slide extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className="dolfo-slide" style={props.style}>
            {this.props.children}
        </div>
    }
}