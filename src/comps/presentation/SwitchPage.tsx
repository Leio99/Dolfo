import React from "react"
import { Switch } from "../form/Switch"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class SwitchPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a switcher component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple switch"
            result={<Switch />}
            code={'<Switch />'}
        />

        <ResultCode
            title="Disabled"
            result={<Switch disabled />}
            code={'<Switch disabled />'}
        />

        <ResultCode
            title="Loading"
            result={<Switch loading />}
            code={'<Switch loading />'}
        />

        <ResultCode
            title="With label"
            result={<Switch label="I am a label" required />}
            code={'<Switch label="I am a label" required />'}
        />

        <Apis data={[
            {
                name: "checked",
                desc: "Determines whether the switcher is activated by default.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "loading",
                desc: "Determines whether the switcher is loading or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "disabled",
                desc: "Determines whether the switcher is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show near the switcher.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the switcher wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "The style to apply to the switcher.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the switcher wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "required",
                desc: "Determines whether the switcher is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the switcher changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Switcher value (boolean)"
            }
        ]} />
    </>
}