import React from "react"
import { BaseInputProps } from "../shared/models/InputProps"
import Button from "../layout/Button"
import { Icon } from "../layout/Icon"
import { getConstant } from "../shared/Constants"
import _ from "lodash"
import { Tooltip } from "../layout/Tooltip"

export interface TransferListProps extends BaseInputProps{
    /** The list of items
     * @type any[]
     * @required
     */
    readonly list: any[]
    /** Function to get the label of each item
     * @type Function
     * @param item The single item
     * @returns string
     * @required
     */
    readonly getLabel: (item: any) => string
    /** Functin to get the primary key of each item
     * @type Function
     * @param item The single item
     * @returns any
     * @required
     */
    readonly getKey: (item: any) => any
    /** The default selected items
     * @type any[]
     */
    readonly defaultValue?: any[]
    /** Allows lists filtering
     * @type boolean
     */
    readonly canFilter?: boolean
    /** Allows to transfer all items at once
     * @type boolean
     */
    readonly allowTransferAll?: boolean
    /** Defines a title for the left list
     * @type string
     */
    readonly leftListTitle?: string
    /** Defines a title for the right list
     * @type string
     */
    readonly rightListTitle?: string
    /** Function to determine if an item is disabled and not selectable
     * @type Function
     * @param item The single item
     * @returns boolean
     */
    readonly disabledItem?: (item: any) => boolean
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
        if(this.props.disabled || (this.props.disabledItem && this.props.disabledItem(item))) return

        this.setState({ focusedKey: this.props.getKey(item) })
    }

    transferItem = (item: any): void => {
        if(this.props.disabled || (this.props.disabledItem && this.props.disabledItem(item))) return

        const { selectedItems } = this.state,
        { getKey, onChange } = this.props,
        newList = selectedItems.some(v => getKey(v) === getKey(item)) ? selectedItems.filter(v => getKey(v) !== getKey(item)) : selectedItems.concat(item)

        this.setState({ selectedItems: newList })

        onChange && onChange(newList)
    }

    transferAll = (): void => this.setState({ selectedItems: this.props.list })

    untransferAll = (): void => this.setState({ selectedItems: [] })

    changeFilterLeft = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ filterLeft: e.target.value })

    changeFilterRight = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ filterRight: e.target.value })

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

    render = (): React.ReactNode => {
        const { selectedItems, focusedKey, filterLeft, filterRight } = this.state,
        { props } = this,
        selectedKeys = selectedItems.map(v => props.getKey(v)),
        unselected = this.filterList(props.list.filter(v => !selectedKeys.includes(props.getKey(v))), filterLeft),
        selected = this.filterList(selectedItems, filterRight)

        return <div className={"dolfo-transfer-list" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} style={props.style}>
            {props.label && <label className="dolfo-transfer-list-label">
                {props.label}
                {props.required && <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>  
                </Tooltip>}
            </label>}

            <input value={selectedKeys.join(", ")} required={props.required} onChange={() => {}} />

            <div className="dolfo-transfer-from">
                {props.leftListTitle && <label>{props.leftListTitle} ({unselected.length})</label>}
                
                <div className="transfer-content">
                    {props.canFilter && <div className="filter">
                        <input type="text" onChange={this.changeFilterLeft} placeholder={getConstant("TRANSFER_FILTER_TEXT")} />
                    </div>}
                    <div className="dolfo-transfer-list-items">
                        {
                            unselected.length ? unselected.map((item, i) => {
                                const disabled = props.disabledItem && props.disabledItem(item)

                                return <div className={"dolfo-transfer-item" + (focusedKey === props.getKey(item) ? " focused" : "") + (disabled ? " disabled" : "")} onDoubleClick={() => this.transferItem(item)} onClick={() => this.focusItem(item)} key={i}>
                                    {props.getLabel(item)}
                                </div>
                            }) : <div className="dolfo-transfer-no-items">{getConstant("TRANSFER_NO_ITEMS")}</div>
                        }
                    </div>
                </div>
            </div>
            <div className="dolfo-transfer-buttons">
                {props.allowTransferAll && <Tooltip tooltip={getConstant("TRANSFER_ALL_TEXT")}>
                    <Button size="small" btnColor="darkblue" disabled={props.list.every(d => selectedKeys.includes(props.getKey(d)))} onClick={this.transferAll}>
                        <Icon iconKey="chevron-double-right" type="far" />
                    </Button>
                </Tooltip>}

                <Tooltip tooltip={getConstant("TRANSFER_TEXT")}>
                    <Button size="small" btnColor="darkblue" disabled={focusedKey === null || selectedKeys.includes(focusedKey)} onClick={this.selectByFocused}>
                        <Icon iconKey="arrow-right" type="far" />
                    </Button>
                </Tooltip>

                <Tooltip tooltip={getConstant("TRANSFER_TEXT")}>
                    <Button size="small" btnColor="darkblue" disabled={focusedKey === null || !selectedKeys.includes(focusedKey)} onClick={this.selectByFocused}>
                        <Icon iconKey="arrow-left" type="far" />
                    </Button>
                </Tooltip>

                {props.allowTransferAll && <Tooltip tooltip={getConstant("TRANSFER_ALL_TEXT")}>
                    <Button size="small" btnColor="darkblue" disabled={!selectedKeys.length} onClick={this.untransferAll}>
                        <Icon iconKey="chevron-double-left" type="far" />
                    </Button>
                </Tooltip>}
            </div>
            <div className="dolfo-transfer-to">
                {props.rightListTitle && <label>{props.rightListTitle} ({selectedKeys.length})</label>}

                <div className="transfer-content">
                    {props.canFilter && <div className="filter">
                        <input type="text" onChange={this.changeFilterRight} placeholder={getConstant("TRANSFER_FILTER_TEXT")} />
                    </div>}

                    <div className="dolfo-transfer-list-items">
                        {
                            selected.length ? selected.map((item, i) => <div className={"dolfo-transfer-item" + (focusedKey === props.getKey(item) ? " focused" : "")} onDoubleClick={() => this.transferItem(item)} onClick={() => this.focusItem(item)} key={i}>
                                {props.getLabel(item)}
                            </div>) : <div className="dolfo-transfer-no-items">{getConstant("TRANSFER_NO_ITEMS")}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}