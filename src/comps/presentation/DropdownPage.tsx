import React from "react"
import { goToApiBlock } from "../MenuContent"
import { DropDown, DropDownItem } from "../layout/DropDown"
import { Apis, ResultCode, Usage, WhenToUse } from "./Layouts"

export class DropdownPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a dropdown menu.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple dropdown"
            result={<DropDown label="Hover me">
                <DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>
                <DropDownItem>Sub item 2</DropDownItem>
                <DropDownItem>Sub item 3</DropDownItem>
            </DropDown>}
            code={'<DropDown label="Hover me">\n\t<DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>\n\t<DropDownItem>Sub item 2</DropDownItem>\n\t<DropDownItem>Sub item 3</DropDownItem>\n</DropDown>'}
        />

        <ResultCode
            title="Static item"
            result={<DropDown label="Hover me">
                <DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>
                <DropDownItem static>Separator</DropDownItem>
                <DropDownItem>Sub item 3</DropDownItem>
            </DropDown>}
            code={'<DropDown label="Hover me">\n\t<DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>\n\t<DropDownItem static>Separator</DropDownItem>\n\t<DropDownItem>Sub item 3</DropDownItem>\n</DropDown>'}
        />

        <ResultCode
            title="Disabled"
            result={<>
                <DropDown label="I am a disabled" disabled>
                    <DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>
                    <DropDownItem>Sub item 2</DropDownItem>
                    <DropDownItem>Sub item 3</DropDownItem>
                </DropDown>
                <DropDown label="Disabled items">
                    <DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>
                    <DropDownItem disabled>I am disabled</DropDownItem>
                    <DropDownItem>Sub item 3</DropDownItem>
                </DropDown>
            </>}
            code={'<DropDown label="I am a disabled" disabled>\n\t<DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>\n\t<DropDownItem>Sub item 2</DropDownItem>\n\t<DropDownItem>Sub item 3</DropDownItem>\n</DropDown>\n\n<DropDown label="Disabled items">\n\t<DropDownItem onClick={() => alert("Clicked item")}>Click me</DropDownItem>\n\t<DropDownItem disabled>I am disabled</DropDownItem>\n\t<DropDownItem>Sub item 3</DropDownItem>\n</DropDown>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The dropdown items.",
                type: "DropDownItem",
                required: true,
                onDoubleClick: () => goToApiBlock("#ddItemProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "label",
                desc: "The label of the dropdown.",
                type: "string or ReactNode",
                required: true
            },
            {
                name: "preventCloseOnClick",
                desc: "The dropdown won't close when clicking an item.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "disabled",
                desc: "Determines whether the dropdown is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "className",
                desc: "Additional className to apply to the dropdown.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional styles to apply to the dropdown.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="ddItemProps" title="DropDownItem properties" data={[
            {
                name: "disabled",
                desc: "Determines whether the item is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "static",
                desc: "Determines whether the item is static (unclickable) or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClick",
                desc: "Function triggered when the user clicks on the item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            },
            {
                name: "className",
                desc: "Additional className to apply to the dropdown item.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional styles to apply to the dropdown item.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}