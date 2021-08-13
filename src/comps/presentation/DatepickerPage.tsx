import React from "react"
import DatePicker from "../form/DatePicker"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class DatepickerPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a date picker inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple datepicker"
            result={<DatePicker />}
            code={'<DatePicker />'}
        />

        <ResultCode
            title="With label"
            result={<DatePicker label="I'm a label" />}
            code={'<DatePicker label="I\'m a label" />'}
        />

        <ResultCode
            title="With default date"
            result={<DatePicker defaultValue={new Date(1999, 3, 17)} />}
            code={'<DatePicker defaultValue={new Date(1999, 3, 17)} />'}
        />

        <ResultCode
            title="Different formats"
            result={<>
                <DatePicker defaultValue={new Date()} dateFormat="d-m-YYYY" label="Day-Month-Year (without 0)" />
                <DatePicker defaultValue={new Date()} dateFormat="mm-dd-YYYY" label="Month-Day-Year (with 0)" />
                <DatePicker defaultValue={new Date()} dateFormat="m-d-YYYY" label="Month-Day-Year (without 0)" />
                <DatePicker defaultValue={new Date()} dateFormat="YYYY-mm-dd" label="Year-Month-Day (with 0)" />
                <DatePicker defaultValue={new Date()} dateFormat="YYYY-m-d" label="Year-Month-Day (without 0)" />
            </>}
            code={'<DatePicker defaultValue={new Date()} dateFormat="d-m-YYYY" label="Day-Month-Year (without 0)" />\n<DatePicker defaultValue={new Date()} dateFormat="mm-dd-YYYY" label="Month-Day-Year (with 0)" />\n<DatePicker defaultValue={new Date()} dateFormat="m-d-YYYY" label="Month-Day-Year (without 0)" />\n<DatePicker defaultValue={new Date()} dateFormat="YYYY-mm-dd" label="Year-Month-Day (with 0)" />\n<DatePicker defaultValue={new Date()} dateFormat="YYYY-m-d" label="Year-Month-Day (without 0)" />'}
        />

        <ResultCode
            title="Select date and time"
            result={<DatePicker selectTime />}
            code={'<DatePicker selectTime />'}
        />

        <ResultCode
            title="Show picker on top"
            result={<DatePicker showOnTop />}
            code={'<DatePicker showOnTop />'}
        />

        <ResultCode
            title="Disabled"
            result={<DatePicker label="I am disabled" disabled />}
            code={'<DatePicker label="I am disabled" disabled />'}
        />

        <ResultCode
            title="Custom icon"
            result={<DatePicker icon={{ iconKey: "mouse-pointer" }} />}
            code={'<DatePicker icon={{ iconKey: "mouse-pointer" }} />'}
        />

        <Apis data={[
            {
                name: "defaultValue",
                desc: "Default date to select.",
                type: "Date",
                required: false,
                default: "null"
            },
            {
                name: "label",
                desc: "The label to show over the input.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "wrapperStyle",
                desc: "Additional styles to apply to the input wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows calendar icon)",
                onDoubleClick: () => window.location.href = "#iconProps",
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "className",
                desc: "Additional className to apply to the datepicker.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the datepicker is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "required",
                desc: "Determines whether the datepicker is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "dateFormat",
                desc: "Determines the format of the date.",
                type: "string: dd-mm-YYYY, d-m-YYYY, mm-dd-YYYY, m-d-YYYY, YYYY-mm-dd, YYYY-m-d",
                required: false,
                default: "dd-mm-YYYY"
            },
            {
                name: "autoFocus",
                desc: "If true, the datepicker automatically focuses and opens.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "selectTime",
                desc: "Choose to pick also the time.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when the value of the datepicker changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Datepicker value (Date)"
            },
            {
                name: "onPaste",
                desc: "Function triggered when pasting a date.",
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

        <IconApis />
    </>
}