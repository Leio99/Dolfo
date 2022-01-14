import React from "react"
import { Constants } from "../shared/Constants"
import { IDataColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { DetailIcon, Icon } from "./Icon"
import { ResultsView, ResultViewProps, ViewType } from "./ResultsView"

interface IProps extends ResultViewProps{
    readonly actions?: (dataItem: IDataColumn) => JSX.Element
    readonly getDetailTitle: (item: any) => string | JSX.Element
    readonly onOpenDetail?: (item: any) => void
}

interface IState{
    readonly selectedItem: any
    readonly layoutType: ViewType
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

    toggleViewMode = (layoutType: ViewType) => this.setState({ layoutType }, () => this.props.onToggleViewMode && this.props.onToggleViewMode(layoutType))

    render = (): JSX.Element => {
        const { columns, data, onOpenDetail, children, getDetailTitle, actions, getTitle } = this.props,
        { selectedItem, layoutType } = this.state,
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
                    <ResultsView data={colData} columns={cols} getTitle={getTitle} onToggleViewMode={this.toggleViewMode} layoutType={layoutType} />
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