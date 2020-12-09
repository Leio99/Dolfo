import React from "react"
import { LoadingIcon } from "./Icon"

export interface IProps {
    readonly percent: number
    readonly circular?: boolean
    readonly color?: "red" | "orange" | "black" | "blue" | "green" | "grey" | "darkblue"
    readonly circleWidth?: number | string
    readonly loading?: boolean
    readonly loadingText?: string | JSX.Element
    readonly className?: string
}

export class Progress extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const props = this.props,
        percent = props.percent < 0 ? 0 : props.percent > 100 ? 100 : props.percent,
        color = props.color || "darkblue",
        width = props.circleWidth >= 0 ? props.circleWidth : 150

        if(props.circular){
            return <svg viewBox="0 0 36 36" className={"dolfo-circular-progress" + (props.className ? (" " + props.className) : "")} style={{ width }}>
                <path className="dolfo-progress-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                <path className={"dolfo-progress-circle line-" + color} strokeDasharray={percent + ", 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                <text x="18" y="20.35" className="dolfo-progress-percentage">
                    {percent}%
                </text>
            </svg>
        }

        return <div className={"dolfo-progress-line " + (props.className ? (" " + props.className) : "") + (props.loading ? " progress-loading" : "")}>
            <span className="percent-text">
                {props.loading ? (props.loadingText || <LoadingIcon spinning />) : (props.percent + "%")}
            </span>
            <div className={"dolfo-progress-inner bar-" + color} style={{ width: percent + "%", animation: props.loading === undefined ? "expandBar 1s ease forwards" : "none" }}></div>
        </div>
    }
}