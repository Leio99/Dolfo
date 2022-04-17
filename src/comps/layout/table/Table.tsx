import React from "react"
import { CheckBox } from "../../form/CheckBox"
import { Constants } from "../../shared/Constants"
import Button from "../Button"
import { Icon } from "../Icon"
import { Tooltip } from "../Tooltip"
import { BaseResultsManager } from "./BaseResultsManager"

export class Table extends BaseResultsManager{
    render = (): JSX.Element => {
        const { props } = this,
        { filter, activeFilter } = this.state,
        data = this.getFilteredData()
 
        return <div className={"dolfo-table-content" + (props.className ? (" " + props.className) : "")}>
            <table className="dolfo-table" style={props.style}>

                {
                    data.length > 0 && props.exportable && <thead className="dolfo-table-actions">
                        <tr>
                            <td colSpan={props.columns.length}>
                                {
                                    props.exportable && (!props.exportFormat || props.exportFormat.includes("csv")) && <Tooltip tooltip={Constants.EXPORT_CSV_TEXT}>
                                        <Button type="text" btnColor="green" onClick={this.exportCSV}>
                                            <Icon iconKey="file-csv" className="fa-2x" />
                                        </Button>
                                    </Tooltip>
                                }
                            </td>
                        </tr>
                    </thead>
                }

                <thead>
                    <tr>
                        {
                            props.columns.map(col => <th style={{ width: col.width, textAlign: col.align }}>
                                {col.type === "check" && <Tooltip tooltip={col.checkTooltip}>
                                    <CheckBox checked={col.checked} onChange={col.onCheckAll} />
                                </Tooltip>}
 
                                {col.canSearch && <Tooltip tooltip={Constants.FILTER_TEXT}>
                                    <Icon iconKey="filter" className="dolfo-column-search-icon" onClick={() => this.changeActiveFiler(col.field)} />
                                </Tooltip>}

                                {col.type !== "check" && col.label}

                                {col.canSearch && activeFilter === col.field && <input type="text" value={filter[col.searchField || col.field]} onChange={e => this.changeFilter(col.searchField || col.field, e.target.value)} className="dolfo-column-search-input" onBlur={this.blurSearch} autoFocus placeholder={Constants.SEARCH_PLACEHOLDER} />}
                            </th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        data.length ? data.map(d => {
                            const rowStyle = d.checked ? {
                                backgroundColor: "var(--hoverblue)"
                            } : null

                            return <tr onDoubleClick={() => this.onDoubleClick(d)}>
                                {
                                    props.columns.map(col => <Tooltip tooltip={col.tooltip ? d[col.field] : null} placeTooltip={col.placeTooltip}>
                                            <td style={{ ...rowStyle, ...d.rowStyle, textAlign: col.align }}>
                                            {
                                                d[col.field]
                                            }
                                        </td>
                                    </Tooltip>)
                                }
                            </tr>
                        }) : <tr>
                            <td className="dolfo-table-noresults" colSpan={props.columns.length}>
                                {Constants.TABLE_NO_RESULTS}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    } 
}