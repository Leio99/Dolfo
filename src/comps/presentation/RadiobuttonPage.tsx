import React from "react"
import { Option } from "../form/Option"
import { RadioButton } from "../form/RadioButton"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class RadiobuttonPage extends React.Component{
    render = (): JSX.Element => <>
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
                required: true
            },
            {
                name: "controlName",
                desc: "The control name to reference the radio buttons.",
                type: "string",
                required: true
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

        <Apis title="Option properties" data={[
            {
                name: "value",
                desc: "The value of the option.",
                type: "any",
                required: true
            },
            {
                name: "label",
                desc: "The label of the option.",
                type: "string",
                required: true
            }
        ]} />
    </>
}