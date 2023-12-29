import React from "react"
import Button from "../layout/Button"
import { Tooltip } from "../layout/Tooltip"
import { ResultCode, WhenToUse, Apis } from "./Layouts"

export class TooltipPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to add some information tooltip.</WhenToUse>

        <ResultCode
            title="Simple tooltip"
            result={<Tooltip tooltip="Hi there!">
                <Button size="small" btnColor="blue">Hover me</Button>
            </Tooltip>}
            code={'<Tooltip tooltip="Hi there!">\n\t<Button tooltip="Hi there!" size="small" btnColor="blue">Hover me</Button>\n</Tooltip>'}
        />

        <ResultCode
            title="Positioning"
            result={<>
                <Tooltip tooltip="I am on top!">
                    <Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Top</Button>
                </Tooltip>
                <Tooltip tooltip="I am on right!" placeTooltip="right">
                    <Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Right</Button>
                </Tooltip>
                <Tooltip tooltip="I am on left!" placeTooltip="left">
                    <Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Left</Button>
                </Tooltip>
                <Tooltip tooltip="I am on bottom!" placeTooltip="bottom">
                    <Button size="small" btnColor="blue">Bottom</Button>
                </Tooltip>
            </>}
            code={'<Tooltip tooltip="I am on top!">\n\t<Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Top</Button>\n</Tooltip>\n\n<Tooltip tooltip="I am on right!" placeTooltip="right">\n\t<Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Right</Button>\n</Tooltip>\n\n<Tooltip tooltip="I am on left!" placeTooltip="left">\n\t<Button size="small" btnColor="blue" style={{ marginRight: 5 }}>Left</Button>\n</Tooltip>\n\n<Tooltip tooltip="I am on bottom!" placeTooltip="bottom">\n\t<Button size="small" btnColor="blue">Bottom</Button>\n</Tooltip>'}
        />

        <Apis data={[
            {
                name: "tooltip",
                desc: "The content of the tooltip.",
                type: "string or ReactNode",
                required: true
            },
            {
                name: "placeTooltip",
                desc: "Determines the position of the tooltip. The tooltip automatically re-positions itself if it goes outside the screen.",
                type: "string (top, left, right, bottom)",
                required: false,
                default: "top"
            }
        ]} />
    </>
}