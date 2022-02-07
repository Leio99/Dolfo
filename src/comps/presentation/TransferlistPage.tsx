import React from "react"
import { TransferList } from "../form/TransferList"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class TransferlistPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a transfer list component inside your form.</WhenToUse>
        <Usage notes="The user can double click an item to transfer it." />

        <ResultCode
            title="Simple transfer"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} getLabel={v => v.label} getKey={v => v.id} />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} getLabel={v => v.label} getKey={v => v.id} />'}
        />

        <ResultCode
            title="Disabled"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} disabled getLabel={v => v.label} getKey={v => v.id} />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} disabled getLabel={v => v.label} getKey={v => v.id} />'}
        />

        <ResultCode
            title="Default selected"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} getLabel={v => v.label} getKey={v => v.id} defaultValue={[{ id: 3, label: "Option 3" }]} />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} getLabel={v => v.label} getKey={v => v.id} defaultValue={[{ id: 3, label: "Option 3" }]} />'}
        />

        <ResultCode
            title="Filtrable"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} getLabel={v => v.label} getKey={v => v.id} canFilter />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} getLabel={v => v.label} getKey={v => v.id} canFilter />'}
        />

        <ResultCode
            title="Transfer all"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} getLabel={v => v.label} getKey={v => v.id} allowTransferAll />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} getLabel={v => v.label} getKey={v => v.id} allowTransferAll />'}
        />

        <ResultCode
            title="Titles"
            result={<TransferList list={[
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" }
            ]} getLabel={v => v.label} getKey={v => v.id} leftListTitle="Options" rightListTitle="Selected" />}
            code={'<TransferList list={[\n\t{ id: 1, label: "Option 1" },\n\t{ id: 2, label: "Option 2" },\n\t{ id: 3, label: "Option 3" }\n]} getLabel={v => v.label} getKey={v => v.id} leftListTitle="Options" rightListTitle="Selected" />'}
        />

        <Apis data={[
            {
                name: "list",
                desc: "The data source of the lists.",
                type: "Array",
                required: true
            },
            {
                name: "getLabel",
                desc: "Function to define the label to show for each item.",
                type: "function",
                required: true,
                fnParams: "Item of the list"
            },
            {
                name: "getKey",
                desc: "Function to define the primary key of the items.",
                type: "function",
                required: true,
                fnParams: "Item of the list"
            },
            {
                name: "canFilter",
                desc: "Determines whether the lists are filtrable or not.",
                type: "boolean",
                default: "false",
                required: false
            },
            {
                name: "leftListTitle",
                desc: "The title of the source list.",
                type: "string",
                default: "null",
                required: false
            },
            {
                name: "rightListTitle",
                desc: "The title of the selected items list.",
                type: "string",
                default: "null",
                required: false
            },
            {
                name: "label",
                desc: "The label of the transfer input.",
                type: "string or JSX",
                default: "null",
                required: false
            },
            {
                name: "allowTransferAll",
                desc: "Determines whether the user can transfer all the items at once, from one list to the other.",
                type: "boolean",
                default: "false",
                required: false
            },
            {
                name: "defaultValue",
                desc: "The default value of the list (must be a list of items).",
                type: "Array",
                default: "null",
                required: false
            },
            {
                name: "style",
                desc: "Additional styles to apply to the transfer list.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the transfer list.",
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
                fnParams: "List of selected items (Array)"
            }
        ]} />
    </>
}