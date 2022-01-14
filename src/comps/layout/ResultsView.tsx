import React from "react"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { CardTable } from "./CardTable"
import { Icon } from "./Icon"
import { Table } from "./Table"

export type ViewType = "grid" | "card"

export interface ResultViewProps{
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
    readonly getTitle: (dataItem: IDataColumn) => string | JSX.Element
    readonly layoutType?: ViewType
    readonly hideToggleButton?: boolean
    readonly onToggleViewMode?: (viewMode: ViewType) => void
}

interface IState{
    readonly layoutType: ViewType
}

export class ResultsView extends React.Component<ResultViewProps, IState>{
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
        const { columns, data, getTitle, hideToggleButton } = this.props,
        { layoutType: stateLayout } = this.state

        return <>
            {
                !hideToggleButton && <div className="master-detail-toggler">
                    {stateLayout === "grid" ? <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout} tooltip={Constants.SWITCH_TO_CARD_LAYOUT}>
                        <Icon iconKey="credit-card-blank" />  
                    </Button> : <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout} tooltip={Constants.SWITCH_TO_GRID_LAYOUT}>
                        <Icon iconKey="table" />  
                    </Button>}
                </div>
            }
            {
                stateLayout === "grid" ? <Table columns={columns} data={data} /> : <CardTable getTitle={getTitle} columns={columns} data={data} />
            }
        </>
    }
}