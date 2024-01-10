import React from "react"
import { Range } from "../form/Range"
import { Apis, ResultCode, Usage, WhenToUse } from "./Layouts"

export class RangePage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a range input component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple range"
            result={<Range min={0} max={10} steps={1} />}
            code={'<Range min={0} max={10} steps={1} />'}
        />

        <ResultCode
            title="Label"
            result={<Range required label="Sound" min={0} max={10} steps={1} />}
            code={'<Range required label="Sound" min={0} max={10} steps={1} />'}
        />

        <ResultCode
            title="Disabled"
            result={<Range disabled label="Sound" min={0} max={10} steps={1} />}
            code={'<Range disabled label="Sound" min={0} max={10} steps={1} />'}
        />

        <ResultCode
            title="Show steps"
            result={<Range showSteps label="Sound" min={0} max={10} steps={1} />}
            code={'<Range showSteps label="Sound" min={0} max={10} steps={1} />'}
        />

        <Apis data={[
            {
                name: "min",
                desc: "The minimum value to be selected.",
                type: "number",
                required: true
            },
            {
                name: "max",
                desc: "The maximum value to be selected.",
                type: "number",
                required: true
            },
            {
                name: "steps",
                desc: "The number of steps to be executed when sliding the controller.",
                type: "number",
                required: true
            },
            {
                name: "showSteps",
                desc: "If true, it shows all the steps under the control.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "changeAfterRelease",
                desc: "If true, the change event will be fired only when the user releases the control slider.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional input style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional input className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the input is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label of the input.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "required",
                desc: "Determines whether the input is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the input changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Full pin"
            }
        ]} />
    </>
}