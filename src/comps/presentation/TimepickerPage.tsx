import React from "react"
import TimePicker from "../form/TimePicker"
import { goToApiBlock, MenuContentProps } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class TimepickerPage extends React.Component<MenuContentProps>{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a time picker component inside your form.</WhenToUse>
        <Usage notes="user can use arrow up and down keys to increase or decrease hours/minutes." />

        <ResultCode
            title="Simple timepicker"
            result={<TimePicker />}
            code={'<TimePicker />'}
        />

        <ResultCode
            title="Label"
            result={<TimePicker label="I am a label" />}
            code={'<TimePicker label="I am a label" />'}
        />

        <ResultCode
            title="Disabled"
            result={<TimePicker disabled />}
            code={'<TimePicker disabled />'}
        />

        <ResultCode
            title="Custom icon"
            result={<TimePicker icon={{ iconKey: "hourglass" }} />}
            code={'<TimePicker icon={{ iconKey: "hourglass" }} />'}
        />

        <ResultCode
            title="Default value (midday)"
            result={<TimePicker defaultValue={new Date("2020-01-01 12:00")} />}
            code={'<TimePicker defaultValue={new Date("2020-01-01 12:00")} />'}
        />

        <Apis data={[
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows clock icon)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "defaultValue",
                desc: "The default value for the time picker (format is HH:mm).",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the time picker is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "autoFocus",
                desc: "If true, the time picker automatically focuses.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show over the time picker.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the time picker wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "The style to apply to the time picker.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the time picker wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "required",
                desc: "Determines whether the time picker is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when time picker value changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Time picker value (string format HH:mm)"
            },
            {
                name: "onKeyUpHour",
                desc: "Function triggered on hours input key up.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyUpMinute",
                desc: "Function triggered on minutes input key up.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyDownHour",
                desc: "Function triggered on hours input key down.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyDownMinute",
                desc: "Function triggered on minutes input key down.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyPressHour",
                desc: "Function triggered on hours input key pressing.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            },
            {
                name: "onKeyPressMinute",
                desc: "Function triggered on minutes input key pressing.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Event"
            }
        ]} />

        <IconApis {...this.props} />
    </>
}