import React from "react"
import { Constants } from "../shared/Constants"
import { ResultsManager } from "./ResultsManager"
import { IDataColumn } from "../shared/models/IColumn"
import { Card, CardActions } from "./Card"

export interface CardTableProps{
    readonly getTitle?: (item: IDataColumn) => string | JSX.Element
}

export class CardTable extends ResultsManager<CardTableProps>{
    render = (): JSX.Element => {
        const { props } = this,
        data = props.data.map(d => {
            let temp = {...d}

            props.columns.forEach(c => temp[c.field] = this.getColumnDataType(c, d))

            return temp
        })
 
        return <div className={"dolfo-card-table-content" + (props.className ? (" " + props.className) : "")}>
            {
                data.length ? data.map((d, i) => {
                    const rowStyle = d.checked ? {
                        backgroundColor: "var(--hoverblue)",
                        color: "var(--darkblue)"
                    } : null,
                    addClass = (i - 1) % 3 === 0 ? " middle" : ""

                    return <Card className={addClass} tabLayout title={props.getTitle ? props.getTitle(d) : null} onDoubleClick={() => this.onDoubleClick(d)}>
                        {
                            props.columns.map(col => !col.hideCard && <div style={{ ...rowStyle, ...d.rowStyle }} data-tooltip={col.tooltip && typeof d[col.field] === "string" ? d[col.field] : null} data-place={col.placeTooltip}>
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