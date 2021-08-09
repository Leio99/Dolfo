import React from "react"
import { Constants } from "../shared/Constants"
import { IColumn } from "../shared/models/IColumn"
import Button from "./Button"
import { Icon } from "./Icon"
import _ from "lodash"

export interface TreeNode{
    readonly type: string
    readonly data: any
    readonly onDoubleClick?: (node: TreeNode) => void
}

interface IState{
    readonly list: any[]
    readonly autoOpen?: boolean
    readonly showExpandAll?: boolean
    readonly descColumn?: string
    readonly addColumn?: IColumn[]
    readonly [x: string]: any
}

interface InternalState{
    readonly level: {
        [x: string]: boolean
    }
    readonly showActions: boolean
}

export abstract class TreeView<P = any> extends React.PureComponent<P, InternalState & IState>{
    constructor(state: IState, props?: P){
        super(props)

        this.state = {
            ...state,
            level: state.list ? state.autoOpen ? this.autoExpandAll(state.list) : {} : {},
            showActions: false
        }
    }

    onUpdate = (__: P, prevState: IState) => {
        if(!_.isEqual(prevState.list, this.state.list))
            this.setState({ level: this.state.autoOpen ? this.autoExpandAll() : {} })
    }

    componentDidUpdate = this.onUpdate

    abstract getData: (node: TreeNode) => TreeNode[]

    abstract getLabel: (node: TreeNode) => string

    abstract hasChildren: (node: TreeNode) => boolean

    protected getActions = (node: TreeNode): JSX.Element => null

    protected onDoubleClick: (node: TreeNode) => void

    protected getColumnData = (column: IColumn, node: TreeNode): JSX.Element => null 

    toggleNode = (node: TreeNode, index: string) => {
        if(!this.hasChildren(node)) return

        let level = {
            ...this.state.level,
            [index] : !this.state.level[index]
        }

        this.setState({ level })
    }

    toggleAllNode = (node: TreeNode, index: string) => {
        let newLevel = {}

        this.getNodeKeys(node, newLevel, index, !this.state.level[index])

        this.setState({ level: {
            ...this.state.level,
            ...newLevel
        } })
    }

    getNodeKeys = (node: TreeNode, newLevel: { [x: string]: boolean }, index: string, prevOpened: boolean) => {
        newLevel[index] = prevOpened

        if(this.hasChildren(node))
            this.getData(node).forEach((n, i) => this.getNodeKeys(n, newLevel, index + "-" + i, prevOpened))
    }

    renderNode = (node: TreeNode, treeList: JSX.Element[], id: string, prevOpened: boolean, autoExpand: string[] = null) => {
        const hasChildren = this.hasChildren(node),
        { level } = this.state,
        isOpened = level[id]

        if(prevOpened)
            treeList.push(this.getRender(node, id, prevOpened && isOpened))

        if(this.getActions(node))
            this.setState({ showActions: true })

        if(hasChildren){
            this.getData(node).forEach((data, i) => {
                const doAutoExpand = autoExpand && this.hasChildren(data)

                if(doAutoExpand)
                    autoExpand.push(id + "-" + i)
                
                this.renderNode(data, treeList, id + "-" + i, isOpened && prevOpened, autoExpand)
            })
        }
    }

    getRender = (node: TreeNode, index: string, prevOpened: boolean) => {
        const hasChildren = this.hasChildren(node),
        { level, showActions, addColumn } = this.state,
        isOpened = level[index] && prevOpened && hasChildren,
        subNode = index.split("-").length - 1

        return <tr key={index} onDoubleClick={() => this.onDoubleClick && this.onDoubleClick(node)}>
            <td>
                <span style={{ paddingLeft: (25 * subNode) + (hasChildren ? 0 : subNode === 0 ? 0 : 25) }}></span>
                {
                    hasChildren ? <Button btnColor="black" textBtn onClick={() => this.toggleNode(node, index)} tooltip={isOpened ? Constants.TREE_CLOSE_NODE : Constants.TREE_OPEN_NODE}>
                        <Icon iconKey={isOpened ? "chevron-down" : "chevron-right"} type="far" className="mr-2" />
                    </Button> : null
                }

                <Button btnColor={isOpened ? "orange" : hasChildren ? "orange" : "black"} textBtn onClick={() => this.toggleAllNode(node, index)} tooltip={isOpened ? Constants.TREE_COLLAPSE_ALL_NODE : hasChildren ? Constants.TREE_EXPAND_ALL_NODE : null}>
                    <Icon iconKey={isOpened ? "folder-open" : hasChildren ? "folder" : "file-alt"} className="mr-2" large />
                </Button> {this.getLabel(node)}
            </td>

            {
                addColumn && addColumn.map(c => <td style={{ textAlign: c.align}}>
                    {this.getColumnData(c, node)}
                </td>)
            }

            {
                this.getActions(node) ? <td>
                    {this.getActions(node)}
                </td> : showActions ? <td></td> : null
            }
        </tr>
    }

    autoExpandAll = (list: any[] = this.state.list) => {
        let obj: { [x: string]: boolean } = {}

        list.forEach((l, i) => {
            const node = { type: "root", data: l },
            allList = []

            if(this.hasChildren(node))
                allList.push(i.toString())

            this.renderNode(node, [], i.toString(), true, allList)
            
            allList.forEach(i => obj[i] = true)
        })

        return obj
    }

    toggleAllNodes = () => this.setState({ level: this.autoExpandAll() })

    collapseAllNodes = () => this.setState({ level: {} })

    renderTree = (): JSX.Element => {
        const { list, showActions, showExpandAll, descColumn, addColumn } = this.state,
        baseSpan = addColumn?.length || 0

        return <div className="dolfo-table-content">
            <table className="dolfo-table">
                {
                    showExpandAll && <thead className="dolfo-table-actions">
                        <tr>
                            <td colSpan={showActions ? baseSpan + 2 : baseSpan + 1}>
                                <Button btnColor="white" tooltip={Constants.TREE_EXPAND_ALL_NODES} onClick={this.toggleAllNodes} className="mr-2">
                                    <Icon iconKey="expand-alt" />
                                </Button>
                                <Button btnColor="white" tooltip={Constants.TREE_COLLAPSE_ALL_NODES} onClick={this.collapseAllNodes}>
                                    <Icon iconKey="compress-alt" />
                                </Button>
                            </td>
                        </tr>
                    </thead>
                }

                <thead>
                    <tr>
                        <th>{descColumn || Constants.TREE_TABLE_DESCRIPTION_LABEL}</th>
                        {addColumn && addColumn.map(c => <th style={{ width: c.width, textAlign: c.align }}>
                            {c.label}
                        </th>)}
                        {showActions && <th style={{ width: "20%" }}>{Constants.TREE_TABLE_ACTIONS_LABEL}</th>}
                    </tr>
                </thead>

                <tbody>
                    {
                        list && list.length ? list.map((l, i) => {
                            const node = { type: "root", data: l },
                            treeList: JSX.Element[] = []
                            
                            this.renderNode(node, treeList, i.toString(), true)

                            return treeList
                        }) : <tr>
                            <td className="dolfo-table-noresults" colSpan={baseSpan + 1}>
                                {Constants.TABLE_NO_RESULTS}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    }

    render = this.renderTree
}