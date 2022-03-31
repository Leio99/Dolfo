import React from "react"
import { Option } from "../form/Option"
import Select from "../form/Select"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, OptionApis, IconApis } from "./Layouts"

export class SelectPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a select combobox component inside your form.</WhenToUse>
        <Usage notes="using the up and down arrows, the user can navigate through the options and select them pressing the Enter key." />

        <ResultCode
            title="Simple select"
            result={<Select>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Label"
            result={<Select label="Choose an option">
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select label="Choose an option">\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Selected value"
            result={<Select defaultValue={2}>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select defaultValue={2}>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Disabled"
            result={<Select disabled>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select disabled>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Loading"
            result={<Select loading>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select loading>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Disabled options"
            result={<Select>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
                <Option value={3} label="Third option" disabled />
                <Option value={4} label="Fourth option" disabled />
            </Select>}
            code={'<Select>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n\t<Option value={3} label="Third option" disabled />\n\t<Option value={4} label="Fourth option" disabled />\n</Select>'}
        />

        <ResultCode
            title="Mutliple selection"
            result={<Select multiple>
                <Option value={1} label="First option" />
                <Option value={2} label="Second option" />
            </Select>}
            code={'<Select multiple>\n\t<Option value={1} label="First option" />\n\t<Option value={2} label="Second option" />\n</Select>'}
        />

        <ResultCode
            title="Custom icon"
            result={<Select icon={{ iconKey: "globe" }}>
                <Option value={1} label="English" />
                <Option value={2} label="Italian" />
            </Select>}
            code={'<Select icon={{ iconKey: "globe" }}>\n\t<Option value={1} label="English" />\n\t<Option value={2} label="Italian" />\n</Select>'}
        />

        <ResultCode
            title="Searchable"
            result={<Select canSearch label="Try typing 'John'">
                <Option value={1} label="John Smith" />
                <Option value={2} label="John Snow" />
                <Option value={3} label="Steve Rogers" />
            </Select>}
            code={'<Select canSearch label="Try typing \'John\'">\n\t<Option value={1} label="John Smith" />\n\t<Option value={2} label="John Snow" />\n\t<Option value={3} label="Steve Rogers" />\n</Select>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The options to put inside the Combobox wrapper.",
                type: "Option",
                required: true,
                onDoubleClick: () => goToApiBlock("#optionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "multiple",
                desc: "Determines whether the user can select one or more options.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "canSearch",
                desc: "Determines whether the user can search the options.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows hand pointer icon)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "loading",
                desc: "Determines whether the combobox is loading or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "defaultValue",
                desc: "The default value of the select (must be the same value of one of the options inside or a list of them).",
                type: "any",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the combobox is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "autoFocus",
                desc: "If true, the combobox automatically focuses and opens.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show near the combobox.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the combobox input wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "The style to apply to the combobox.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the combobox wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "required",
                desc: "Determines whether the combobox is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when an option is selected.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Combobox selected value (any or any[] if multiple)"
            }
        ]} />

        <OptionApis />

        <IconApis />
    </>
}