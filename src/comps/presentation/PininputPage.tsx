import React from "react"
import { PinInput } from "../form/PinInput"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class PininputPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a pin input.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple pin"
            result={<PinInput length={5} />}
            code={'<PinInput length={5} />'}
        />

        <ResultCode
            title="Disabled"
            result={<PinInput disabled length={5} />}
            code={'<PinInput disabled length={5} />'}
        />

        <ResultCode
            title="Default value"
            result={<PinInput value="12345" length={5} />}
            code={'<PinInput value="12345" length={5} />'}
        />

        <ResultCode
            title="Big size"
            result={<PinInput big length={5} />}
            code={'<PinInput big length={5} />'}
        />

        <ResultCode
            title="Label"
            result={<PinInput label="I'm a pin" disabled required length={5} />}
            code={'<PinInput label="I\'m a pin" required length={5} />'}
        />

        <Apis data={[
            {
                name: "length",
                desc: "The length of the pin",
                type: "number",
                required: true
            },
            {
                name: "value",
                desc: "Default value of the input.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "big",
                desc: "Determines whether the input should be bigger or not.",
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