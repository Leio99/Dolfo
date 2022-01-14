import React, { CSSProperties } from "react"
import { CheckBox } from "../form/CheckBox"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import { formatDate, getTime, downloadCSV } from "../shared/utility"
import { CheckIcon, CloseIcon } from "./Icon"

interface IProps{
    readonly columns: IColumn[],
    readonly data: IDataColumn[]
    readonly className?: string
    readonly exportable?: boolean
    readonly exportFormat?: ("csv")[]
    readonly style?: CSSProperties
}

interface IState{
    readonly filter: { [x: string]: string }
    readonly activeFilterKey: string
    readonly activeFilter: string
}

export abstract class ResultsManager<P = {}> extends React.PureComponent<IProps & P, IState>{
    abstract render: () => JSX.Element

    private isPressingCheckbox = false

    constructor(props: IProps & P){
        super(props)

        this.state = {
            filter: {},
            activeFilterKey: "",
            activeFilter: ""
        }
    }

    changeFilter = (key: string, value: string): void => {
        const filter = {
            ...this.state.filter,
            [key]: value
        }

        this.setState({
            filter,
            activeFilterKey: key
        })
    }

    changeActiveFiler = (key: string): void => this.setState({ activeFilter: key })

    blurSearch = (): void => this.setState({ activeFilter: "" })

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

    onDoubleClick = (data: IDataColumn): void => {
        if(this.isPressingCheckbox) return

        data.onDoubleClick && data.onDoubleClick()
    }

    getExportData = (): any => {
        const exportAll = this.props.columns.filter(d => d.exportable).length === 0,
        columns = exportAll ? this.props.columns : this.props.columns.filter(c => c.exportable && c.type !== "check"),
        header = columns.map(c => c.label),
        data = exportAll ? this.props.data : this.props.data.map(d => {
            let obj: any = {}

            Object.keys(d).forEach(k => {
                const find = columns.find(c => c.field === k)

                if(find) obj[k] = d[k]
            })

            return obj
        }),
        orderedData = data.map(d => {
            let obj: any = {}

            columns.forEach(c => obj[c.exportField ? c.exportField : c.field] = this.getColumnDataType(c, d, true))

            return obj
        })

        return { data: orderedData, header, columns }
    }

    exportCSV = (): void => {
        const exportData = this.getExportData()
        downloadCSV(exportData.data, exportData.header)
    }
}