import React from "react"
import { downloadCSV, formatDate, getTime } from "../shared/utility"
import { CheckBox } from "../form/CheckBox"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { Icon } from "./Icon"

export interface IProps{
    readonly columns: IColumn[],
    readonly data: IDataColumn[]
    readonly className?: string
    readonly exportable?: boolean
    readonly exportFormat?: ("csv")[]
}
export interface IState{
    readonly filter: { [x: string]: string }
    readonly activeFilterKey: string
    readonly activeFilter: string
}

export class Table extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            filter: {},
            activeFilterKey: "",
            activeFilter: ""
        }
    }

    changeFilter = (key: string, value: string) => {
        let filter = { ...this.state.filter }
        filter[key] = value

        this.setState({
            filter,
            activeFilterKey: key
        })
    }

    changeActiveFiler = (key: string) => this.setState({ activeFilter: key })

    blurSearch = () => this.setState({ activeFilter: "" })

    getColumnDataType = (col: IColumn, data: IDataColumn, exp = false) => {
        const d = data[exp && col.exportField ? col.exportField : col.field]

        if(col.type === "check" && !data.hideCheck) return <CheckBox checked={data.checked} onChange={() => data.onCheckChange(data)} disabled={data.checkDisabled} />
        if(col.type === "date") return formatDate(new Date(d))
        if(col.type === "time") return getTime(d)

        return d
    }

    getExportData = () => {
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

    exportCSV = () => {
        const exportData = this.getExportData()
        downloadCSV(exportData.data, exportData.header)
    }

    render = (): JSX.Element => {
        const props = this.props,
        { filter, activeFilterKey, activeFilter } = this.state,
        ajdustData = props.data.map(d => {
            let temp = {...d}

            props.columns.forEach(c => {
                temp[c.field] = this.getColumnDataType(c, d)
            })

            return temp
        }),
        data = activeFilterKey === "" ? ajdustData : ajdustData.filter(d => d[activeFilterKey].toLowerCase().indexOf(filter[activeFilterKey].toLowerCase()) >= 0)
 
        return <div className={"dolfo-table-content" + (props.className ? (" " + props.className) : "")}>
            <table className="dolfo-table">

                {
                    data.length > 0 && props.exportable && <thead className="dolfo-table-actions">
                        <tr>
                            <td colSpan={props.columns.length}>
                                {
                                    props.exportable && (!props.exportFormat || props.exportFormat.includes("csv")) && <Button textBtn btnColor="green" tooltip={Constants.EXPORT_CSV_TEXT} onClick={this.exportCSV}>
                                        <Icon iconKey="file-csv" className="fa-2x" />
                                    </Button>
                                }
                            </td>
                        </tr>
                    </thead>
                }

                <thead>
                    <tr>
                        {
                            props.columns.map(col => <th style={{ width: col.width, textAlign: col.align }}>
                                {col.type === "check" && <CheckBox tooltip={typeof col.checkTooltip === "string" ? col.checkTooltip : null} checked={col.checked} onChange={col.onCheckAll} />}
 
                                {col.canSearch && <Icon iconKey="filter" className="dolfo-column-search-icon" tooltip={Constants.FILTER_TEXT} onClick={() => this.changeActiveFiler(col.field)} />}

                                {col.label}

                                {col.canSearch && activeFilter === col.field && <input type="text" value={filter[col.searchField || col.field]} onChange={(e) => this.changeFilter(col.searchField || col.field, e.target.value)} className="dolfo-column-search-input" onBlur={this.blurSearch} autoFocus placeholder={Constants.SEARCH_PLACEHOLDER} />}
                            </th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        data.length ? data.map(d => {
                            return <tr style={d.rowStyle} onDoubleClick={d.onDoubleClick}>
                                {
                                    props.columns.map(col => <td style={{ textAlign: col.align }} data-tooltip={col.tooltip && typeof d[col.field] === "string" ? d[col.field] : null} data-place={col.placeTooltip}>
                                        {
                                            d[col.field]
                                        }
                                    </td>)
                                }
                            </tr>
                        }) : <tr>
                            <td className="dolfo-table-noresults" colSpan={props.columns.length}>Nessun risultato</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    } 
}
