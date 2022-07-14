import React from "react"
import { Constants } from "../../shared/Constants"
import { IDataColumn } from "../../shared/models/IColumn"
import { Card, CardActions } from "../Card"
import { Tooltip } from "../Tooltip"
import { BaseResultsManager } from "./BaseResultsManager"

export interface CardTableProps extends React.PropsWithChildren{
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

                    return <Card className={addClass + checkClass} layout="tab" title={(check || props.getTitle) && <>
                        {check && !d.hideCheck && d[check.field]}
                        {props.getTitle && props.getTitle(d)}
                    </>} onDoubleClick={() => this.onDoubleClick(d)} key={i}>
                        {
                            props.columns.map((col, ii) => !col.hideCard && col.type !== "check" && <Tooltip tooltip={col.tooltip ? d[col.field] : null} placeTooltip={col.placeTooltip} key={ii}>
                                <div style={{ ...d.rowStyle }}>
                                    {col.field !== "actions" ? <div className="key-value">
                                        <strong>
                                            <Tooltip tooltip={col.label}>{col.label}</Tooltip>
                                        </strong>
                                        <div>
                                            {
                                                !React.isValidElement(d[col.field]) ? <Tooltip tooltip={d[col.field]}>{d[col.field]}</Tooltip> : d[col.field]
                                            }
                                        </div>
                                    </div> : <CardActions>{d[col.field]}</CardActions>}
                                </div>
                            </Tooltip>)
                        }
                    </Card>
                }) : <div className="dolfo-card-table-noresults">
                    {Constants.TABLE_NO_RESULTS}
                </div>
            }
        </div>
    } 
}