import React, { CSSProperties } from "react"
import { BaseIconProps, LoadingIcon } from "./Icon";

export interface IProps{
    readonly title?: string
    readonly icon?: BaseIconProps
    readonly style?: CSSProperties
    readonly loading?: boolean
}

export class Step extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props

        return <div className={"dolfo-step-content" + (props.loading ? " loading" : "")} style={props.style}>
            {props.loading && <div className="dolfo-step-loading">
                <LoadingIcon spinning style={{ fontSize: 50 }} />    
            </div>}

            {props.children}
        </div>
    }
}