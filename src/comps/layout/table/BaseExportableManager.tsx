import React from "react"
import { CheckBox } from "../../form/CheckBox"
import { Constants } from "../../shared/Constants"
import { IColumn, IDataColumn } from "../../shared/models/IColumn"
import { downloadCSV, formatDate, getTime } from "../../shared/utility"
import { CheckIcon, CloseIcon } from "../Icon"
import { Tooltip } from "../Tooltip"

export interface BaseResultsData{
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
}

export abstract class BaseExportableManager<P = any, S = any> extends React.Component<P & BaseResultsData, S>{
    private isPressingCheckbox = false

    getColumnDataType = (col: IColumn, data: IDataColumn, exp = false): any => {
        if(col.field.indexOf(".") >= 0 && !exp){
            const pieces = col.field.split(".")
            let ret = data

            pieces.forEach(p => ret = ret[p])

            return ret
        }else if(exp && col.exportField && col.exportField.indexOf(".") >= 0){
            const pieces = col.exportField.split(".")
            let ret = data

            pieces.forEach(p => ret = ret[p])

            return ret
        }

        const d = data[exp && col.exportField ? col.exportField : col.field]

        if(col.type === "check" && !data.hideCheck){
            return <CheckBox checked={data.checked} onChange={() => {
                this.isPressingCheckbox = true
                data.onCheckChange && data.onCheckChange()

                setTimeout(() => this.isPressingCheckbox = false, 100)
            }} disabled={data.checkDisabled} />
        }

        if(col.type === "date")
            return d ? formatDate(new Date(d)) : ""
        if(col.type === "time")
            return d ? getTime(d) : ""
        if(col.type === "boolean")
            return d ? (exp ? Constants.YES_TEXT : <Tooltip tooltip={Constants.YES_TEXT}>
                <CheckIcon />
            </Tooltip>) : (exp ? Constants.NO_TEXT : <Tooltip tooltip={Constants.NO_TEXT}>
                <CloseIcon />
            </Tooltip>)

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