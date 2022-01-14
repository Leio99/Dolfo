import React from "react"
import { Constants } from "../shared/Constants"
import { ResultsManager } from "./ResultsManager"
import { IDataColumn } from "../shared/models/IColumn"
import { Card } from "./Card"

interface IProps{
    readonly getTitle: (item: IDataColumn) => string | JSX.Element
}

export class CardTable extends ResultsManager<IProps>{
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

                    return <Card className={addClass} tabLayout title={props.getTitle(d)} onDoubleClick={() => this.onDoubleClick(d)}>
                        {
                            props.columns.map(col => <div style={{ ...rowStyle, ...d.rowStyle, textAlign: col.align }} data-tooltip={col.tooltip && typeof d[col.field] === "string" ? d[col.field] : null} data-place={col.placeTooltip}>
                                {
                                    d[col.field]
                                }
                            </div>)
                        }
                    </Card>
                }) : <div className="dolfo-table-noresults">
                    {Constants.TABLE_NO_RESULTS}
                </div>
            }
        </div>
    } 
}