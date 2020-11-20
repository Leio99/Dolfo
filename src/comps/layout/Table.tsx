import React from "react"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import { Icon } from "./Icon"

export interface IProps{
    readonly columns: IColumn[],
    readonly data: IDataColumn[]
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

    render = (): JSX.Element => {
        const props = this.props,
        { filter, activeFilterKey, activeFilter } = this.state,
        data = activeFilterKey === "" ? props.data : props.data.filter(d => d[activeFilterKey].toLowerCase().indexOf(filter[activeFilterKey].toLowerCase()) >= 0)
 
        return <div className="dolfo-table-content">
            <table className="dolfo-table">
                <thead>
                    <tr>
                        {
                            props.columns.map(col => <th style={{ width: col.width, textAlign: col.align }}>
                                {col.canSearch && <Icon iconKey="filter" className="dolfo-column-search-icon" onClick={() => this.changeActiveFiler(col.field)} />}

                                {col.label}

                                {col.canSearch && activeFilter === col.field && <input type="text" value={filter[col.field]} onChange={(e) => this.changeFilter(col.field, e.target.value)} className="dolfo-column-search-input" onBlur={this.blurSearch} autoFocus placeholder={Constants.SEARCH_PLACEHOLDER} />}
                            </th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        data.length ? data.map(d => {
                            return <tr style={d.rowStyle} onDoubleClick={d.onDoubleClick}>
                                {
                                    props.columns.map(col => <td style={{ textAlign: col.align }}>
                                        {d[col.field]}
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