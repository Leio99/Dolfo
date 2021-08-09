import React from "react"
import { Constants } from "../shared/Constants"
import { IColumn, IDataColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { DetailIcon, Icon } from "./Icon"
import { Table } from "./Table"

interface IProps{
    readonly columns: IColumn[]
    readonly data: IDataColumn[]
    readonly getDetailTitle: (item: any) => string | JSX.Element
    readonly onOpenDetail?: (item: any) => void
}

interface IState{
    readonly selectedItem: any
}

export class MasterDetail extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            selectedItem: null
        }
    }

    render = (): JSX.Element => {
        const { columns, data, onOpenDetail, children, getDetailTitle } = this.props,
        { selectedItem } = this.state

        return <div className="dolfo-master-detail">
            {
                !selectedItem ? <Table columns={
                    columns.concat({ field: "actions", label: Constants.TREE_TABLE_ACTIONS_LABEL })
                } data={data.map(v => {
                    const tmp: IDataColumn = {
                        ...v,
                        onDoubleClick: () => {
                            this.setState({ selectedItem: v })
                            onOpenDetail && onOpenDetail(v)
                        },
                        actions: <Button onClick={() => tmp.onDoubleClick()} btnColor="darkblue" textBtn tooltip={Constants.OPEN_DETAIL}>
                            <DetailIcon large />
                        </Button>
                    }

                    return tmp
                })} /> : <div className="dolfo-detail">
                    <div className="dolfo-detail-header">
                        <Button btnColor="white" bigBtn circleBtn onClick={() => this.setState({ selectedItem: null })} tooltip={Constants.BACK_TO_LIST}>
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