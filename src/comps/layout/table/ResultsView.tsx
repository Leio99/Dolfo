import React from "react"
import { getConstant } from "../../shared/Constants"
import { IColumn, IDataColumn } from "../../shared/models/IColumn"
import Button from "../Button"
import { Icon } from "../Icon"
import { Tooltip } from "../Tooltip"
import { BaseExportableManager } from "./BaseExportableManager"
import { ResultsManagerProps } from "./BaseResultsManager"
import { CardTable, CardTableProps } from "./CardTable"
import { Table } from "./Table"

export type ViewType = "grid" | "card"

export interface ResultViewProps extends CardTableProps, ResultsManagerProps{
    /** The columns of the table
     * @type IColumn[]
     * @required
     */
    readonly columns: IColumn[]
    /** The datasource
     * @type IDataColumn[]
     * @required
     */
    readonly data: IDataColumn[]
    /** Defines the layout type
     * @type ViewType
     * @default "grid"
     */
    readonly layoutType?: ViewType
    /** Hides the button that toggles the layout type
     * @type boolean
     */
    readonly hideToggleButton?: boolean
    /** Function triggered when the layout type changes
     * @type Function
     * @param viewMode ViewType
     */
    readonly onToggleViewMode?: (viewMode: ViewType) => void
}

export interface BaseResultsState{
    readonly layoutType: ViewType
}

export class ResultsView extends BaseExportableManager<ResultViewProps, BaseResultsState>{
    constructor(props: ResultViewProps){
        super(props)

        this.state = {
            layoutType: props.layoutType || "grid"
        }
    }

    componentDidUpdate = (prevProps: ResultViewProps) => {
        if(this.props.layoutType !== prevProps.layoutType)
            this.setState({ layoutType: this.props.layoutType })
    }

    toggleLayout = () => {
        this.setState({
            layoutType: this.state.layoutType === "grid" ? "card" : "grid"
        }, () => this.props.onToggleViewMode && this.props.onToggleViewMode(this.state.layoutType))
    }

    render = (): React.ReactNode => {
        const { hideToggleButton, columns, data, getTitle, exportFormat, exportable } = this.props,
        { layoutType } = this.state

        return <>
            {
                !hideToggleButton && <div className="results-view-toggler">
                    {layoutType === "grid" ? <Tooltip tooltip={getConstant("SWITCH_TO_CARD_LAYOUT")}>
                        <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout}>
                            <Icon iconKey="credit-card-blank" />  
                        </Button>
                    </Tooltip> : <Tooltip tooltip={getConstant("SWITCH_TO_GRID_LAYOUT")}>
                        <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout}>
                            <Icon iconKey="table" type="far" />  
                        </Button>
                    </Tooltip>}
                </div>
            }
            {
                exportable && (!exportFormat || exportFormat.includes("csv")) && <Tooltip tooltip={getConstant("EXPORT_CSV_TEXT")}>
                    <Button size="big" type="text" btnColor="green" onClick={this.exportCSV}>
                        <Icon iconKey="file-csv" />
                    </Button>
                </Tooltip>
            }
            {
                layoutType === "grid" ? <Table columns={columns} data={data} /> : <CardTable getTitle={getTitle} columns={columns} data={data} />
            }
        </>
    }
}