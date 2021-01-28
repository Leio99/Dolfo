import React, { CSSProperties } from "react"

export interface IProps {
    readonly title: string | JSX.Element
    readonly selected?: boolean
    readonly isDefault?: boolean
    readonly style?: CSSProperties
    readonly disabled?: boolean
}

export class Tab extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-tab-content" + (props.selected ? " current" : "")} style={props.style}>
            {props.children}
        </div>
    }
}
