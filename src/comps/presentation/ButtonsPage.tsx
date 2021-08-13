import React from "react"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class ButtonsPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a button.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple button"
            result={<Button btnColor="white">You can click me</Button>}
            code={'<Button btnColor="white">You can click me</Button>'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Button btnColor="white" style={{ marginRight: 5 }}>White</Button>
                <Button btnColor="black" style={{ marginRight: 5 }}>Black</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }}>Blue</Button>
                <Button btnColor="darkblue" style={{ marginRight: 5 }}>Dark blue</Button>
                <Button btnColor="green" style={{ marginRight: 5 }}>Green</Button>
                <Button btnColor="grey" style={{ marginRight: 5 }}>Grey</Button>
                <Button btnColor="orange" style={{ marginRight: 5 }}>Orange</Button>
                <Button btnColor="red">Red</Button>
            </>}
            code={'<Button btnColor="white">White</Button>\n<Button btnColor="black">Black</Button>\n<Button btnColor="blue">Blue</Button>\n<Button btnColor="darkblue">Dark blue</Button>\n<Button btnColor="green">Green</Button>\n<Button btnColor="grey">Grey</Button>\n<Button btnColor="orange">Orange</Button>\n<Button btnColor="red">Red</Button>'}
        />

        <ResultCode
            title="Sizes"
            result={<>
                <Button btnColor="blue" style={{ marginRight: 5 }} size="small">Small</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }}>Normal</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }} size="big">Big</Button>
                <Button btnColor="blue" style={{ marginTop: 5 }} size="full">Full size</Button>
            </>}
            code={'<Button btnColor="blue"size="small">Small</Button>\n<Button btnColor="blue">Normal</Button>\n<Button btnColor="blue" size="big">Big</Button>\n<Button btnColor="blue" size="full">Full size</Button>'}
        />

        <ResultCode
            title="Alternatives"
            result={<>
                <Button btnColor="blue" style={{ marginRight: 5 }} type="text">Text button</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }} circleBtn tooltip="I am a circle">
                    <Icon iconKey="globe" />
                </Button>
                <Button btnColor="blue" style={{ marginRight: 5 }} disabled>Disabled button</Button>
                <Button btnColor="blue" loading>Loading button</Button>
            </>}
            code={'<Button btnColor="blue" type="text">Text button</Button>\n<Button btnColor="blue" circleBtn tooltip="I am a circle">\n\t<Icon iconKey="globe" />\n</Button>\n<Button btnColor="blue" disabled>Disabled button</Button>\n<Button btnColor="blue" loading>Loading button</Button>'}
        />

        <ResultCode
            title="Pop-up button"
            result={<>
                <Button btnColor="blue" style={{ marginRight: 5 }} type="popup" options={[
                    { text: "I am the first", onClick: () => alert("You clicked the first option!") },
                    { text: <span>
                        <Icon iconKey="magic" /> Magic
                    </span>, onClick: () => alert("You clicked the second option!") },
                ]}>Click to open me</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }} type="popup" popupPosition="top" options={[
                    { text: "I am the first", onClick: () => alert("You clicked the first option!") },
                    { text: <span>
                        <Icon iconKey="magic" /> Magic
                    </span>, onClick: () => alert("You clicked the second option!") },
                ]}>Options appear above</Button>
                <Button btnColor="blue" style={{ marginRight: 5 }} type="popup" iconPopup options={[
                    { text: "I am the first", onClick: () => alert("You clicked the first option!") },
                    { text: <span>
                        <Icon iconKey="magic" /> Magic
                    </span>, onClick: () => alert("You clicked the second option!") },
                ]} tooltip="I am an icon popup">
                    <Icon iconKey="magic" />
                </Button>
            </>}
            code={'<Button btnColor="blue" type="popup" options={[\n\t{ text: "I am the first", onClick: () => alert("You clicked the first option!") },\n\t{ text: <span>\n\t\t<Icon iconKey="magic" /> Magic\n\t</span>, onClick: () => alert("You clicked the second option!") }\n]}>Click to open me</Button>\n\n<Button btnColor="blue" type="popup" popupPosition="top" options={[\n\t{ text: "I am the first", onClick: () => alert("You clicked the first option!") },\n\t{ text: <span>\n\t\t<Icon iconKey="magic" /> Magic\n\t</span>, onClick: () => alert("You clicked the second option!") }\n]}>Options appear above</Button>\n\n<Button btnColor="blue" style={{ marginRight: 5 }} type="popup" iconPopup options={[\n\t{ text: "I am the first", onClick: () => alert("You clicked the first option!") },\n\t{ text: <span>\n\t\t<Icon iconKey="magic" /> Magic\n\t</span>, onClick: () => alert("You clicked the second option!") }\n]} tooltip="I am an icon popup">\n\t<Icon iconKey="magic" />\n</Button>'}
        />

        <Apis data={[
            {
                name: "btnColor",
                desc: "Defines button color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white)",
                required: false,
                default: "null (no color)"
            },
            {
                name: "type",
                desc: "Defines button type.",
                type: "string (button, submit, popup, text)",
                required: false,
                default: "button"
            },
            {
                name: "size",
                desc: "Defines button size.",
                type: "string (full, small, big)",
                required: false,
                default: "null (default size)"
            },
            {
                name: "disabled",
                desc: "Defines whether the button is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "loading",
                desc: "Defines whether the button is loading or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "circleBtn",
                desc: "Defines whether the button is rendered as a circle.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "options",
                desc: "If type is 'popup', defines the button options (required if type 'popup').",
                type: "Button option",
                required: false,
                default: "false",
                onDoubleClick: () => window.location.href = "#btnOptionProps",
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "popupPosition",
                desc: "If type is 'popup', defines the direction of the popup.",
                type: "string (top, bottom)",
                required: false,
                default: "bottom"
            },
            {
                name: "iconPopup",
                desc: "If type is 'popup', shows a small button with free-position popup.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional button style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional button className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onClick",
                desc: "Function triggered when the clicking the button (not triggered if popup button; see options).",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} addTooltip />

        <Apis id="btnOptionProps" title="Popup button option props" data={[
            {
                name: "text",
                desc: "The text of the option.",
                type: "string or JSX",
                required: true
            },
            {
                name: "disabled",
                desc: "Defines whether the option is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClick",
                desc: "Function triggered when the clicking an option.",
                type: "function",
                required: true,
                fnParams: "None"
            }
        ]} />
    </>
}