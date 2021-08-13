import React from "react"
import { formatNumber } from "../shared/utility"
import { BaseColors } from "./Button"
import { LoadingIcon } from "./Icon"

interface IProps {
    readonly percent: number
    readonly convertCommas?: boolean
    readonly circular?: boolean
    readonly color?: BaseColors
    readonly barSize?: "small" | "medium" | "large"
    readonly circleWidth?: number | string
    readonly loading?: boolean
    readonly loadingText?: string | JSX.Element
    readonly className?: string
    readonly customCircleText?: string | JSX.Element
}

export class Progress extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const { props } = this,
        percent = props.percent < 0 ? 0 : props.percent > 100 ? 100 : props.percent,
        color = props.color || "darkblue",
        width = props.circleWidth >= 0 ? props.circleWidth : 150,
        formattedPercent = props.convertCommas ? formatNumber(percent) : percent

        if(props.circular){
            return <svg viewBox="0 0 36 36" className={"dolfo-circular-progress" + (props.className ? (" " + props.className) : "")} style={{ width, height: width }}>
                <defs>
                    <filter id="inset-shadow">
                        <feFlood flood-color="rgba(0, 0, 0, 0.15)"/>
                        <feComposite operator="out" in2="SourceGraphic"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite operator="atop" in2="SourceGraphic"/>
                    </filter>
                </defs>
            
                <path filter="url(#inset-shadow)" className="dolfo-progress-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                
                <path className={"dolfo-progress-circle line-" + color} strokeDasharray={percent + ", 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                <text x="18" y="20.35" className="dolfo-progress-percentage">
                    {props.customCircleText || (formattedPercent + "%")}
                </text>
            </svg>
        }

        return <div className={"dolfo-progress-line " + (props.className ? (" " + props.className) : "") + (props.loading ? " progress-loading" : "") + " " + (props.barSize || "small")}>
            <span className="percent-text">
                {props.loading ? (props.loadingText || <LoadingIcon spinning />) : (formattedPercent + "%")}
            </span>
            <div className={"dolfo-progress-inner bar-" + color} style={{ width: percent + "%", animation: props.loading == null ? "expandBar 1s ease forwards" : "none" }}></div>
        </div>
    }
}