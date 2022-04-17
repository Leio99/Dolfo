import React from "react"
import { CheckBox } from "../form/CheckBox"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class CheckboxPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a checkbox component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple checkbox"
            result={<CheckBox checked />}
            code={'<CheckBox checked />'}
        />

        <ResultCode
            title="With label"
            result={<CheckBox label="Click to agree" checked />}
            code={'<CheckBox label="Click to agree" checked />'}
        />

        <ResultCode
            title="With tooltip"
            result={<CheckBox label="Click to agree" checked />}
            code={'<CheckBox label="Click to agree" checked />'}
        />

        <ResultCode
            title="Disabled"
            result={<CheckBox label="I am disabled" disabled checked />}
            code={'<CheckBox label="I am disabled" disabled checked />'}
        />

        <ResultCode
            title="Required"
            result={<CheckBox label="I am required" required checked />}
            code={'<CheckBox label="I am required" required checked />'}
        />

        <Apis data={[
            {
                name: "checked",
                desc: "Determines whether the checkbox is checked or not by default.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show near the checkbox.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional styles to apply to the checkbox.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the checkbox.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the checkbox is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "required",
                desc: "Determines whether the checkbox is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the checkbox changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Checkbox value (boolean)"
            }
        ]} addTooltip />
    </>
}