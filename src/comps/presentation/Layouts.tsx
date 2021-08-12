import React from "react"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { Table } from "../layout/Table"
import { IColumn, IDataColumn } from "../shared/models/IColumn"

export class WhenToUse extends React.Component{
    render = (): JSX.Element => <div className="when-to-use">
        <h3>When to use?</h3>
        {this.props.children}
    </div>
}

interface ApisProps{
    readonly title?: string
    readonly data: IDataColumn[]
    readonly addTooltip?: boolean
}

export class Apis extends React.Component<ApisProps>{
    render = (): JSX.Element => {
        const { data, addTooltip, title } = this.props,
        columns: IColumn[] = [
            { field: "name", label: "Name"},
            { field: "desc", label: "Description", align: "justify" },
            { field: "type", label: "Type", width: "15%" },
            { field: "required", label: "Required", type: "boolean", align: "center", width: "15%" },
            { field: "default", label: "Default", align: "center" },
            { field: "fnParams", label: "Function parameters" }
        ]

        return <div className="apis">
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
                <Button textBtn onClick={this.showPreview} className="mr-2" tooltip="Show preview">
                    <Icon iconKey="window" type="far" color={!isCode && "var(--dark)"} large />
                </Button>
                <Button textBtn onClick={this.showCode} tooltip="Show code">
                    <Icon iconKey="code" type="far" color={isCode && "var(--dark)"} large />
                </Button>
            </div>
        </div>
    }
}

export class Usage extends React.Component{
    render = (): JSX.Element => <h3 className="usage">Usage</h3>
}