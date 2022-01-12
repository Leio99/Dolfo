import React from "react"
import { SelectableCardList, SelectableCard } from "../form/SelectableCardList"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class SelectablelistPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a selectable list component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple list"
            result={<SelectableCardList>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="Option 2" />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="Option 2" />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <ResultCode
            title="Disabled"
            result={<SelectableCardList disabled>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="Option 2" />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList disabled>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="Option 2" />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <ResultCode
            title="Disabled option"
            result={<SelectableCardList>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="I'm disabled" disabled />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="I\'m disabled" disabled />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <ResultCode
            title="Label"
            result={<SelectableCardList label="I'm a list" required>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="I'm disabled" />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList label="I\'m a list" required>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="I\'m disabled" disabled />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <ResultCode
            title="Multiple selection"
            result={<SelectableCardList multiple>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="I'm disabled" />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList multiple>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="I\'m disabled" disabled />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <ResultCode
            title="Show checkboxes"
            result={<SelectableCardList showCheckbox>
                <SelectableCard value="opt1" title="Option 1" desc="Click me" />
                <SelectableCard value="opt2" title="I'm disabled" />
                <SelectableCard value="opt3" title="Option 3" />
            </SelectableCardList>}
            code={'<SelectableCardList showCheckbox>\n\t<SelectableCard value="opt1" title="Option 1" desc="Click me" />\n\t<SelectableCard value="opt2" title="I\'m disabled" disabled />\n\t<SelectableCard value="opt3" title="Option 3" />\n</SelectableCardList>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The list elements.",
                type: "SelectableCard",
                required: true,
                onDoubleClick: () => goToApiBlock("#cardProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "showCheckbox",
                desc: "Determines whether to show the checkbox near the title or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label of the list.",
                type: "string or JSX",
                default: "null",
                required: false
            },
            {
                name: "multiple",
                desc: "Determines whether the list selection is multiple or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "defaultValue",
                desc: "The default value of the list (must be the same value of one of the options inside or a list of them).",
                type: "any",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional styles to apply to the list wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the list wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the list is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "required",
                desc: "Determines whether the list is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the list changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Selected list value(s) (any)"
            }
        ]} />

        <Apis id="cardProps" title="Card element properties" data={[
            {
                name: "value",
                desc: "The value of the card.",
                type: "any",
                required: true
            },
            {
                name: "title",
                desc: "The title of the card.",
                type: "string or JSX",
                required: true
            },
            {
                name: "desc",
                desc: "The description of the card.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the card is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional styles to apply to the card.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional card className.",
                type: "string or JSX",
                required: false,
                default: "null"
            }
        ]} />
    </>
}