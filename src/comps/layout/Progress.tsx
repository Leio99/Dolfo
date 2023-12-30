import React, { CSSProperties } from "react"
import { formatNumber } from "../shared/utility"
import { BaseColors } from "./Button"
import { LoadingIcon } from "./Icon"

interface IProps {
    /** The percentage loaded
     * @type number
     * @required
     */
    readonly percent: number
    /** If true, convert thousand separator to '.' and decimal separator to ','
     * @type boolean
     */
    readonly convertCommas?: boolean
    /** Show a circular progress
     * @type boolean
     */
    readonly circular?: boolean
    /** The color of the progress
     * @type BaseColors
     * @default "blue"
     */
    readonly color?: BaseColors
    /** The size of the progress
     * @type "small" | "medium" | "large"
     * @default "small"
     */
    readonly barSize?: "small" | "medium" | "large"
    /** If 'circular' is 'true', defines the size of the circle
     * @type number (in px)
     */
    readonly circleWidth?: number
    /** Defines if the progress is loading
     * @type boolean
     */
    readonly loading?: boolean
    /** Defines a custom text if loading
     * @type ReactNode
     */
    readonly loadingText?: React.ReactNode
    /** Additional className for the progress
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the progress
     * @type string
     */
    readonly className?: string
    /** If 'circular' is 'true' defines a custom text to show inside the circle
     * @type ReactNode
     */
    readonly customCircleText?: React.ReactNode
}

export class Progress extends React.PureComponent<IProps>{
    render = (): React.ReactNode => {
        const { props } = this,
        percent = props.percent < 0 ? 0 : props.percent > 100 ? 100 : props.percent,
        color = props.color || "darkblue",
        width = props.circleWidth >= 0 ? props.circleWidth : 150,
        formattedPercent = props.convertCommas ? formatNumber(percent) : percent

        if(props.circular){
            return <svg viewBox="0 0 36 36" className={"dolfo-circular-progress" + (props.className ? (" " + props.className) : "")} style={{ ...props.style, width, height: width }}>
                <defs>
                    <filter id="inset-shadow">
                        <feFlood floodColor="rgba(0, 0, 0, 0.15)"/>
                        <feComposite operator="out" in2="SourceGraphic"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite operator="atop" in2="SourceGraphic"/>
                    </filter>
                </defs>
            
                <path filter="url(#inset-shadow)" className="dolfo-progress-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                
                <path className={"dolfo-progress-circle line-" + color} strokeDasharray={percent + ", 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                <foreignObject x="0" y="35%" className="dolfo-progress-percentage">
                    {props.loading ? props.loadingText || <LoadingIcon spinning /> : props.customCircleText || (formattedPercent + "%")}
                </foreignObject>
            </svg>
        }

        return <div className={"dolfo-progress-line " + (props.className ? (" " + props.className) : "") + (props.loading ? " progress-loading" : "") + " " + (props.barSize || "small")} style={props.style}>
            <span className="percent-text">
                {props.loading ? (props.loadingText || <LoadingIcon spinning />) : (formattedPercent + "%")}
            </span>
            <div className={"dolfo-progress-inner bar-" + color} style={{ width: percent + "%", animation: props.loading == null ? "expandBar 1s ease forwards" : "none" }}></div>
        </div>
    }
}