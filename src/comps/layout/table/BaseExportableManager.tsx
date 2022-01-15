import React from "react"
import { CheckBox } from "../../form/CheckBox"
import { Constants } from "../../shared/Constants"
import { IColumn, IDataColumn } from "../../shared/models/IColumn"
import { downloadCSV, formatDate, getTime } from "../../shared/utility"
import { CheckIcon, CloseIcon } from "../Icon"

export interface BaseResultsData{
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
}

export abstract class BaseExportableManager<P = any, S = any> extends React.Component<P & BaseResultsData, S>{
    private isPressingCheckbox = false

    getColumnDataType = (col: IColumn, data: IDataColumn, exp = false): any => {
        const d = data[exp && col.exportField ? col.exportField : col.field]

        if(col.type === "check" && !data.hideCheck){
            return <CheckBox checked={data.checked} onChange={() => {
                this.isPressingCheckbox = true
                data.onCheckChange && data.onCheckChange()

                setTimeout(() => this.isPressingCheckbox = false, 100)
            }} disabled={data.checkDisabled} />
        }

        if(col.type === "date")
            return formatDate(new Date(d))
        if(col.type === "time")
            return getTime(d)
        if(col.type === "boolean")
            return d ? (exp ? Constants.YES_TEXT : <CheckIcon tooltip={Constants.YES_TEXT} />) : (exp ? Constants.NO_TEXT : <CloseIcon tooltip={Constants.NO_TEXT} />)

        return d
    }

    getExportData = (): any => {
        const { columns, data } = this.props,
        exportAll = columns.filter(d => d.exportable == null).length === columns.length,
        expCols = exportAll ? columns : columns.filter(c => (c.exportable || c.exportable == null) && c.type !== "check"),
        header = expCols.map(c => c.label),
        expData = exportAll ? data : data.map(d => {
            let obj: any = {}

            Object.keys(d).forEach(k => {
                const find = expCols.find(c => c.field === k)

                if(find) obj[k] = d[k]
            })

            return obj
        }),
        orderedData = expData.map(d => {
            let obj: any = {}

            expCols.forEach(c => obj[c.exportField ? c.exportField : c.field] = this.getColumnDataType(c, d, true))

            return obj
        })

        return { data: orderedData, header, columns: expCols }
    }

    onDoubleClick = (data: IDataColumn): void => {
        if(this.isPressingCheckbox) return

        data.onDoubleClick && data.onDoubleClick()
    }

    exportCSV = (): void => {
        const exportData = this.getExportData()
        downloadCSV(exportData.data, exportData.header)
    }
}