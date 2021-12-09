import React from "react"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { MenuContext } from "../layout/MenuContext"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class ContextMenuPage extends React.Component{
    openContextMenu = (e: any) => {
        MenuContext.renderMenu(e, this.getMenu())
    }

    getMenu = () => {
        return [{
            label: "I am the first option",
            onClick: () => alert("AAAAAAAA")
        }, {
            label: <span>Disabled</span>,
            disabled: true,
            onClick: () => {}
        }]
    }

    render = (): JSX.Element => <>
        <WhenToUse>When you want to open a custom menu by clicking on a button.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<Button circleBtn size="small" tooltip="Click to open" btnColor="white" onClick={this.openContextMenu}>
                <Icon iconKey="ellipsis-v" />
            </Button>}
            code={'<Card>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The title of the card.",
                type: "string or JSX",
                required: false,
                default: "null (title not shown)"
            },
            {
                name: "style",
                desc: "Additional card style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional card className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "Card actions children",
                desc: "Actions placed at the bottom of the card.",
                type: "string",
                required: false,
                default: "null (no actions)",
                onDoubleClick: () => goToApiBlock("#cardActionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            }
        ]} />
    </>
}