import React from "react"
import Button from "../layout/Button"
import { ComponentAsDialogProps, Dialog, openDialog, openDialogComponent, openInfoDialog, openLoadingDialog, openYesNoDialog } from "../layout/Dialog"
import { DetailIcon, Icon } from "../layout/Icon"
import { Table } from "../layout/table/Table"
import { Tab, Tabs } from "../layout/Tabs"
import { Tooltip } from "../layout/Tooltip"
import { MenuContentProps, MenuItem } from "../MenuContent"
import { copyToClipBoard } from "../shared/utility"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class DialogPage extends React.Component<MenuContentProps, {
    readonly [x: string]: boolean
}>{
    constructor(props: MenuContentProps){
        super(props)

        this.state = {

        }
    }

    toggleDialog = (key: string) => this.setState({ [key]: !this.state[key] })
    
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a dialog message.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple dialog"
            result={<>
                <Button onClick={() => this.toggleDialog("first")} btnColor="blue" size="small">Open dialog</Button>

                <Dialog onOk={() => this.toggleDialog("first")} onClose={() => this.toggleDialog("first")} title="I am a simple dialog" visible={this.state["first"]}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, placeat tempora. Repellat necessitatibus tempora consectetur minima hic maiores eveniet labore nobis illo, atque odit delectus vero debitis ratione nulla adipisci.
                </Dialog>
            </>}
            code={'<Button onClick={() => this.toggleDialog("first")} btnColor="blue" size="small">Open simple dialog</Button>\n\n<Dialog onOk={() => this.toggleDialog("first")} onClose={() => this.toggleDialog("first")} title="I am a simple dialog" visible={this.state["first"]}>\n\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, placeat tempora. Repellat necessitatibus tempora consectetur minima hic maiores eveniet labore nobis illo, atque odit delectus vero debitis ratione nulla adipisci.\n</Dialog>'}
        />

        <ResultCode
            title="Open with function"
            result={<Button onClick={() => openDialog({
                title: "Hi there!",
                content: <>
                    <Icon iconKey="mouse-pointer" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime architecto dolor dolore voluptas libero est provident id aperiam minima non nobis harum laboriosam excepturi, nesciunt animi atque asperiores error? Quaerat.
                </>
            })} btnColor="blue" size="small">Open dialog</Button>}
            code={'<Button onClick={() => openDialog({\n\ttitle: "Hi there!",\n\tcontent: <>\n\t\t<Icon iconKey="mouse-pointer" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime architecto dolor dolore voluptas libero est provident id aperiam minima non nobis harum laboriosam excepturi, nesciunt animi atque asperiores error? Quaerat.\n\t</>\n})} btnColor="blue" size="small">Open dialog</Button>'}
        />

        <ResultCode
            title="Types"
            result={<>
                <Button style={{ marginRight: 5 }} onClick={() => openInfoDialog({ content: "Infos here" })} btnColor="blue" size="small">Info dialog</Button>
                <Button style={{ marginRight: 5 }} onClick={() => openInfoDialog({ type: "success", content: "You did it!" })} btnColor="blue" size="small">Success dialog</Button>
                <Button style={{ marginRight: 5 }} onClick={() => openInfoDialog({ type: "error", content: "An error occurred!" })} btnColor="blue" size="small">Error dialog</Button>
                <Button onClick={() => openInfoDialog({ type: "warning", content: "Think about it..." })} btnColor="blue" size="small">Warning dialog</Button>
            </>}
            code={'<Button onClick={() => openInfoDialog({ content: "Infos here" })} btnColor="blue" size="small">Open dialog</Button>\n\n<Button onClick={() => openInfoDialog({ type: "success", content: "You did it!" })} btnColor="blue" size="small">Open dialog</Button>\n\n<Button onClick={() => openInfoDialog({ type: "error", content: "An error occurred!" })} btnColor="blue" size="small">Open dialog</Button>\n\n<Button onClick={() => openInfoDialog({ type: "warning", content: "Think about it..." })} btnColor="blue" size="small">Open dialog</Button>'}
        />

        <ResultCode
            title="Close on mask"
            result={<Button onClick={() => openInfoDialog({
                content: "Click outside me to close.",
                clickOutside: true
            })} btnColor="blue" size="small">Open dialog</Button>}
            code={'<Button onClick={() => openInfoDialog({\n\tcontent: "Click outside me to close.",\n\tclickOutside: true\n})} btnColor="blue" size="small">Open dialog</Button>'}
        />

        <ResultCode
            title="Yes/No dialog"
            result={<Button onClick={() => openYesNoDialog("Warning", "Are you sure about that?", null)} btnColor="blue" size="small">Open dialog</Button>}
            code={'<Button onClick={() => openYesNoDialog("Warning", "Are you sure about that?", null)} btnColor="blue" size="small">Open dialog</Button>'}
        />

        <ResultCode
            title="Loading dialog"
            result={<Button onClick={() => {
                const dialog = openLoadingDialog()

                setTimeout(dialog.close, 2000)
            }} btnColor="blue" size="small">Open dialog</Button>}
            code={'<Button onClick={() => {\n\tconst dialog = openLoadingDialog\n\n\tsetTimeout(dialog.close, 2000)\n}} btnColor="blue" size="small">Open dialog</Button>'}
        />

        <ResultCode
            title="Footer"
            result={<>
                <Button onClick={() => openDialog({
                    title: "No footer",
                    content: "I have no footer.",
                    hideFooter: true,
                    clickOutside: true
                })} btnColor="blue" size="small" style={{ marginRight: 5 }}>Hidden footer</Button>

                <Button onClick={() => {
                    const dialog = openDialog({
                        title: "Custom footer",
                        content: "Here is my custom footer.",
                        customFooter: [
                            <Button key="save" type="text" btnColor="green">
                                <Icon iconKey="save" /> Save
                            </Button>,
                            <Button key="delete" type="text" btnColor="red" style={{ marginLeft: 10 }}>
                                <Icon iconKey="trash-alt" /> Delete
                            </Button>,
                            <Button key="close" type="text" btnColor="grey" onClick={() => dialog.close()}>
                                <Icon iconKey="times" /> Close
                            </Button>
                        ],
                        clickOutside: true
                    })
                }} btnColor="blue" size="small">Custom footer</Button>
            </>}
            code={'<Button onClick={() => openDialog({\n\ttitle: "No footer",\n\tcontent: "I have no footer.",\n\thideFooter: true,\n\tclickOutside: true\n})} btnColor="blue" size="small" style={{ marginRight: 5 }}>Hidden footer</Button>\n\n<Button onClick={() => {\n\tconst dialog = openDialog({\n\t\ttitle: "Custom footer",\n\t\tcontent: "Here is my custom footer.",\n\t\tcustomFooter: [\n\t\t\t<Button type="text" btnColor="green">\n\t\t\t\t<Icon iconKey="save" /> Save\n\t\t\t</Button>,\n\t\t\t<Button type="text" btnColor="red" style={{ marginLeft: 10 }}>\n\t\t\t\t<Icon iconKey="trash-alt" /> Delete\n\t\t\t</Button>,\n\t\t\t<Button type="text" btnColor="grey" onClick={() => dialog.close()}>\n\t\t\t\t<Icon iconKey="times" /> Close\n\t\t\t</Button>\n\t\t],\n\t\tclickOutside: true\n\t})\n}} btnColor="blue" size="small">Custom footer</Button>'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The title of the dialog.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "visible",
                desc: "Determines whether the dialog is visible or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "okBtnClass",
                desc: "Additional className for the ok button.",
                type: "string",
                required: false,
                default: "false"
            },
            {
                name: "cancelBtnClass",
                desc: "Additional className for the cancel button.",
                type: "string",
                required: false,
                default: "false"
            },
            {
                name: "okText",
                desc: "Text for the ok button.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "cancelText",
                desc: "Text for the cancel button.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "hideCancel",
                desc: "Doesn't show the cancel button.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "okType",
                desc: "Type of the ok button (color).",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "darkblue"
            },
            {
                name: "cancelType",
                desc: "Type of the cancel button (color).",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "red"
            },
            {
                name: "customFooter",
                desc: "Custom buttons for the footer.",
                type: <>
                    Array of <Button onClick={() => MenuItem.clickItem(MenuItem.findLink("Button"), this.props.history)} btnColor="darkblue" type="text" style={{ verticalAlign: "top" }}>
                        <DetailIcon /> Buttons
                    </Button>
                </>,
                required: false,
                default: "null"
            },
            {
                name: "hideFooter",
                desc: "Hides the footer.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "top",
                desc: "Show the dialog on top of the page, instead of center.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "overflows",
                desc: "Determines if the dialog should overflow or expand itself.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "clickOutside",
                desc: "Determines whether the dialog can be closed by clicking on the mask.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "width",
                desc: "Defines the dialog width.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional dialog style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional dialog className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onOk",
                desc: "Function triggered when clicking on the ok button.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            },
            {
                name: "onCancel",
                desc: "Function triggered when clicking on the cancel button and the X button on top.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            },
            {
                name: "hideCloseX",
                desc: "If true, hides the X button on the top right corner.",
                type: "boolean",
                required: false,
                default: "false"
            }
        ]} />

        <div className="apis">
            <h3>Useful functions (accessible via <em>Dialog.functionName(params)</em>)</h3>
            <p className="notes">Note: <span>all these functions return a <strong>Closable</strong> object. You can put your dialog inside a variable and call <em>dialog.close()</em> to close it.</span></p>
            <Table columns={[
                { field: "name", label: "Name" },
                { field: "desc", label: "Description" },
                { field: "params", label: "Params" },
                { field: "other", label: "Other infos" }
            ]} data={[
                {
                    name: "loadingDialog",
                    desc: "Shows a loading dialog.",
                    params: "Loading text (string, not required)"
                },
                {
                    name: "infoDialog",
                    desc: "Shows info dialog.",
                    params: <DialogProperties />
                },
                {
                    name: "openDialog",
                    desc: "Shows generic dialog.",
                    params: <DialogProperties />
                },
                {
                    name: "openDialogComponent",
                    desc: "Shows a dialog component from another module.",
                    params: <Table style={{ marginTop: 10 }} columns={[
                        { field: "desc", label: "Description" },
                        { field: "type", label: "Type" },
                        { field: "required", label: "Required", type: "boolean", align: "center" },
                        { field: "default", label: "Default" },
                    ]} data={[
                        {
                            desc: "The dialog class to be opened.",
                            required: true,
                            type: "class"
                        },
                        {
                            desc: "Additional props to pass to the component.",
                            required: false,
                            type: "Object",
                            default: "null"
                        }
                    ]} />,
                    other: <>
                        The component opened gets an additional prop passed in: close (function). You can also pass custom props to it. <Button type="text" btnColor="darkblue" onClick={() => openDialogComponent(Example)} style={{ verticalAlign: "top" }}>Click here to open example</Button>
                    </>
                }
            ]} />
        </div>
    </>
}

