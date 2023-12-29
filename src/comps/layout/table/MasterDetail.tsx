import _ from "lodash"
import React from "react"
import { getConstant } from "../../shared/Constants"
import { IDataColumn } from "../../shared/models/IColumn"
import Button from "../Button"
import { DetailIcon, Icon } from "../Icon"
import { Tooltip } from "../Tooltip"
import { BaseResultsState, ResultsView, ResultViewProps, ViewType } from "./ResultsView"

export interface MasterDetailProps extends ResultViewProps{
    readonly actions?: (dataItem: IDataColumn) => React.ReactNode
    readonly getDetailTitle: (item: any, isBreadcrumb?: boolean) => string | React.ReactNode
    readonly onOpenDetail?: (item: any) => void
}

export interface MasterDetailState extends BaseResultsState{
    readonly selectedItem: any
}

export class MasterDetail<P> extends React.Component<MasterDetailProps & P, MasterDetailState>{
    constructor(props: P & MasterDetailProps){
        super(props)

        this.state = {
            selectedItem: null,
            layoutType: props.layoutType || "grid"
        }
    }

    componentDidUpdate(prevProps: MasterDetailProps, _: MasterDetailState): void {
        if(this.props.layoutType !== prevProps.layoutType)
            this.setState({ layoutType: this.props.layoutType })
    }
    
    resetSelection(): void {
        this.setState({ selectedItem: null })
        this.props.onOpenDetail && this.props.onOpenDetail(null)
    }

    toggleViewMode = (layoutType: ViewType) => this.setState({ layoutType }, () => this.props.onToggleViewMode && this.props.onToggleViewMode(layoutType))

    clearData = (d: IDataColumn): IDataColumn => {
        const { columns } = this.props,
        excludeCols = columns.filter(c => React.isValidElement(d[c.field])).map(c => c.field),
        data = _.omit(d, excludeCols)

        return data
    }

    clearAllData = (data: IDataColumn[]): IDataColumn[] => data.map(d => this.clearData(d))

    render(children = this.props.children): React.ReactNode {
        const { columns, data, onOpenDetail, getDetailTitle, actions, getTitle, className, exportFormat, exportable, style, hideToggleButton } = this.props,
        { selectedItem, layoutType } = this.state,
        cols = columns.concat({ field: "actions", label: getConstant("TREE_TABLE_ACTIONS_LABEL"), align: "center", exportable: false }),
        colData = data.map(v => {
            const dataItemToSelect = this.clearData(v)

            const tmp: IDataColumn = {
                ...v,
                onDoubleClick: () => {
                    this.setState({ selectedItem: dataItemToSelect })
                    onOpenDetail && onOpenDetail(dataItemToSelect)
                },
                actions: <>
                    <Tooltip tooltip={getConstant("OPEN_DETAIL")}>
                        <Button onClick={() => tmp.onDoubleClick()} btnColor="blue" type="text">
                            <DetailIcon large />
                        </Button>
                    </Tooltip>

                    {actions && actions(v)}
                </>
            }

            return tmp
        })

        return <div className="dolfo-master-detail">
            {
                !selectedItem ? <div className="master-detail-results">
                    <ResultsView data={colData} columns={cols} getTitle={getTitle} onToggleViewMode={this.toggleViewMode} layoutType={layoutType} className={className} style={style} exportFormat={exportFormat} exportable={exportable} hideToggleButton={hideToggleButton} />
                </div> : <div className="dolfo-detail">
                    <div className="dolfo-detail-header">
                        <Tooltip tooltip={getConstant("BACK_TO_LIST")}>
                            <Button btnColor="white" circleBtn onClick={() => this.resetSelection()}>
                                <Icon iconKey="arrow-left" type="far" />
                            </Button>
                        </Tooltip>
                        <div className="dolfo-detail-separator"></div>
                        <h2>{getDetailTitle(selectedItem)}</h2>
                    </div>
                    <div className="dolfo-detail-content">{children}</div>
                </div>
            }
        </div>
    }
}