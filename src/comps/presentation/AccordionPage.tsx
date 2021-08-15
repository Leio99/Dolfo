import React from "react"
import { Accordion } from "../layout/Accordion"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class AccordionPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render an accordion component with hidden content.</WhenToUse>
        <Usage />

        <ResultCode
            title="Single file uploader"
            result={<Accordion title="Open me">I am some hidden content</Accordion>}
            code={'<Accordion title="Open me">I am some hidden content</Accordion>'}
        />

        <ResultCode
            title="Default opened"
            result={<Accordion opened title="Open me">I am some hidden content</Accordion>}
            code={'<Accordion opened title="Open me">I am some hidden content</Accordion>'}
        />

        <ResultCode
            title="Disabled"
            result={<Accordion disabled title="Open me">I am some hidden content</Accordion>}
            code={'<Accordion disabled title="Open me">I am some hidden content</Accordion>'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The accordion title.",
                type: "string or JSX",
                required: true
            },
            {
                name: "opened",
                desc: "Determines whether the accordion is opened by default or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "disabled",
                desc: "Determines whether the accordion is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "wrapperStyle",
                desc: "Additional accordion wrapper style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "wrapperClassName",
                desc: "Additional accordion wrapper className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional accordion content style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional accordion content className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}