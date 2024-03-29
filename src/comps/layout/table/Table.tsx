import _ from "lodash"
import React from "react"
import { CheckBox } from "../../form/CheckBox"
import { getConstant } from "../../shared/Constants"
import { EventManager, addToRegister, unregisterAll } from "../../shared/models/EventManager"
import Button from "../Button"
import { Icon } from "../Icon"
import { Tooltip } from "../Tooltip"
import { BaseResultsManager, ResultsManagerProps } from "./BaseResultsManager"

interface IState{
    readonly orderIndexes: number[]
}

export class Table extends BaseResultsManager<ResultsManagerProps, IState>{
    private tmpElement: HTMLElement
    private events: EventManager[] = []

    constructor(props: ResultsManagerProps){
        super(props, {
            orderIndexes: props.columns.map((_, i) => i)
        })
    }

    componentDidMount = (): void => {
        addToRegister(this.events, new EventManager("mouseup", this.lookItem))
        addToRegister(this.events, new EventManager("blur", this.lookItem))
    }

    componentWillUnmount = (): void => unregisterAll(this.events)

    componentDidUpdate = (prevProps: ResultsManagerProps) => {
        if(!_.isEqual(prevProps.columns, this.props.columns))
            this.setState({ orderIndexes: this.props.columns.map((_, i) => i) })
    }

    lookItem = (): void => this.tmpElement?.remove()

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

    render = (): React.ReactNode => {
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
                                    props.exportable && (!props.exportFormat || props.exportFormat.includes("csv")) && <Tooltip tooltip={getConstant("EXPORT_CSV_TEXT")}>
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
                                if(col.type === "check")
                                    return
                                
                                (e.target as HTMLElement).classList.remove("dropping")
                                this.shiftColumn(moving, i)
                                moving = null
                                this.lookItem()
                                this.tmpElement = null
                            }} onMouseDown={e => {
                                if(col.type === "check")
                                    return
                                
                                e.preventDefault()
                                const target = e.target as HTMLElement,
                                parent = target.parentElement

                                if(target.classList.contains("dolfo-column-order-icon") || target.classList.contains("dolfo-column-search-icon"))
                                    return

                                this.tmpElement = target.cloneNode(true) as HTMLElement
                                this.tmpElement.classList.add("shifter")
                                this.tmpElement.style.left = e.clientX + "px"
                                this.tmpElement.style.top = parent.getBoundingClientRect().top + "px"
                                parent.after(this.tmpElement)
                                moving = i
                            }} onMouseOver={e => {
                                if(moving != null && moving !== i && col.type !== "check")
                                    (e.target as HTMLElement).classList.add("dropping")
                            }} onMouseLeave={e => (e.target as HTMLElement).classList.remove("dropping")}>
                                {col.type === "check" && <Tooltip tooltip={col.checkTooltip}>
                                    <CheckBox checked={col.checked} onChange={col.onCheckAll} disabled={col.checkDisabled} />
                                </Tooltip>}
 
                                {col.canSearch && <Tooltip tooltip={getConstant("FILTER_TEXT")}>
                                    <Icon iconKey="filter" className="dolfo-column-search-icon" onClick={() => this.changeActiveFiler(col.field)} />
                                </Tooltip>}
 
                                {col.orderable && <Tooltip tooltip={this.orderHasKey(col.orderKey || col.field) ? this.getOrderKeyType(col.orderKey || col.field) === "asc" ? getConstant("ORDER_ASCENDING") : getConstant("ORDER_DESCENDING") : getConstant("COLUMN_ORDER")}>
                                    <Icon iconKey={this.orderHasKey(col.orderKey || col.field) ? this.getOrderKeyType(col.orderKey || col.field) === "asc" ? "arrow-down" : "arrow-up" : "sort"} className="dolfo-column-order-icon" onClick={() => this.toggleOrder(col.orderKey || col.field)} />
                                </Tooltip>}

                                {col.type !== "check" && col.label}

                                {col.canSearch && activeFilter === col.field && <input type="text" onChange={e => this.changeFilter(col.searchField || col.field, e.target.value)} className="dolfo-column-search-input" onBlur={this.blurSearch} autoFocus placeholder={getConstant("SEARCH_PLACEHOLDER")} />}
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
                                {getConstant("TABLE_NO_RESULTS")}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    } 
}