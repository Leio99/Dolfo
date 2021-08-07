import React from "react"
import Button from "./layout/Button"
import { CloseCircleIcon, DeleteIcon, EditIcon, Icon, LoadingIcon } from "./layout/Icon"
import { TreeNode, TreeView } from "./layout/TreeView"
import axios from "axios"
import { NotificationMsg } from "./layout/NotificationMsg"

export class TestTree extends TreeView{
    constructor(){
        super({
            list: null,
            showExpandAll: true
        })
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/programmi")
        .then(r => this.setState({ list: r.data }))
        .catch(() => {
            NotificationMsg.showError("Unable to load tree!")
            this.setState({ list: [] })
        })
    }

    getData = (node: TreeNode) => {
        const arr: TreeNode[] = []

        if(node.type === "root"){
            if(node.data.comici.length)
                arr.push({ type: "comici", data: node.data.comici })
            if(node.data.luoghi.length)
                arr.push({ type: "luoghi", data: node.data.luoghi })
        }else if(node.type === "comici")
            node.data.forEach((c: any) => arr.push({ type: "comico", data: c }))
        else if(node.type === "luoghi")
            node.data.forEach((d: any) => arr.push({ type: "luogo", data: d }))
        else if(node.type === "comico")
            node.data.composizione.forEach((c: any) => arr.push({ type: "componente", data: c }))

        return arr
    }

    getLabel = (node: TreeNode) => {
        if(node.type === "root") return node.data.title
        if(node.type === "comici") return "Comici"
        if(node.type === "luoghi") return "Canali"
        if(node.type === "luogo") return node.data.nome
        if(node.type === "componente") return node.data.nominativo

        return node.data.nominativo
    }

    hasChildren = (node: TreeNode) => {
        if(node.type === "root")
            return (node.data.comici && node.data.comici.length) || (node.data.luoghi && node.data.luoghi.length)

        if(node.type === "comico")
            return node.data.composizione && node.data.composizione.length

        if(node.type === "comici" || node.type === "luoghi" || node.type === "composizione" || node.type === "comico")
            return node.data.length

        return false
    }

    getNodeId = (node: TreeNode) => JSON.stringify(node)

    getActions = (node: TreeNode) => {
        if(node.type === "comico") return <Button textBtn btnColor="red" tooltip={this.hasChildren(node) ? "Elimina gruppo" : "Elimina comico"}>
            <DeleteIcon large />
        </Button>

        if(node.type === "luogo") return <Button textBtn btnColor="darkblue" tooltip="Dettagli">
            <Icon iconKey="tv" type="far" large />
        </Button>

        if(node.type === "componente") return <>
            <Button textBtn btnColor="darkblue" tooltip="Dati" className="mr-3">
                <Icon iconKey="id-card" type="far" large />
            </Button>

            <Button textBtn btnColor="orange" tooltip="Modifica" className="mr-3">
                <EditIcon large />
            </Button>

            <Button textBtn btnColor="red" tooltip="Rimuovi dal gruppo">
                <CloseCircleIcon large />
            </Button>
        </>
    }

    render = () => {
        const { list } = this.state

        if(!list) return <div style={{ textAlign: "center", fontSize: 50 }}>
            <LoadingIcon color="var(--darkblue)" spinning />
        </div>

        return this.renderTree()
    }
}