import React from "react"
import { Constants } from "../../shared/Constants"
import { IDataColumn } from "../../shared/models/IColumn"
import { Card, CardActions } from "../Card"
import { BaseResultsManager } from "./BaseResultsManager"

export interface CardTableProps{
    readonly getTitle?: (item: IDataColumn) => string | JSX.Element
}

export class CardTable extends BaseResultsManager<CardTableProps>{
    render = (): JSX.Element => {
        const { props } = this,
        data = this.getFilteredData()
 
        return <div className={"dolfo-card-table-content" + (props.className ? (" " + props.className) : "")}>
            {
                data.length ? data.map((d, i) => {
                    const addClass = (i - 1) % 3 === 0 ? "middle" : "",
                    check = props.columns.find(c => c.type === "check"),
                    checkClass = d.checked ? " selected" : ""

                    return <Card className={addClass + checkClass} tabLayout title={(check || props.getTitle) && <>
                        {check && !d.hideCheck && d[check.field]}
                        {props.getTitle && props.getTitle(d)}
                    </>} onDoubleClick={() => this.onDoubleClick(d)}>
                        {
                            props.columns.map(col => !col.hideCard && col.type !== "check" && <div style={{ ...d.rowStyle }} data-tooltip={col.tooltip && typeof d[col.field] === "string" ? d[col.field] : null} data-place={col.placeTooltip}>
                                {col.field !== "actions" ? <div className="key-value">
                                    <strong>{col.label}</strong>
                                    <div>{d[col.field]}</div>
                                </div> : <CardActions>{d[col.field]}</CardActions>}
                            </div>)
                        }
                    </Card>
                }) : <div className="dolfo-card-table-noresults">
                    {Constants.TABLE_NO_RESULTS}
                </div>
            }
        </div>
    } 
}