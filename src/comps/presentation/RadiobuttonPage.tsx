import React from "react"
import { Option } from "../form/Option"
import { RadioButton } from "../form/RadioButton"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, OptionApis } from "./Layouts"

export class RadiobuttonPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a radio button component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple radio"
            result={<RadioButton controlName="simple" defaultValue={1}>
                <Option label="Option 1" value={1} />
                <Option label="Option 2" value={2} />
            </RadioButton>}
            code={'<RadioButton controlName="simple" defaultValue={1}>\n\t<Option label="Option 1" value={1} />\n\t<Option label="Option 2" value={2} />\n</RadioButton>'}
        />

        <ResultCode
            title="Disabled"
            result={<RadioButton controlName="simple" disabled defaultValue={1}>
                <Option label="Option 1" value={1} />
                <Option label="Option 2" value={2} />
            </RadioButton>}
            code={'<RadioButton controlName="simple" disabled defaultValue={1}>\n\t<Option label="Option 1" value={1} />\n\t<Option label="Option 2" value={2} />\n</RadioButton>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The radio buttons to put inside the RadioButton wrapper.",
                type: "Option",
                required: true,
                onDoubleClick: () => goToApiBlock("#optionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "controlName",
                desc: "The control name to reference the radio buttons.",
                type: "string",
                required: true
            },
            {
                name: "defaultValue",
                desc: "The default value of the radio button (must be the same value of one of the options inside).",
                type: "any",
                required: false
            },
            {
                name: "label",
                desc: "The label of the radio buttons.",
                type: "string or ReactNode",
                default: "null",
                required: false
            },
            {
                name: "style",
                desc: "Additional styles to apply to the radio buttons.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the radio buttons.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the radio buttons are disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "required",
                desc: "Determines whether the radio button is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the radio button changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Selected radio value (any)"
            }
        ]} />

        <OptionApis />
    </>
}