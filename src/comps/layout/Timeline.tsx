import React, { CSSProperties } from "react"

interface TimelineItemProps{
    readonly position?: "left" | "right"
    readonly style?: CSSProperties
    readonly pinColor?: string
}

export class Timeline extends React.Component{
    getOptions = (): TimelineItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    render = (): JSX.Element => {
        const options = this.getOptions()

        return <div className="dolfo-timeline">
            {options}
        </div>
    }
}

export class TimelineItem extends React.Component<TimelineItemProps>{
    render = (): JSX.Element => {
        const { props } = this,
        item = <div className="dolfo-timeline-item" style={props.style}>
            {props.children}
        </div>

        return <div className={"dolfo-timeline-item-row " + (props.position || "left")}>
            {
                props.position !== "right" ? item : <div className="dolfo-timeline-empty"></div>
            }
            <div className="dolfo-timeline-sign" style={{ color: props.pinColor }}></div>
            {
                props.position === "right" ? item : <div className="dolfo-timeline-empty"></div>
            }
        </div>
    }
}