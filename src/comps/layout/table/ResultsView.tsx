import React from "react"
import { Constants } from "../../shared/Constants"
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
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
    readonly layoutType?: ViewType
    readonly hideToggleButton?: boolean
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

    render = (): JSX.Element => {
        const { hideToggleButton, columns, data, getTitle, exportFormat, exportable } = this.props,
        { layoutType } = this.state

        return <>
            {
                !hideToggleButton && <div className="results-view-toggler">
                    {layoutType === "grid" ? <Tooltip tooltip={Constants.SWITCH_TO_CARD_LAYOUT}>
                        <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout}>
                            <Icon iconKey="credit-card-blank" />  
                        </Button>
                    </Tooltip> : <Tooltip tooltip={Constants.SWITCH_TO_GRID_LAYOUT}>
                        <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout}>
                            <Icon iconKey="table" type="far" />  
                        </Button>
                    </Tooltip>}
                </div>
            }
            {
                exportable && (!exportFormat || exportFormat.includes("csv")) && <Tooltip tooltip={Constants.EXPORT_CSV_TEXT}>
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