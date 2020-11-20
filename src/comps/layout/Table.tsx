import React from "react"
import { IColumn, IDataColumn } from "../shared/models/IColumn"

export interface IProps{
    readonly columns: IColumn[],
    readonly data: IDataColumn[]
}

export class Table extends React.PureComponent<IProps>{
    render = (): JSX.Element => {
        const { columns, data } = this.props

        return <table className="dolfo-table">
            <thead>
                <tr>
                    {
                        columns.map(col => <th style={{ width: col.width, textAlign: col.align }}>
                            {col.label}
                        </th>)
                    }
                </tr>
            </thead>

            <tbody>
                {
                    data.length ? data.map(d => {
                        return <tr style={d.rowStyle} onDoubleClick={d.onDoubleClick}>
                            {
                                columns.map(col => <td style={{ textAlign: col.align }}>
                                    {d[col.field]}
                                </td>)
                            }
                        </tr>
                    }) : <tr>
                        <td className="dolfo-table-noresults" colSpan={columns.length}>Nessun risultato</td>
                    </tr>
                }
            </tbody>
        </table>
    } 
}