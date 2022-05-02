import React from "react"
import Button from "../layout/Button"
import { NotificationMsg } from "../layout/NotificationMsg"
import { Table } from "../layout/table/Table"
import { Constants } from "../shared/Constants"
import { ResultCode, WhenToUse, Usage } from "./Layouts"

export class NotificationPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a notification.</WhenToUse>
        <Usage notes={<>this component can be rendered by calling a function (<em>NotificationMsg.show(params)</em>)</>} />

        <ResultCode
            title="Simple notification"
            result={<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show("Hi there!")}>Click to show</Button>}
            code={'<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show("Hi there!")}>Click to show</Button>'}
        />

        <ResultCode
            title="Positioning"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "top-left"
                })} style={{ marginRight: 5 }}>Top-left</Button>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "top-right"
                })} style={{ marginRight: 5 }}>Top-right</Button>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "bottom-right"
                })} style={{ marginRight: 5 }}>Bottom-right</Button>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "bottom-left"
                })} style={{ marginRight: 5 }}>Bottom-left</Button>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "centered-top"
                })} style={{ marginRight: 5 }}>Center-top</Button>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "Here some text for the content.",
                    position: "centered-bottom"
                })} style={{ marginRight: 5 }}>Center-bottom</Button>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "top-left"\n})} style={{ marginRight: 5 }}>Top-left</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "top-right"\n})} style={{ marginRight: 5 }}>Top-right</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "bottom-right"\n})} style={{ marginRight: 5 }}>Bottom-right</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "bottom-left"\n})} style={{ marginRight: 5 }}>Bottom-left</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "centered-top"\n})} style={{ marginRight: 5 }}>Center-top</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "Here some text for the content.",\n\tposition: "centered-bottom"\n})} style={{ marginRight: 5 }}>Center-bottom</Button>'}
        />

        <ResultCode
            title="Timing"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "I won't close automatically. Click me to close.",
                    hideDelay: "never",
                    dismissOnClick: true
                })} style={{ marginRight: 5 }}>Never closes</Button>

                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({
                    message: "I close after one second, watch out!",
                    hideDelay: 1000
                })}>Closes after 1 second</Button>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "I won\'t close automatically. Click me to close.",\n\thideDelay: "never"\n\tdismissOnClick: true\n})} style={{ marginRight: 5 }}>Never closes</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.show({\n\tmessage: "I close after one second, watch out!",\n\thideDelay: 1000\n})}>Closes after 1 second</Button>'}
        />

        <ResultCode
            title="Types"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => {
                    const loading = NotificationMsg.showLoading()

                    setTimeout(loading.close, 1000)
                }} style={{ marginRight: 5 }}>Loading</Button>

                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.showInfo("Information!")} style={{ marginRight: 5 }}>Info</Button>

                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.showSuccess("Success!")} style={{ marginRight: 5 }}>Success</Button>

                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.showError("Error!")} style={{ marginRight: 5 }}>Error</Button>

                <Button btnColor="blue" size="small" onClick={() => NotificationMsg.showWarning("Warning!")}>Warning</Button>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => {\n\tconst loading = NotificationMsg.showLoading()\n\n\tsetTimeout(loading.close, 1000)\n}}>Loading</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.showInfo("Information!")}>Info</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.showSuccess("Success!")}>Success</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.showError("Error!")}>Error</Button>\n\n<Button btnColor="blue" size="small" onClick={() => NotificationMsg.showWarning("Warning!")}>Warning</Button>'}
        />

        <div className="apis">
            <h3>Notification functions (accessible via <em>NotificationMsg.functionName(params)</em>)</h3>
            <p className="notes">Note: <span>all these functions return a <strong>Closable</strong> object. You can put your notification inside a variable and call <em>notification.close()</em> to close it.</span></p>
            <Table columns={[
                { field: "name", label: "Name" },
                { field: "desc", label: "Description" },
                { field: "params", label: "Params" }
            ]} data={[
                {
                    name: "showLoading",
                    desc: "Shows a loading notification.",
                    params: `Loading text (string or JSX, default: '${Constants.LOADING_TEXT}'), not required`
                },
                {
                    name: "showSuccess",
                    desc: "Shows a success notification.",
                    params: `Notification text (string or JSX), required`
                },
                {
                    name: "showError",
                    desc: "Shows an error notification.",
                    params: `Notification text (string or JSX), required`
                },
                {
                    name: "showInfo",
                    desc: "Shows an info notification.",
                    params: `Notification text (string or JSX), required`
                },
                {
                    name: "showWarning",
                    desc: "Shows a warning notification.",
                    params: `Notification text (string or JSX), required`
                },
                {
                    name: "show",
                    desc: "Shows a simple notification.",
                    params: <>
                        Notification text or:

                        <Table style={{ marginTop: 10 }} columns={[
                            { field: "name", label: "Name" },
                            { field: "desc", label: "Description" },
                            { field: "type", label: "Type" },
                            { field: "required", label: "Required", type: "boolean", align: "center" },
                            { field: "default", label: "Default" },
                        ]} data={[
                            {
                                name: "message",
                                desc: "Notification text",
                                required: true,
                                type: "string or JSX"
                            },
                            {
                                name: "isStatic",
                                desc: "Defines whether the notification should float or not.",
                                type: "boolean",
                                required: false,
                                default: "false (true if not rendered with a function)"
                            },
                            {
                                name: "type",
                                desc: "Notification type",
                                required: false,
                                type: "string (info, success, warning, error, loading)",
                                default: "null"
                            },
                            {
                                name: "icon",
                                desc: "Additional icon near the notification text.",
                                required: false,
                                type: "JSX",
                                default: "null"
                            },
                            {
                                name: "hideDelay",
                                desc: "Defines the time after the notification should close.",
                                required: false,
                                type: "number (seconds x 1000) or 'never'",
                                default: "null"
                            },
                            {
                                name: "position",
                                desc: "Defines the position of the notification.",
                                required: false,
                                type: "string (top-left, top-right, bottom-left, bottom-right, centered-top, centered-bottom)",
                                default: "top-right"
                            },
                            {
                                name: "dismissOnClick",
                                desc: "Determines if the notification can be closed by clicking on it.",
                                required: false,
                                type: "boolean",
                                default: "false"
                            },
                            {
                                name: "style",
                                desc: "Additional style for the notification.",
                                required: false,
                                type: "CSSProperties",
                                default: "null"
                            },
                            {
                                name: "className",
                                desc: "Additional className for the notification.",
                                required: false,
                                type: "string",
                                default: "null"
                            },
                            {
                                name: "onClose",
                                desc: "Function triggered when the notification is closed.",
                                required: false,
                                type: "function (no parameters passed in)",
                                default: "null"
                            }
                        ]} />
                    </>
                }
            ]} />
        </div>
    </>
}