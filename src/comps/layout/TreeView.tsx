import _ from "lodash"
import React from "react"
import { Constants } from "../shared/Constants"
import Button from "./Button"
import { Icon } from "./Icon"

export interface TreeNode{
    readonly type: string
    readonly data: any
    readonly onDoubleClick?: (node: TreeNode) => void
}

interface IState{
    readonly list: any[]
    readonly autoOpen?: boolean
    readonly [x: string]: any
}

interface InternalState{
    readonly level: (string | number)[][]
    readonly showActions: boolean
}

export abstract class TreeView<P = any> extends React.PureComponent<P, InternalState & IState>{
    constructor(state: IState, props?: P){
        super(props)

        this.state = {
            ...state,
            level: state.list ? state.autoOpen ? this.autoExpandAll(state.list) : state.list.map(() => []) : [],
            showActions: false
        }
    }

    componentDidUpdate = (__: P, prevState: IState) => {
        if(!_.isEqual(prevState.list, this.state.list)){
            this.setState({ level: this.state.autoOpen ? this.autoExpandAll() : this.state.list.map(() => []) })
        }
    }

    abstract getData: (node: TreeNode) => TreeNode[]

    abstract getLabel: (node: TreeNode) => string

    abstract hasChildren: (node: TreeNode) => boolean

    abstract getChildren: (node: TreeNode) => any[]

    abstract getNodeId: (node: TreeNode) => string | number

    protected getActions = (node: TreeNode): JSX.Element => null

    protected onDoubleClick: (node: TreeNode) => void

    toggleNode = (node: TreeNode, index: number) => {
        if(!this.hasChildren(node)) return

        const level = this.state.level.map((s, i) => {
            if(i === index){
                if(s.includes(this.retrieveNodeId(node))) return s.filter(a => a !== this.retrieveNodeId(node))

                return s.concat(this.retrieveNodeId(node))
            }

            return s
        })

        this.setState({ level })
    }

    toggleAllNodes = (node: TreeNode, index: number) => {
        const { level } = this.state,
        nodeLevel = level[index]
        let newNodeLevel: (string | number)[] = []

        if(nodeLevel.includes(this.retrieveNodeId(node)))
            newNodeLevel = nodeLevel.filter(s => s !== this.retrieveNodeId(node))
        else{
            const list: (string | number)[] = nodeLevel

            this.getNodeKeys(node, list)

            newNodeLevel = list
        }

        const newLevel = level.map((l, i) => {
            if(i === index) return newNodeLevel
            
            return l
        })

        this.setState({ level: newLevel })
    }

    getNodeKeys = (node: TreeNode, list: (string | number)[]) => {
        while(this.hasChildren(node) && !list.includes(this.retrieveNodeId(node))){
            list.push(this.retrieveNodeId(node))

            this.getData(node).forEach(n => this.getNodeKeys(n, list))
        }
    }

    renderNode = (node: TreeNode, originalIndex: number, treeList: JSX.Element[], subNode: number, prevOpened: boolean, idList: (string | number)[], autoExpand = false) => {
        const hasChildren = this.hasChildren(node),
        { level } = this.state,
        isOpened = idList.every(id => level[originalIndex]?.includes(id))

        if(prevOpened)
            treeList.push(this.getRender(node, originalIndex, subNode))

        if(this.getActions(node))
            this.setState({ showActions: true })

        if(hasChildren && this.getChildren(node)){
            this.getData(node).forEach(data => {
                const newList = idList.concat(this.retrieveNodeId(data))

                if(autoExpand && this.hasChildren(data))
                    idList.push(this.retrieveNodeId(data))
                
                this.renderNode(data, originalIndex, treeList, subNode + 1, isOpened, newList, autoExpand)
            })
        }
    }

    retrieveNodeId = (node: TreeNode) => "tree_node-" + node.type + "_" + this.getNodeId(node)

    getRender = (node: TreeNode, originalIndex: number, subNode = 0) => {
        const hasChildren = this.hasChildren(node),
        { level, showActions } = this.state,
        isOpened = level[originalIndex]?.includes(this.retrieveNodeId(node))

        return <tr onDoubleClick={() => this.onDoubleClick && this.onDoubleClick(node)}>
            <td>
                <span style={{ paddingLeft: (10 * subNode) + (hasChildren ? 0 : subNode === 0 ? 0 : 20) }}></span>
                {
                    hasChildren ? <Button btnColor="black" textBtn onClick={() => this.toggleNode(node, originalIndex)} tooltip={isOpened ? Constants.TREE_CLOSE_NODE : Constants.TREE_OPEN_NODE}>
                        <Icon iconKey={isOpened ? "chevron-down" : "chevron-right"} type="far" className="mr-2" />
                    </Button> : null
                }

                <Button btnColor={isOpened ? "orange" : hasChildren ? "orange" : "black"} textBtn onClick={() => this.toggleAllNodes(node, originalIndex)} tooltip={isOpened ? Constants.TREE_COLLAPSE_ALL_NODES : hasChildren ? Constants.TREE_EXPAND_ALL_NODES : null}>
                    <Icon iconKey={isOpened ? "folder-open" : hasChildren ? "folder" : "file-alt"} className="mr-2" large />
                </Button> {this.getLabel(node)}
            </td>

            {
                this.getActions(node) ? <td>
                    {this.getActions(node)}
                </td> : showActions ? <td></td> : null
            }
        </tr>
    }

    autoExpandAll = (list: any[] = this.state.list) => {
        return list.map((l, i) => {
            const node = { type: "root", data: l },
            allList = [this.retrieveNodeId(node)]

            this.renderNode(node, i, [], 0, true, allList, true)
            console.warn(allList)
            return allList
        })
    }

    renderTree = (): JSX.Element => {
        const { list, showActions } = this.state

        return <div className="dolfo-table-content">
            <table className="dolfo-table">
                <thead>
                    <tr>
                        <th style={{ width: "85%" }}>Descrizione</th>
                        {showActions && <th>Azioni</th>}
                    </tr>
                </thead>

                <tbody>
                    {
                        list && list.length ? list.map((l, i) => {
                            const node = { type: "root", data: l },
                            treeList: JSX.Element[] = []
                            
                            this.renderNode(node, i, treeList, 0, true, [this.retrieveNodeId(node)])

                            return treeList
                        }) : <tr>
                            <td className="dolfo-table-noresults">
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
