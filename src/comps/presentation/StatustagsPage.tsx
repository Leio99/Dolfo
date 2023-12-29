import React from "react"
import { Icon } from "../layout/Icon"
import { Status } from "../layout/Status"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class StatustagsPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render some status tags or chips.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple tag"
            result={<Status type="success">Active</Status>}
            code={'<Status type="success">Active</Status>'}
        />

        <ResultCode
            title="No icon"
            result={<Status type="success" hideIcon>Active</Status>}
            code={'<Status type="success" hideIcon>Active</Status>'}
        />

        <ResultCode
            title="Custom icon"
            result={<Status type="success" hideIcon>
                <Icon iconKey="briefcase" /> Active
            </Status>}
            code={'<Status type="success" hideIcon>\n\t<Icon iconKey="briefcase" /> Active\n</Status>'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Status type="success" style={{ marginRight: 5 }}>Success</Status>
                <Status type="error" style={{ marginRight: 5 }}>Error</Status>
                <Status type="warning" style={{ marginRight: 5 }}>Warning</Status>
                <Status type="info" style={{ marginRight: 5 }}>Info</Status>
                <Status type="pending" style={{ marginRight: 5 }}>Pending</Status>
            </>}
            code={'<Status type="success">Success</Status>\n<Status type="error">Error</Status>\n<Status type="warning">Warning</Status>\n<Status type="info">Info</Status>\n<Status type="pending">Pending</Status>'}
        />

        <Apis data={[
            {
                name: "type",
                desc: "The type of the status tag.",
                type: "string (success, info, error, warning, pending)",
                required: true
            },
            {
                name: "hideIcon",
                desc: "Determines whether to hide the default icon or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional style for the status tag.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className for the status tag.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}