class Example extends React.Component<ComponentAsDialogProps, { readonly current: number }>{
    constructor(props: ComponentAsDialogProps){
        super(props)

        this.state = {
            current: 0
        }
    }

    render = (): React.ReactNode => {
        const codes = [`export class Parent extends React.Component {\n\tshowDialog = () => openDialogComponent(Children)\n\n\trender = () => <Button btnColor="blue" onClick={this.showDialog}>Open dialog</Button>\n}`, `export class Children extends React.Component<ComponentAsDialogProps>{\n\trender = () => <Dialog title="Some title" onClose={this.props.close}>\n\t\tThis is my content\n\t</Dialog>\n}`, `export class Parent extends React.Component {\n\tshowDialog = () => openDialogComponent(Children, {\n\t\tfirstName: "Jack",\n\t\tlastName: "Nicholson"\n\t})\n\n\trender = () => <Button btnColor="blue" onClick={this.showDialog}>Open dialog</Button>\n}`, `interface ChildrenProps extends ComponentAsDialogProps{\n\treadonly firstName: string\n\treadonly lastName: string\n}\n\nexport class Children extends React.Component<ChildrenProps>{\n\trender = () => <Dialog title="Some title" onClose={this.props.close}>\n\t\tMy name is {this.props.firstName} {this.props.lastName}\n\t</Dialog>\n}`],
        { current } = this.state

        return <Dialog width="70vw" onClose={this.props.close} clickOutside visible title="External dialog component example" overflows top customFooter={[
            <Tooltip tooltip="Copy code">
                <Button type="text" onClick={() => copyToClipBoard(codes[current === 0 ? 0 : 2] + "\n\n" +  codes[current === 0 ? 1 : 3])} style={{ marginRight: "0.5rem" }}>
                    <Icon iconKey="copy" type="far" large />
                </Button>
            </Tooltip>
        ]}>
            <Tabs onChangeTab={current => this.setState({ current })}>
                <Tab title="Example 1">
                    <code style={{ wordBreak: "break-word" }}>
                        {codes[0]}
                    </code>
                    <code style={{ wordBreak: "break-word" }}>
                        {codes[1]}
                    </code>
                </Tab>
                <Tab title="With custom props">
                    <code style={{ wordBreak: "break-word" }}>
                        {codes[2]}
                    </code>
                    <code style={{ wordBreak: "break-word" }}>
                        {codes[3]}
                    </code>
                </Tab>
            </Tabs>
        </Dialog>
    }
}

class DialogProperties extends React.Component{
    render = (): React.ReactNode => <>
        Normal dialog properties (object, required) plus:

        <Table style={{ marginTop: 10 }} columns={[
            { field: "name", label: "Name" },
            { field: "desc", label: "Description" },
            { field: "type", label: "Type" },
            { field: "required", label: "Required", type: "boolean", align: "center" },
            { field: "default", label: "Default" },
        ]} data={[
            {
                name: "type",
                desc: "Defines the dialog type.",
                required: false,
                type: "string (success, info, warning, error)",
                default: "null"
            },
            {
                name: "icon",
                desc: "Additional icon near the title.",
                required: false,
                type: "ReactNode",
                default: "null"
            }
        ]} />
    </>
}