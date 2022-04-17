import React from "react"
import { Icon } from "../layout/Icon"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class IconPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a simple icon.</WhenToUse>
        <Usage notes={<>the Icon component exports some default icons (i.e.: <em>CheckIcon, DeleteIcon, EditIcon, ...</em>), check them out!</>} />

        <ResultCode
            title="Simple icon"
            result={<Icon iconKey="globe" />}
            code={'<Icon iconKey="globe" />'}
        />

        <ResultCode
            title="Colored"
            result={<Icon color="red" iconKey="globe" />}
            code={'<Icon color="red" iconKey="globe" />'}
        />

        <ResultCode
            title="Large"
            result={<Icon large iconKey="globe" />}
            code={'<Icon large iconKey="globe" />'}
        />

        <ResultCode
            title="Spinning"
            result={<Icon spinning iconKey="spinner-third" />}
            code={'<Icon spinning iconKey="spinner-third" />'}
        />

        <Apis data={[
            {
                name: "iconKey",
                desc: "The key of the icon.",
                type: "string (FontAwesome icon key)",
                required: true
            },
            {
                name: "type",
                desc: "The type of the FontAwesome icon.",
                type: "string (fa, far, fal, fad, fas, fab)",
                default: "fa",
                required: false
            },
            {
                name: "spinning",
                desc: "Adds a spinning animation.",
                type: "boolean",
                default: "false",
                required: false
            },
            {
                name: "large",
                desc: "Adds the FontAwesome 'fa-lg' class, to increase the icon font size.",
                type: "boolean",
                default: "false",
                required: false
            },
            {
                name: "notFW",
                desc: "Removes the FontAwesome 'fa-fw' class. The icon won't have a fixed size anymore",
                type: "boolean",
                default: "false",
                required: false
            },
            {
                name: "color",
                desc: "Defines icon color.",
                type: "string (CSS color)",
                default: "null (inherited from parent)",
                required: false
            },
            {
                name: "style",
                desc: "Additional icon style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional icon className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onClick",
                desc: "Function triggered when clicking the icon.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            }
        ]} addTooltip />
    </>
}