import React from "react"
import { TextInput } from "../form/TextInput"
import { goToApiBlock, MenuContentProps } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class TextinputPage extends React.Component<MenuContentProps>{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a text input component inside your form.</WhenToUse>
        <Usage notes="includes password input, email input, number input and textarea." />

        <ResultCode
            title="Simple textinput"
            result={<TextInput />}
            code={'<TextInput />'}
        />

        <ResultCode
            title="Label"
            result={<TextInput label="I am a label" />}
            code={'<TextInput label="I am a label" />'}
        />

        <ResultCode
            title="Max length 10 chars"
            result={<TextInput maxLength={10} />}
            code={'<TextInput maxLength={10} />'}
        />

        <ResultCode
            title="Password"
            result={<TextInput type="password" />}
            code={'<TextInput type="password" />'}
        />

        <ResultCode
            title="Password (toggle visibility)"
            result={<TextInput type="password" togglePassword />}
            code={'<TextInput type="password" togglePassword />'}
        />

        <ResultCode
            title="E-mail"
            result={<TextInput type="email" />}
            code={'<TextInput type="email" />'}
        />

        <ResultCode
            title="Number"
            result={<TextInput type="number" />}
            code={'<TextInput type="number" />'}
        />

        <ResultCode
            title="Min: -5, Max: 5"
            result={<TextInput type="number" min={-5} max={5} />}
            code={'<TextInput type="number" min={-5} max={5} />'}
        />

        <ResultCode
            title="Textarea"
            result={<TextInput type="textarea" />}
            code={'<TextInput type="textarea" />'}
        />

        <ResultCode
            title="Textarea expandable"
            result={<TextInput type="textarea" expandTextarea />}
            code={'<TextInput type="textarea" expandTextarea />'}
        />

        <Apis data={[
            {
                name: "type",
                desc: "The default value for the input (if not passed, shows text input).",
                type: "string (textarea, number, email, password) or null",
                required: false,
                default: "null"
            },
            {
                name: "name",
                desc: "The input name (to allow autocomplete).",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows default icon depending on type)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "value",
                desc: "The default value for the input.",
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
                name: "autoFocus",
                desc: "If true, the input automatically focuses.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show over the input.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the input wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "The style to apply to the input.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the input wrapper.",
                type: "string",
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
                name: "expandTextarea",
                desc: "If type is 'textarea', the input can expand when pressing Enter key.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "rows",
                desc: "If type is 'textarea', determines the max rows the input can expand.",
                type: "number",
                required: false,
                default: "null"
            },
            {
                name: "togglePassword",
                desc: "If type is 'password', shows a button on right to toggle the password visibility.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "minLength",
                desc: "If type is 'password', 'email' or null (text), determines the minimum length of the text.",
                type: "number",
                required: false,
                default: "null (no limit)"
            },
            {
                name: "maxLength",
                desc: "If type is 'password', 'email' or null (text), determines the maximum length of the text.",
                type: "number",
                required: false,
                default: "null (no limit)"
            },
            {
                name: "min",
                desc: "If type is 'number', determines the minimum number in the range.",
                type: "number",
                required: false,
                default: "null (no limit)"
            },
            {
                name: "max",
                desc: "If type is 'number', determines the maximum number in the range.",
                type: "number",
                required: false,
                default: "null (no limit)"
            },
            {
                name: "readonly",
                desc: "Determines whether the input is readonly (not editable) or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "autocomplete",
                desc: "Input text autocomplete.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onChange",
                desc: "Function triggered when input value changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Input value (string)"
            },
            {
                name: "onFocus",
                desc: "Function triggered when input is focused.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onBlur",
                desc: "Function triggered when input is blurred.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onCopy",
                desc: "Function triggered when input's content is copied.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onPaste",
                desc: "Function triggered when pasting content in the input.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyDown",
                desc: "Function triggered on key down.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyUp",
                desc: "Function triggered on key up.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyPress",
                desc: "Function triggered when pressing a key.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            }
        ]} />

        <IconApis {...this.props} />
    </>
}