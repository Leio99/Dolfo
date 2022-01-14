import React from "react"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { DetailIcon, Icon } from "./Icon"
import { Table } from "./Table"
import { CardTable } from "./CardTable"

type MDLayout = "card" | "grid"

interface IProps{
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
    readonly getTitle: (dataItem: IDataColumn) => string | JSX.Element
    readonly layoutType?: MDLayout
    readonly actions?: (dataItem: IDataColumn) => JSX.Element
    readonly getDetailTitle: (item: any) => string | JSX.Element
    readonly onOpenDetail?: (item: any) => void
}

interface IState{
    readonly selectedItem: any
    readonly layoutType: MDLayout
}

export class MasterDetail extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            selectedItem: null,
            layoutType: props.layoutType || "grid"
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(this.props.layoutType !== prevProps.layoutType)
            this.setState({ layoutType: this.props.layoutType })
    }
    
    resetSelection = () => {
        this.setState({ selectedItem: null })
        this.props.onOpenDetail && this.props.onOpenDetail(null)
    }

    toggleLayout = () => this.setState({ layoutType: this.state.layoutType === "grid" ? "card" : "grid" })

    render = (): JSX.Element => {
        const { columns, data, onOpenDetail, children, getDetailTitle, actions, layoutType, getTitle } = this.props,
        { selectedItem, layoutType: stateLayout } = this.state,
        cols = columns.concat({ field: "actions", label: Constants.TREE_TABLE_ACTIONS_LABEL, align: "center" }),
        colData = data.map(v => {
            const tmp: IDataColumn = {
                ...v,
                onDoubleClick: () => {
                    this.setState({ selectedItem: v })
                    onOpenDetail && onOpenDetail(v)
                },
                actions: <>
                    <Button onClick={() => tmp.onDoubleClick()} btnColor="blue" type="text" tooltip={Constants.OPEN_DETAIL}>
                        <DetailIcon large />
                    </Button>

                    {actions && actions(v)}
                </>
            }

            return tmp
        })

        return <div className="dolfo-master-detail">
            {
                !selectedItem ? <div className="master-detail-results">
                    {
                        !layoutType && <div className="master-detail-toggler">
                            {stateLayout === "grid" ? <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout} tooltip={Constants.SWITCH_TO_CARD_LAYOUT}>
                                <Icon iconKey="credit-card-blank" />  
                            </Button> : <Button btnColor="black" type="text" size="big" onClick={this.toggleLayout} tooltip={Constants.SWITCH_TO_GRID_LAYOUT}>
                                <Icon iconKey="table" />  
                            </Button>}
                        </div>
                    }
                    {
                        stateLayout === "grid" ? <Table columns={cols} data={colData} /> : <CardTable getTitle={getTitle} columns={cols} data={colData} />
                    }
                </div> : <div className="dolfo-detail">
                    <div className="dolfo-detail-header">
                        <Button btnColor="white" circleBtn onClick={this.resetSelection} tooltip={Constants.BACK_TO_LIST}>
                            <Icon iconKey="arrow-left" type="far" />
                        </Button>
                        <div className="dolfo-detail-separator"></div>
                        <h2>{getDetailTitle(selectedItem)}</h2>
                    </div>
                    <div className="dolfo-detail-content">{children}</div>
                </div>
            }
        </div>
    }
}