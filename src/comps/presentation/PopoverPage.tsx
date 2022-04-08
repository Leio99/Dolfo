import React from "react"
import Button from "../layout/Button"
import { Popover } from "../layout/Popover"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class PopoverPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a popover message.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple popover"
            result={<Popover content="Hi there, I am some sample text">
                <Button btnColor="blue">Click me</Button>
            </Popover>}
            code={'<Popover content="Hi there, I am some sample text">\n\t<Button btnColor="blue">Click me</Button>\n</Popover>'}
        />

        <ResultCode
            title="Positioning"
            result={<>
                <Popover content="I am on left" position="left">
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Left</Button>
                </Popover>
                <Popover content="I am on top" position="top">
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Top</Button>
                </Popover>
                <Popover content="I am on bottom" position="bottom">
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Bottom</Button>
                </Popover>
                <Popover content="I am on right" position="right">
                    <Button btnColor="blue">Right</Button>
                </Popover>
            </>}
            code={'<Popover content="I am on left" position="left">\n\t<Button btnColor="blue">Left</Button>\n</Popover>\n\n<Popover content="I am on top" position="top">\n\t<Button btnColor="blue">Top</Button>\n</Popover>\n\n<Popover content="I am on bottom" position="bottom">\n\t<Button btnColor="blue">Bottom</Button>\n</Popover>\n\n<Popover content="I am on right" position="right">\n\t<Button btnColor="blue">Right</Button>\n</Popover>'}
        />

        <ResultCode
            title="Show on hover"
            result={<Popover content="Hi there, I am some sample text" openOnOver>
                <Button btnColor="blue">Hover me</Button>
            </Popover>}
            code={'<Popover content="Hi there, I am some sample text" openOnOver>\n\t<Button btnColor="blue">Click me</Button>\n</Popover>'}
        />

        <ResultCode
            title="Positioning hover"
            result={<>
                <Popover content="I am on left" position="left" openOnOver>
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Left</Button>
                </Popover>
                <Popover content="I am on top" position="top" openOnOver>
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Top</Button>
                </Popover>
                <Popover content="I am on bottom" position="bottom" openOnOver>
                    <Button btnColor="blue" style={{ marginRight: 5 }}>Bottom</Button>
                </Popover>
                <Popover content="I am on right" position="right" openOnOver>
                    <Button btnColor="blue">Right</Button>
                </Popover>
            </>}
            code={'<Popover content="I am on left" position="left" openOnOver>\n\t<Button btnColor="blue">Left</Button>\n</Popover>\n\n<Popover content="I am on top" position="top" openOnOver>\n\t<Button btnColor="blue">Top</Button>\n</Popover>\n\n<Popover content="I am on bottom" position="bottom" openOnOver>\n\t<Button btnColor="blue">Bottom</Button>\n</Popover>\n\n<Popover content="I am on right" position="right" openOnOver>\n\t<Button btnColor="blue">Right</Button>\n</Popover>'}
        />

        <Apis data={[
            {
                name: "content",
                desc: "The popover content.",
                type: "string or JSX",
                required: true
            },
            {
                name: "position",
                desc: "Defines the popover position.",
                type: "string (top, left, right, bottom)",
                required: false,
                default: "left"
            },
            {
                name: "openOnOver",
                desc: "If true, the popover shows when you hover the relative element.",
                type: "boolean",
                required: false,
                default: "false (shows on click)"
            },
            {
                name: "style",
                desc: "Additional popover style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional popover className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}