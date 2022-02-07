import React from "react"
import { BaseInputProps } from "../shared/models/InputProps"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import _ from "lodash"

export interface TransferListProps extends BaseInputProps{
    readonly list: any[]
    readonly getLabel: (item: any) => string
    readonly getKey: (item: any) => any
    readonly defaultValue?: any[]
    readonly canFilter?: boolean
    readonly allowTransferAll?: boolean
}

interface IState{
    readonly selectedItems: any[]
    readonly filterLeft: string
    readonly filterRight: string
    readonly focusedKey: any
}

export class TransferList extends React.Component<TransferListProps, IState>{
    constructor(props: TransferListProps){
        super(props)

        this.state = {
            selectedItems: props.defaultValue || [],
            filterLeft: "",
            filterRight: "",
            focusedKey: null
        }
    }

    componentDidUpdate = (prevProps: TransferListProps): void => {
        if(!_.isEqual(prevProps.list, this.props.list))
            this.setState({ selectedItems: [], focusedKey: null, filterLeft: "", filterRight: "" })
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.setState({ selectedItems: this.props.defaultValue, focusedKey: null })
    }

    focusItem = (item: any): void => {
        if(this.props.disabled) return

        this.setState({ focusedKey: this.props.getKey(item) })
    }

    transferItem = (item: any): void => {
        if(this.props.disabled) return

        const { selectedItems } = this.state,
        { getKey, onChange } = this.props,
        newList = selectedItems.some(v => getKey(v) === getKey(item)) ? selectedItems.filter(v => getKey(v) !== getKey(item)) : selectedItems.concat(item)

        this.setState({ selectedItems: newList })

        onChange && onChange(newList)
    }

    transferAll = (): void => this.setState({ selectedItems: this.props.list })

    untransferAll = (): void => this.setState({ selectedItems: [] })

    changeFilterLeft = (e: any): void => this.setState({ filterLeft: e.target.value })

    changeFilterRight = (e: any): void => this.setState({ filterRight: e.target.value })

    selectByFocused = (): void => {
        const { focusedKey } = this.state,
        { list, getKey } = this.props

        this.transferItem(list.find(v => getKey(v) === focusedKey))

        this.setState({ focusedKey: null })
    }

    filterList = (list: any[], filter: string) => list.filter(v => {
        const label = this.props.getLabel(v).toLowerCase()

        return !filter?.trim() || label.indexOf(filter.toLocaleLowerCase()) >= 0
    })

    render = (): JSX.Element => {
        const { selectedItems, focusedKey, filterLeft, filterRight } = this.state,
        { props } = this,
        selectedKeys = selectedItems.map(v => props.getKey(v)),
        unselected = this.filterList(props.list.filter(v => !selectedKeys.includes(props.getKey(v))), filterLeft),
        selected = this.filterList(selectedItems, filterRight)

        return <div className={"dolfo-transfer-list" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.label && <label className="dolfo-transfer-list-label">
                {props.label}
                {props.required && <span className="dolfo-input-required" data-tooltip={Constants.REQUIRED_FIELD}> *</span>}  
            </label>}

            <input value={selectedKeys.join(", ")} required={props.required} />

            <div className="dolfo-transfer-from">
                {props.canFilter && <div className="filter">
                    <input type="text" onChange={this.changeFilterLeft} placeholder={Constants.TRANSFER_FILTER_TEXT} />
                </div>}
                <div className="dolfo-transfer-list-items">
                    {
                        unselected.map(item => <div className={"dolfo-transfer-item" + (focusedKey === props.getKey(item) ? " focused" : "")} onDoubleClick={() => this.transferItem(item)} onClick={() => this.focusItem(item)}>
                            {props.getLabel(item)}
                        </div>)
                    }
                </div>
            </div>
            <div className="dolfo-transfer-buttons">
                {props.allowTransferAll && <Button size="small" btnColor="darkblue" disabled={props.list.every(d => selectedKeys.includes(props.getKey(d)))} onClick={this.transferAll} tooltip={Constants.TRANSFER_ALL_TEXT}>
                    <Icon iconKey="chevron-double-right" type="far" />
                </Button>}

                <Button size="small" btnColor="darkblue" disabled={focusedKey === null || selectedKeys.includes(focusedKey)} onClick={this.selectByFocused} tooltip={Constants.TRANSFER_TEXT}>
                    <Icon iconKey="arrow-right" type="far" />
                </Button>

                <Button size="small" btnColor="darkblue" disabled={focusedKey === null || !selectedKeys.includes(focusedKey)} onClick={this.selectByFocused} tooltip={Constants.TRANSFER_TEXT}>
                    <Icon iconKey="arrow-left" type="far" />
                </Button>

                {props.allowTransferAll && <Button size="small" btnColor="darkblue" disabled={!selectedKeys.length} onClick={this.untransferAll} tooltip={Constants.TRANSFER_ALL_TEXT}>
                    <Icon iconKey="chevron-double-left" type="far" />
                </Button>}
            </div>
            <div className="dolfo-transfer-to">
                {props.canFilter && <div className="filter">
                    <input type="text" onChange={this.changeFilterRight} placeholder={Constants.TRANSFER_FILTER_TEXT} />
                </div>}

                <div className="dolfo-transfer-list-items">
                    {
                        selected.map(item => <div className={"dolfo-transfer-item" + (focusedKey === props.getKey(item) ? " focused" : "")} onDoubleClick={() => this.transferItem(item)} onClick={() => this.focusItem(item)}>
                            {props.getLabel(item)}
                        </div>)
                    }
                </div>
            </div>
        </div>
    }
}