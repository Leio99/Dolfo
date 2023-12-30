import React from "react"
import { Autocomplete } from "../form/Autocomplete"
import { AutocompleteExample } from "./Examples"
import { WhenToUse, Usage, ResultCode, Apis, IconApis } from "./Layouts"
import { MenuContentProps, goToApiBlock } from "../MenuContent"

interface DemoElement{
    readonly id: string
    readonly name: string
}

class AutocompleteDemo extends Autocomplete<DemoElement, string>{
    getSource = (filter: string) => new Promise<DemoElement[]>(resolve => setTimeout(() => {
        const elements = [
            { id: "1", name: "First element" },
            { id: "2", name: "Joe Pesci" },
            { id: "3", name: "Carl Johnson" }
        ]

        resolve(elements.filter(e => e.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0))
    }, 1000))

    getDescription = (item: DemoElement) => item.name

    getKey = (item: DemoElement) => item.id
    
    getSingle: (key: DemoElement) => DemoElement | Promise<DemoElement>
}

export class AutocompletePage extends React.Component<MenuContentProps>{
    render = () => <>
        <WhenToUse>When you want to render a searchable input with async data source.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<AutocompleteDemo />}
            code={AutocompleteExample}
        />

        <p className="notes">Note: to render a autocomplete, you must create a component extending the <em>Autocomplete</em> class and implement the abstract methods inherited. See the code example for more.</p>
        <p className="notes">You can implement the <em>getSingle</em> method to retrieve additional information about the selected element.</p>

        <Apis data={[
            {
                name: "defaultValue",
                desc: "The default value for the autocomplete.",
                required: false,
                type: "The type of an element of the autocomplete data source.",
                default: "null"
            },
            {
                name: "selectOptionIfOnlyOne",
                type: "boolean",
                default: "false",
                desc: "If there is only one option loaded, the autocomplete will select it automatically.",
                required: false
            },
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows default icon)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the input wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "autoFocus",
                desc: "If true, the input automatically focuses.",
                type: "boolean",
                required: false,
                default: "false"
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
                desc: "The label to show over the input.",
                type: "string or ReactNode",
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
                name: "onChange",
                desc: "Function triggered when input value changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Selected item having the type of an element of the autocomplete data source."
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