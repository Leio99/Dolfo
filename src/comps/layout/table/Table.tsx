import _ from "lodash"
import React from "react"
import { CheckBox } from "../../form/CheckBox"
import { Constants } from "../../shared/Constants"
import Button from "../Button"
import { Icon } from "../Icon"
import { Tooltip } from "../Tooltip"
import { BaseResultsManager, ResultsManagerProps } from "./BaseResultsManager"

interface IState{
    readonly orderIndexes: number[]
}

export class Table extends BaseResultsManager<ResultsManagerProps, IState>{
    private tmpElement: HTMLElement

    constructor(props: ResultsManagerProps){
        super(props, {
            orderIndexes: props.columns.map((_, i) => i)
        })
    }

    componentDidMount = () => {
        window.addEventListener("mouseup", this.lookItem)
        window.addEventListener("blur", this.lookItem)
    }

    componentWillUnmount = () => {
        window.removeEventListener("mouseup", this.lookItem)
        window.removeEventListener("blur", this.lookItem)
    }

    componentDidUpdate = (prevProps: ResultsManagerProps) => {
        if(!_.isEqual(prevProps.columns, this.props.columns))
            this.setState({ orderIndexes: this.props.columns.map((_, i) => i) })
    }

    lookItem = () => this.tmpElement?.remove()

    shiftColumn = (from: number, to: number) => {
        if(from === to || from == null || to == null)
            return

        this.setState({
            orderIndexes: this.state.orderIndexes.map((p, i) => {
                if(i === to) return this.state.orderIndexes[from]
                if(i === from) return this.state.orderIndexes[to]

                return p
            })
        })
    }

    render = (): JSX.Element => {
        const { props } = this,
        { activeFilter, orderIndexes } = this.state,
        data = this.getFilteredData(),
        columns = orderIndexes.map(i => props.columns[i])

        let moving: number
 
        return <div className={"dolfo-table-content" + (props.className ? (" " + props.className) : "")}>
            <table className="dolfo-table" style={props.style}>
                {
                    data.length > 0 && props.exportable && <thead className="dolfo-table-actions">
                        <tr>
                            <td colSpan={columns.length}>
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
                    <tr onMouseMove={e => {
                        if(this.tmpElement)
                            this.tmpElement.style.left = e.clientX + "px"
                    }}>
                        {
                            columns.map((col, i) => <th style={{ width: col.width, textAlign: col.align }} key={i} onMouseUp={e => {
                                (e.target as HTMLElement).classList.remove("dropping")
                                this.shiftColumn(moving, i)
                                moving = null
                                this.lookItem()
                                this.tmpElement = null
                            }} onMouseDown={e => {
                                e.preventDefault()
                                const target = e.target as HTMLElement,
                                parent = target.parentElement

                                this.tmpElement = target.cloneNode(true) as HTMLElement
                                this.tmpElement.classList.add("shifter")
                                this.tmpElement.style.left = e.clientX + "px"
                                this.tmpElement.style.top = parent.getBoundingClientRect().top + "px"
                                parent.after(this.tmpElement)
                                moving = i
                            }} onMouseOver={e => {
                                if(moving != null && moving !== i)
                                    (e.target as HTMLElement).classList.add("dropping")
                            }} onMouseLeave={e => (e.target as HTMLElement).classList.remove("dropping")}>
                                {col.type === "check" && <Tooltip tooltip={col.checkTooltip}>
                                    <CheckBox checked={col.checked} onChange={col.onCheckAll} disabled={col.checkDisabled} />
                                </Tooltip>}
 
                                {col.canSearch && <Tooltip tooltip={Constants.FILTER_TEXT}>
                                    <Icon iconKey="filter" className="dolfo-column-search-icon" onClick={() => this.changeActiveFiler(col.field)} />
                                </Tooltip>}

                                {col.type !== "check" && col.label}

                                {col.canSearch && activeFilter === col.field && <input type="text" onChange={e => this.changeFilter(col.searchField || col.field, e.target.value)} className="dolfo-column-search-input" onBlur={this.blurSearch} autoFocus placeholder={Constants.SEARCH_PLACEHOLDER} />}
                            </th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        data.length ? data.map((d, i) => {
                            const rowStyle = d.checked ? {
                                backgroundColor: "var(--hoverblue)"
                            } : null

                            return <tr onDoubleClick={() => this.onDoubleClick(d)} key={i}>
                                {
                                    columns.map((col, ii) => <Tooltip tooltip={col.tooltip ? d[col.field] : null} placeTooltip={col.placeTooltip} key={ii}>
                                            <td style={{ ...rowStyle, ...d.rowStyle, textAlign: col.align }}>
                                            {
                                                d[col.field]
                                            }
                                        </td>
                                    </Tooltip>)
                                }
                            </tr>
                        }) : <tr>
                            <td className="dolfo-table-noresults" colSpan={columns.length}>
                                {Constants.TABLE_NO_RESULTS}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    } 
}