import React, { CSSProperties } from "react"

interface TimelineItemProps extends React.PropsWithChildren{
    /** The position of the timeline item
     * @type "left" | "right"
     * @default "left"
     */
    readonly position?: "left" | "right"
    /** The color of the timeline item icon
     * @type string (CSS color)
     */
    readonly pinColor?: string
    /** Additional className for the timeline item
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the timeline item
     * @type string
     */
    readonly className?: string
}

export class Timeline extends React.Component<React.PropsWithChildren>{
    getOptions = (): TimelineItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    render = (): React.ReactNode => {
        const options = this.getOptions(),
        hideAll = options.every(o => !o.props.position || o.props.position === (options[0].props.position || "left"))

        return <div className="dolfo-timeline">
            {options.map((o, i) => {
                const item = <div className={"dolfo-timeline-item" + (o.props.className ? (" " + o.props.className) : "")} style={o.props.style}>
                    {o.props.children}
                </div>
                
                return <div className={"dolfo-timeline-item-row " + (o.props.position || "left") + (hideAll ? " hide-empty" : "")} key={i}>
                    {
                        o.props.position !== "right" ? item : !hideAll ? <div className="dolfo-timeline-empty"></div> : null
                    }
                    <div className="dolfo-timeline-sign" style={{ color: o.props.pinColor }}></div>
                    {
                        o.props.position === "right" ? item : !hideAll ? <div className="dolfo-timeline-empty"></div> : null
                    }
                </div>
            })}
        </div>
    }
}

export class TimelineItem extends React.Component<TimelineItemProps>{}