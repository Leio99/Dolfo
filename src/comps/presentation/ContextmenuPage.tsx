import React from "react"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Apis } from "./Layouts"
import { Tooltip } from "../layout/Tooltip"
import { ContextMenu } from "../layout/ContextMenu"

export class ContextMenuPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to open a custom menu by clicking on a button.</WhenToUse>

        <ResultCode
            title="Example"
            result={<Tooltip tooltip="Click to open">
                <ContextMenu options={[{
                    label: <span>Option <Icon iconKey="star" type="far" /></span>,
                    onClick: () => alert("AAAAAAAA")
                }, {
                    label: <span>Disabled</span>,
                    disabled: true,
                    onClick: () => {}
                }]}>
                    <Button circleBtn size="small" btnColor="white">
                        <Icon iconKey="ellipsis-v" />
                    </Button>
                </ContextMenu>
            </Tooltip>}
            code={'<ContextMenu options={[{\n\tlabel: <span>Option <Icon iconKey="star" type="far" /></span>,\n\tonClick: () => alert("AAAAAAAA")\n}, {\n\tlabel: \n\t<span>Disabled</span>,\n\tdisabled: true,\n\tonClick: () => {}\n}]}>\n\t<Button circleBtn size="small" btnColor="white">\n\t\t<Icon iconKey="ellipsis-v" />\n\t</Button>\n</ContextMenu>'} />

        <Apis data={[
            {
                name: "options",
                desc: "The options to show.",
                type: "array of options",
                required: true,
                onDoubleClick: () => goToApiBlock("#optionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "closeAfterClickItem",
                desc: "Determines whether the context menu should close after clicking an option.",
                type: "boolean",
                required: false,
                default: "true"
            },
            {
                name: "openWithRightClick",
                desc: "Determines whether the context menu should open when clicking the right button of the mouse.",
                type: "boolean",
                required: false,
                default: "false"
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
    </>
}