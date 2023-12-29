import React from "react"
import { Alert } from "../layout/Alert"
import { ErrorIcon } from "../layout/Icon"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class AlertPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render an alert message.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple alert"
            result={<Alert>Here is a message</Alert>}
            code={'<Alert>Here is a message</Alert>'}
        />

        <ResultCode
            title="Closable"
            result={<Alert closable>Click the X to close me</Alert>}
            code={'<Alert closable>Click the X to close me</Alert>'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Alert style={{ marginBottom: 10 }}>I am the default color</Alert>
                <Alert style={{ marginBottom: 10 }} type="info">Here is some information</Alert>
                <Alert style={{ marginBottom: 10 }} type="success">You did it!</Alert>
                <Alert style={{ marginBottom: 10 }} type="warning">Think about it first...</Alert>
                <Alert type="error"><ErrorIcon /> Some error happened!</Alert>
            </>}
            code={'<Alert>I am the default color</Alert>\n<Alert type="info">Here is some information</Alert>\n<Alert type="success">You did it!</Alert>\n<Alert type="warning">Think about it first...</Alert>\n<Alert type="error">\n\t<ErrorIcon /> Some error happened!\n</Alert>'}
        />

        <Apis data={[
            {
                name: "type",
                desc: "Determines the alert type (and color).",
                type: "string (info, success, error, warning)",
                required: false,
                default: "null (grey alert)"
            },
            {
                name: "closable",
                desc: "Determines whether the alert can be closed or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional alert style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional alert className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onClose",
                desc: "Function triggered when the user closes the alert.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}