import React from "react"

interface IProps extends React.PropsWithChildren{
    readonly onClick?: () => void
    readonly selected?: boolean
}

export class MenuItem extends React.PureComponent<IProps>{
    render = (): React.ReactNode => {
        const { props } = this

        return <div className={"dolfo-menu-voice" + (props.selected ? " selected": "")} onClick={props.onClick}>
            {props.children}
        </div>
    }
}