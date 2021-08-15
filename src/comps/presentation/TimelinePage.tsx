import React from "react"
import { Timeline, TimelineItem } from "../layout/Timeline"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class TimelinePage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a timeline history.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<Timeline>
                <TimelineItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </TimelineItem>
                <TimelineItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.
                </TimelineItem>
            </Timeline>}
            code={'<Timeline>\n\t<TimelineItem>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</TimelineItem>\n\t<TimelineItem>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.\n\t</TimelineItem>\n</Timeline>'}
        />

        <ResultCode
            title="Positioning"
            result={<Timeline>
                <TimelineItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </TimelineItem>
                <TimelineItem position="right">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.
                </TimelineItem>
                <TimelineItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.
                </TimelineItem>
            </Timeline>}
            code={'<Timeline>\n\t<TimelineItem>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</TimelineItem>\n\t<TimelineItem position="right">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.\n\t</TimelineItem>\n\t<TimelineItem>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.\n\t</TimelineItem>\n</Timeline>'}
        />

        <ResultCode
            title="Pin colors"
            result={<Timeline>
                <TimelineItem pinColor="red">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </TimelineItem>
                <TimelineItem position="right">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.
                </TimelineItem>
                <TimelineItem pinColor="purple">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.
                </TimelineItem>
            </Timeline>}
            code={'<Timeline>\n\t<TimelineItem pinColor="red">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</TimelineItem>\n\t<TimelineItem position="right">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.\n\t</TimelineItem>\n\t<TimelineItem pinColor="purple">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione similique inventore quas, quo amet suscipit quibusdam dolor modi sed ullam quos illum neque vel ad incidunt dolorem laudantium, quidem debitis.\n\t</TimelineItem>\n</Timeline>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single timeline items.",
                type: "TimelineItem",
                required: true,
                onDoubleClick: () => window.location.href = "#timelineItemProps",
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            }
        ]} />

        <Apis id="timelineItemProps" title="Timeline item properties" data={[
            {
                name: "position",
                desc: "The position of the timeline item.",
                type: "string (left, right)",
                required: false,
                default: "left"
            },
            {
                name: "pinColor",
                desc: "Defines the color of the timeline item marker.",
                type: "string (CSS color)",
                required: false,
                default: "blue"
            },
            {
                name: "style",
                desc: "Additional style for the timeline item.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}