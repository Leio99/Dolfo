import React from "react"
import Button from "../layout/Button"
import { Icon, DetailIcon } from "../layout/Icon"
import { Table } from "../layout/table/Table"
import { Tooltip } from "../layout/Tooltip"
import { MenuItem } from "../MenuContent"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import { copyToClipBoard } from "../shared/utility"

export class WhenToUse extends React.Component{
    render = (): JSX.Element => <div className="when-to-use">
        <h3>When to use?</h3>
        {this.props.children}
    </div>
}

interface ApisProps{
    readonly title?: string
    readonly id?: string
    readonly data: IDataColumn[]
    readonly addTooltip?: boolean
}

export class Apis extends React.Component<ApisProps>{
    render = (): JSX.Element => {
        const { data, addTooltip, title, id } = this.props,
        columns: IColumn[] = [
            { field: "name", label: "Name"},
            { field: "desc", label: "Description", align: "justify" },
            { field: "type", label: "Type", width: "15%" },
            { field: "required", label: "Required", type: "boolean", align: "center", width: "15%" }
        ]

        if(data.some(d => d.default))
            columns.push({ field: "default", label: "Default", align: "center" })
        if(data.some(d => d.fnParams))
            columns.push({ field: "fnParams", label: "Function parameters" })

        return <div className="apis" id={id}>
            <h3>{title || "APIs"}</h3>
            <Table columns={columns} data={addTooltip ? data.concat([
                {
                    name: "tooltip",
                    desc: "Title of the tooltip to show. If not passed, the tooltip won't show.",
                    type: "string",
                    required: false,
                    default: "null"
                },
                {
                    name: "placeTooltip",
                    desc: "Determines where to place the tooltip, if set.",
                    type: "string: top, left, bottom, right",
                    required: false,
                    default: "top"
                }
            ]) : data} />
        </div>
    }
}

interface ResultCodeProps{
    readonly title: string
    readonly result: JSX.Element
    readonly code: string
}

interface ResultCodeState{
    readonly showing: "preview" | "code"
}

export class ResultCode extends React.Component<ResultCodeProps, ResultCodeState>{
    constructor(props: ResultCodeProps){
        super(props)

        this.state = {
            showing: "preview"
        }
    }

    showPreview = () => this.setState({ showing: "preview" })

    showCode = () => this.setState({ showing: "code" })

    render = (): JSX.Element => {
        const { showing } = this.state,
        { code, result, title } = this.props,
        isCode = showing === "code"

        return <div className="component-preview">
            <h6>{title}</h6>
            <div className={"component-showing" + (isCode ? " code" : "")}>
                { isCode ? code : result}
            </div>

            <div className="component-buttons">
                {isCode && <Tooltip tooltip="Copy code">
                    <Button type="text" onClick={() => copyToClipBoard(code)} style={{ marginRight: "0.5rem" }}>
                        <Icon iconKey="copy" type="far" large />
                    </Button>
                </Tooltip>}

                <Tooltip tooltip="Show preview">
                    <Button type="text" onClick={this.showPreview} style={{ marginRight: "0.5rem" }}>
                        <Icon iconKey="window" type="far" color={!isCode && "var(--dark)"} large />
                    </Button>
                </Tooltip>
                <Tooltip tooltip="Show code">
                    <Button type="text" onClick={this.showCode}>
                        <Icon iconKey="code" type="far" color={isCode && "var(--dark)"} large />
                    </Button>
                </Tooltip>
            </div>
        </div>
    }
}

export class Usage extends React.Component<{ readonly notes?: string | JSX.Element }>{
    render = (): JSX.Element => {
        return <>
            <h3 className="usage">Usage</h3>
            {this.props.notes && <p className="notes">Note: {this.props.notes}</p>}
        </>
    }
}

export class IconApis extends React.Component{
    render = (): JSX.Element => <>
        <Apis id="iconProps" title="BaseIconProps" data={[
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
            }
        ]} />

        <Button type="text" btnColor="darkblue" onClick={() => MenuItem.clickItem(MenuItem.findLink("Icon"))}>
            <DetailIcon /> Learn more about <strong>Icons</strong>.
        </Button>
    </>
}

export class OptionApis extends React.Component{
    render = (): JSX.Element => <Apis id="optionProps" title="Option properties" data={[
        {
            name: "value",
            desc: "The value of the option.",
            type: "any",
            required: true
        },
        {
            name: "label",
            desc: "The label of the option.",
            type: "string",
            required: true
        }
    ]} />
}

export class ColumnApis extends React.Component<{ readonly hideData?: boolean }>{
    render = (): JSX.Element => <>
        <Apis id="columnProps" title="Column properties" data={[
            {
                name: "field",
                desc: "The field name of the row object.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "label",
                desc: "The column label.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "width",
                desc: "Defines the column width.",
                type: "string or number",
                required: false,
                default: "auto"
            },
            {
                name: "align",
                desc: "Defines the content alignment of the cell.",
                type: "string (left, right, center, justify)",
                required: false,
                default: "left"
            },
            {
                name: "canSearch",
                desc: "Defines whether the column is filtrable by searching.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "searchField",
                desc: "Defines a custom search field inside the object, instead of the passed 'field'.",
                type: "string",
                required: false,
                default: "null (gets 'field')"
            },
            {
                name: "tooltip",
                desc: "Determines whether to show the tooltip when hovering the cells.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "placeTooltip",
                desc: "Determines where to place the tooltip, if set.",
                type: "string: top, left, bottom, right",
                required: false,
                default: "top"
            },
            {
                name: "type",
                desc: "Defines the kind of data passed in.",
                type: "string: date, time, check (shows a checkbox), boolean (shows a check icon if true, an X icon if false)",
                required: false,
                default: "null (string)"
            },
            {
                name: "checked",
                desc: "If type is 'check' determines when the checkbox should be checked.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "checkTooltip",
                desc: "Defines a custom tooltip for the checkbox.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "exportable",
                desc: "Defines a whether the table can be exported.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "exportField",
                desc: "Defines a custom field considered when exporting.",
                type: "string",
                required: false,
                default: "null (gets 'field')"
            },
            {
                name: "onCheckAll",
                desc: "Function triggered when checking/unchecking.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />

        {!this.props.hideData && <>
            <p className="notes">Note: the field names defined in the columns, should be the same object keys of data columns.</p>

            <Apis id="dataColumnProps" title="Column data properties (your data array + custom properties as defined below)" data={[
                {
                    name: "checked",
                    desc: "Determines whether the checkbox is checked for the current row.",
                    type: "CSSProperties",
                    required: false,
                    default: "null"
                },
                {
                    name: "checkDisabled",
                    desc: "Determines whether the checkbox is disabled for the current row.",
                    type: "CSSProperties",
                    required: false,
                    default: "null"
                },
                {
                    name: "hideCheck",
                    desc: "Determines whether the checkbox should not appear inside the current row.",
                    type: "CSSProperties",
                    required: false,
                    default: "null"
                },
                {
                    name: "rowStyle",
                    desc: "Additional style to apply to the row.",
                    type: "CSSProperties",
                    required: false,
                    default: "null"
                },
                {
                    name: "onCheckChange",
                    desc: "Function triggered when the checkbox is checked/unchecked by the user.",
                    type: "function",
                    required: false,
                    default: "null",
                    fnParams: "None"
                },
                {
                    name: "onDoubleClick",
                    desc: "Function triggered when double clicking a row.",
                    type: "function",
                    required: false,
                    default: "null",
                    fnParams: "None"
                }
            ]} />
        </>}
    </>
}