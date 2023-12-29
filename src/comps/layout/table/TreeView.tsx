import React from "react"
import { getConstant } from "../../shared/Constants"
import { IColumn } from "../../shared/models/IColumn"
import Button from "../Button"
import { Icon } from "../Icon"
import _ from "lodash"
import { Tooltip } from "../Tooltip"

export interface TreeNode{
    readonly type: string
    readonly data: any
    readonly onDoubleClick?: (node: TreeNode) => void
}

type TreeLevel = {
    [x: string]: boolean
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
    readonly level: TreeLevel
    readonly showActions: boolean
}

export abstract class TreeView<P = any> extends React.PureComponent<P, InternalState & IState>{
    constructor(props: P, state: IState){
        super(props)

        this.state = {
            ...state,
            level: state.list ? state.autoOpen ? this.autoExpandAll(state.list) : {} : {},
            showActions: false
        }
    }

    componentDidUpdate = (__: P, prevState: IState): void => {
        if(!_.isEqual(prevState.list, this.state.list))
            this.setState({ level: this.state.autoOpen ? this.autoExpandAll() : {} })
    }

    abstract getData: (node: TreeNode) => TreeNode[]

    abstract getLabel: (node: TreeNode) => string | React.ReactNode

    abstract hasChildren: (node: TreeNode) => boolean

    protected getActions = (node: TreeNode): React.ReactNode => null

    protected onDoubleClick: (node: TreeNode) => void

    protected getColumnData = (column: IColumn, node: TreeNode): React.ReactNode => null 

    toggleNode = (node: TreeNode, index: string): void => {
        if(!this.hasChildren(node)) return

        const level: TreeLevel = {
            ...this.state.level,
            [index] : !this.state.level[index]
        }

        this.setState({ level })
    }

    toggleAllNode = (node: TreeNode, index: string): void => {
        const newLevel: TreeLevel = {}

        this.getNodeKeys(node, newLevel, index, !this.state.level[index])

        this.setState({
            level: {
                ...this.state.level,
                ...newLevel
            }
        })
    }

    getNodeKeys = (node: TreeNode, newLevel: TreeLevel, index: string, prevOpened: boolean): void => {
        newLevel[index] = prevOpened

        if(this.hasChildren(node))
            this.getData(node).forEach((n, i) => this.getNodeKeys(n, newLevel, index + "-" + i, prevOpened))
    }

    renderNode = (node: TreeNode, treeList: React.ReactNode[], id: string, prevOpened: boolean, autoExpand: string[] = null): void => {
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

    getRender = (node: TreeNode, index: string, prevOpened: boolean): React.ReactNode => {
        const hasChildren = this.hasChildren(node),
        { level, showActions, addColumn } = this.state,
        isOpened = level[index] && prevOpened && hasChildren,
        subNode = index.split("-").length - 1

        return <tr key={index} onDoubleClick={() => this.onDoubleClick && this.onDoubleClick(node)}>
            <td>
                <span style={{ paddingLeft: (25 * subNode) + (hasChildren ? 0 : subNode === 0 ? 0 : 25) }}></span>
                {
                    hasChildren ? <Tooltip tooltip={isOpened ? getConstant("TREE_CLOSE_NODE") : getConstant("TREE_OPEN_NODE")}>
                        <Button btnColor="black" type="text" onClick={() => this.toggleNode(node, index)}>
                            <Icon iconKey={isOpened ? "chevron-down" : "chevron-right"} type="far" className="tree-view-angle" />
                        </Button>
                    </Tooltip> : null
                }

                <Tooltip tooltip={isOpened ? getConstant("TREE_COLLAPSE_ALL_NODE") : hasChildren ? getConstant("TREE_EXPAND_ALL_NODE") : null}>
                    <Button btnColor={isOpened ? "orange" : hasChildren ? "orange" : "black"} type="text" onClick={() => this.toggleAllNode(node, index)}>
                        <Icon iconKey={isOpened ? "folder-open" : hasChildren ? "folder" : "file-alt"} className="tree-view-folder" large />
                    </Button>
                </Tooltip> {this.getLabel(node)}
            </td>

            {
                addColumn && addColumn.map((c, i) => <td style={{ textAlign: c.align}} key={i}>
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

    autoExpandAll = (list: any[] = this.state.list): TreeLevel => {
        let obj: TreeLevel = {}

        list.forEach((data, i) => {
            const node = { type: "root", data },
            allList = []

            if(this.hasChildren(node))
                allList.push(i.toString())

            this.renderNode(node, [], i.toString(), true, allList)
            
            allList.forEach(i => obj[i] = true)
        })

        return obj
    }

    toggleAllNodes = (): void => this.setState({ level: this.autoExpandAll() })

    collapseAllNodes = (): void => this.setState({ level: {} })

    renderTree = (): React.ReactNode => {
        const { list, showActions, showExpandAll, descColumn, addColumn } = this.state,
        baseSpan = addColumn?.length || 0

        return <div className="dolfo-table-content">
            <table className="dolfo-table">
                {
                    showExpandAll && <thead className="dolfo-table-actions">
                        <tr>
                            <td colSpan={showActions ? baseSpan + 2 : baseSpan + 1}>
                                <Tooltip tooltip={getConstant("TREE_EXPAND_ALL_NODES")}>
                                    <Button btnColor="white" onClick={this.toggleAllNodes}>
                                        <Icon iconKey="folder-plus" type="far" />
                                    </Button>
                                </Tooltip>
                                <Tooltip tooltip={getConstant("TREE_COLLAPSE_ALL_NODES")}>
                                    <Button btnColor="white" onClick={this.collapseAllNodes}>
                                        <Icon iconKey="folder-minus" type="far" />
                                    </Button>
                                </Tooltip>
                            </td>
                        </tr>
                    </thead>
                }

                <thead>
                    <tr>
                        <th>{descColumn || getConstant("TREE_TABLE_DESCRIPTION_LABEL")}</th>
                        {addColumn && addColumn.map((c, i) => <th style={{ width: c.width, textAlign: c.align }} key={i}>
                            {c.label}
                        </th>)}
                        {showActions && <th style={{ width: "20%" }}>{getConstant("TREE_TABLE_ACTIONS_LABEL")}</th>}
                    </tr>
                </thead>

                <tbody>
                    {
                        list && list.length ? list.map((data, i) => {
                            const node = { type: "root", data },
                            treeList: React.ReactNode[] = []
                            
                            this.renderNode(node, treeList, i.toString(), true)

                            return treeList
                        }) : <tr>
                            <td className="dolfo-table-noresults" colSpan={baseSpan + 1}>
                                {getConstant("TABLE_NO_RESULTS")}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    }

    render = this.renderTree
}