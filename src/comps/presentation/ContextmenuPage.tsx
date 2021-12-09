import React from "react"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { MenuContext } from "../layout/MenuContext"
import { goToApiBlock } from "../MenuContent"
import { ContextMenuExample } from "./Examples"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class ContextMenuPage extends React.Component{
    openContextMenu = (e: any) => {
        MenuContext.renderMenu(e, [{
            label: "I am the first option",
            onClick: () => alert("AAAAAAAA")
        }, {
            label: <span>Disabled</span>,
            disabled: true,
            onClick: () => {}
        }])
    }

    render = (): JSX.Element => <>
        <WhenToUse>When you want to open a custom menu by clicking on a button.</WhenToUse>
        <Usage notes={<>this component can only be rendered by calling a function (<em>MenuContext.renderMenu(params)</em>)</>} />

        <ResultCode
            title="Example"
            result={<Button circleBtn size="small" tooltip="Click to open" btnColor="white" onClick={this.openContextMenu}>
                <Icon iconKey="ellipsis-v" />
            </Button>}
            code={ContextMenuExample}
        />

        <Apis title="Function properties" data={[
            {
                name: "event",
                desc: "The event that triggered the opening of the menu.",
                type: "Event",
                required: true
            },
            {
                name: "options",
                desc: "The options to show.",
                type: "array of options",
                required: true,
                onDoubleClick: () => goToApiBlock("#optionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "additionalProps",
                desc: "Additional properties.",
                type: "boolean",
                required: false,
                onDoubleClick: () => goToApiBlock("#additionalProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            }
        ]} />

        <Apis title="Option properties" id="optionProps" data={[
            {
                name: "label",
                desc: "The label of the option.",
                type: "string or jSX",
                required: true
            },
            {
                name: "onClick",
                desc: "Function triggered when clicking the option.",
                type: "function",
                required: true,
                default: "circle",
                fnParams: "Event, the HTML of the clicked option."
            },
            {
                name: "disabled",
                desc: "Determines whether the option is.",
                type: "boolean",
                required: false,
                default: "false"
            }
        ]} />

        <Apis title="Additional properties" id="additionalProps" data={[
            {
                name: "closeAfterClickItem",
                desc: "Determines whether the context menu should close after clicking an option.",
                type: "boolean",
                required: false,
                default: "true"
            }
        ]} />
    </>
}