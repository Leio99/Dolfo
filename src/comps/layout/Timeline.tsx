import React, { CSSProperties } from "react"

interface TimelineItemProps{
    readonly position?: "left" | "right"
    readonly style?: CSSProperties
    readonly pinColor?: string
    readonly hideEmptySpace?: boolean
}

export class Timeline extends React.Component{
    getOptions = (): TimelineItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    render = (): JSX.Element => {
        const options = this.getOptions(),
        hideAll = options.every(o => !o.props.position || o.props.position === (options[0].props.position || "left"))

        return <div className="dolfo-timeline">
            {options.map(o => <TimelineItem {...o.props} hideEmptySpace={hideAll} />)}
        </div>
    }
}

export class TimelineItem extends React.Component<TimelineItemProps>{
    render = (): JSX.Element => {
        const { props } = this,
        item = <div className="dolfo-timeline-item" style={props.style}>
            {props.children}
        </div>

        return <div className={"dolfo-timeline-item-row " + (props.position || "left") + (props.hideEmptySpace ? " hide-empty" : "")}>
            {
                props.position !== "right" ? item : !props.hideEmptySpace ? <div className="dolfo-timeline-empty"></div> : null
            }
            <div className="dolfo-timeline-sign" style={{ color: props.pinColor }}></div>
            {
                props.position === "right" ? item : !props.hideEmptySpace ? <div className="dolfo-timeline-empty"></div> : null
            }
        </div>
    }
}