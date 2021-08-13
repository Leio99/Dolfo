import React from "react"
import { Apis, ColumnApis, ResultCode, Usage, WhenToUse } from "./Layouts"
import { Table } from "../layout/Table"
import { IColumn, IDataColumn } from "../shared/models/IColumn"

export class TablePage extends React.Component{
    readonly cols: IColumn[] = [
        { field: "firstName", label: "First name" },
        { field: "lastName", label: "Last name" },
        { field: "birth", label: "Date of birth", type: "date", align: "center" },
        { field: "isActive", label: "Active", type: "boolean", align: "center" }
    ]
    readonly data: IDataColumn[] = [
        { firstName: "Jack", lastName: "Nickolson", birth: new Date(1999, 3, 17), isActive: true },
        { firstName: "James", lastName: "Spark", birth: new Date(1970, 11, 9), isActive: false }
    ]

    render = (): JSX.Element => {
        return <>
            <WhenToUse>When you want to render a table with data.</WhenToUse>
            <Usage />
            
            <ResultCode
                title="Basic example"
                result={<Table columns={this.cols} data={this.data} />}
                code={'<Table columns={[\n\t{ field: "firstName", label: "First name" },\n\t{ field: "lastName", label: "Last name" },\n\t{ field: "birth", label: "Date of birth", type: "date", align: "center" },\n\t{ field: "isActive", label: "Active", type: "boolean", align: "center" }\n]} data={[\n\t{ firstName: "Jack", lastName: "Nickolson", birth: new Date(1999, 3, 17), isActive: true },\n\t{ firstName: "James", lastName: "Spark", birth: new Date(1970, 11, 9), isActive: false }\n]} />'}
            />
            
            <ResultCode
                title="With checkbox"
                result={<Table columns={([
                    { type: "check", checkTooltip: "Check all" }
                ] as IColumn[]).concat(this.cols)} data={this.data} />}
                code={'<Table columns={[\n\t{ type: "check", checkTooltip: "Check all" },\n\t{ field: "firstName", label: "First name" },\n\t{ field: "lastName", label: "Last name" },\n\t{ field: "birth", label: "Date of birth", type: "date", align: "center" },\n\t{ field: "isActive", label: "Active", type: "boolean", align: "center" }\n]} data={[\n\t{ firstName: "Jack", lastName: "Nickolson", birth: new Date(1999, 3, 17), isActive: true },\n\t{ firstName: "James", lastName: "Spark", birth: new Date(1970, 11, 9), isActive: false }\n]} />'}
            />

            <ResultCode
                title="Searchable"
                result={<Table columns={this.cols.map(c => {
                    return {...c, canSearch: true}
                })} data={this.data} />}
                code={'<Table columns={[\n\t{ field: "firstName", label: "First name", canSearch: true },\n\t{ field: "lastName", label: "Last name", canSearch: true },\n\t{ field: "birth", label: "Date of birth", type: "date", align: "center", canSearch: true },\n\t{ field: "isActive", label: "Active", type: "boolean", align: "center", canSearch: true }\n]} data={[\n\t{ firstName: "Jack", lastName: "Nickolson", birth: new Date(1999, 3, 17), isActive: true },\n\t{ firstName: "James", lastName: "Spark", birth: new Date(1970, 11, 9), isActive: false }\n]} />'}
            />

            <Apis data={[
                {
                    name: "columns",
                    desc: "Defines the grid columns.",
                    type: "Array of IColumn",
                    required: true,
                    onDoubleClick: () => window.location.href = "#columnProps",
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "data",
                    desc: "Defines the grid datasource.",
                    type: "Array of IDataColumn",
                    required: true,
                    onDoubleClick: () => window.location.href = "#dataColumnProps",
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "exportable",
                    desc: "Determines whether the table is exportable or not (only if columns attribute 'exportable' is not defined or true).",
                    type: "boolean",
                    required: false,
                    default: "false"
                },
                {
                    name: "exportFormat",
                    desc: "Determines the file format to export the data source.",
                    type: "Array of strings (csv)",
                    required: false,
                    default: "null"
                },
                {
                    name: "style",
                    desc: "Additional style for the table.",
                    type: "CSSProperties",
                    required: false,
                    default: "null"
                },
                {
                    name: "className",
                    desc: "Additional className for the table.",
                    type: "string",
                    required: false,
                    default: "null"
                },
            ]} />

            <ColumnApis />
        </>
    }
}