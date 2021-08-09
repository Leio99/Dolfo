import React from "react"
import Button from "./layout/Button"
import { CloseCircleIcon, CloseIcon, DeleteIcon, EditIcon, Icon, LoadingIcon } from "./layout/Icon"
import { TreeNode, TreeView } from "./layout/TreeView"
import axios from "axios"
import { NotificationMsg } from "./layout/NotificationMsg"
import { Dialog } from "./layout/Dialog"
import { Status } from "./layout/Status"
import { formatDate } from "./shared/utility"
import { IColumn } from "./shared/models/IColumn"

const json = require("../programmi.json")

export class TestTree extends TreeView{
    constructor(){
        super({
            list: null,
            showExpandAll: true,
            addColumn: [
                { align: "center", label: "Stato", field: "status" }
            ]
        })
    }

    componentDidMount = (): void => {
        axios.get("http://localhost:5000/programmi")
        .then(r => this.setState({ list: r.data }))
        .catch(() => this.setState({ list: json }))
    }

    getData = (node: TreeNode): TreeNode[] => {
        const arr: TreeNode[] = []

        if(node.type === "root"){
            if(node.data.comici?.length)
                arr.push({ type: "comici", data: node.data.comici })
            if(node.data.luoghi?.length)
                arr.push({ type: "luoghi", data: node.data.luoghi })
            if(node.data.conduttori?.length)
                arr.push({ type: "conduttori", data: node.data.conduttori })
            if(node.data.concorrenti?.length)
                arr.push({ type: "anni", data: node.data.concorrenti })
        }else if(node.type === "comici")
            node.data.forEach((c: any) => arr.push({ type: "comico", data: c }))
        else if(node.type === "luoghi")
            node.data.forEach((d: any) => arr.push({ type: "luogo", data: d }))
        else if(node.type === "conduttori")
            node.data.forEach((d: any) => arr.push({ type: "conduttore", data: d }))
        else if(node.type === "anni")
            node.data.forEach((d: any) => arr.push({ type: "anno", data: d }))
        else if(node.type === "anno")
            node.data.concorrenti.forEach((d: any) => arr.push({ type: "concorrente", data: d }))
        else if(node.type === "comico")
            node.data.composizione.forEach((c: any) => arr.push({ type: "componente", data: c }))

        return arr
    }

    getLabel = (node: TreeNode): string | JSX.Element => {
        if(node.type === "root") return node.data.title
        if(node.type === "comici") return "Comici"
        if(node.type === "luoghi") return "Canali"
        if(node.type === "luogo" || node.type === "conduttore" || node.type === "concorrente") return node.data.nome
        if(node.type === "componente") return node.data.nominativo
        if(node.type === "conduttori") return "Conduttori"
        if(node.type === "anni") return "Concorrenti"
        if(node.type === "anno") return node.data.anno

        return node.data.nominativo
    }

    hasChildren = (node: TreeNode): boolean => {
        if(node.type === "root")
            return node.data.comici?.length || node.data.luoghi?.length || node.data.conduttori?.length

        if(node.type === "comico")
            return node.data.composizione && node.data.composizione.length

        if(node.type === "comici" || node.type === "luoghi" || node.type === "composizione" || node.type === "comico" || node.type === "conduttori" || node.type === "anni")
            return node.data.length

        if(node.type === "anno")
            return node.data.concorrenti.length

        return false
    }

    openDettaglioComico = (comico: any): void => {
        Dialog.infoDialog({
            title: "Dettaglio comico",
            clickOutside: true,
            content: <>
                <Status type={comico.attivo ? "success" : "error"} hideIcon={!comico.attivo}>
                    {comico.attivo ? "Attivo" : <span>
                        <CloseIcon /> Ritirato
                    </span>}
                </Status>

                <div className="mt-2">
                    <strong>Nominativo</strong>: {comico.nominativo}
                </div>
                <div>
                    <strong>Data di nascita</strong>: {formatDate(new Date(comico.dataNascita), true)}
                </div>
            </>
        })
    }

    openDettaglioCanale = (canale: any): void => {
        const loading = Dialog.loadingDialog()

        axios.get("https://guidatv-api.herokuapp.com/getChannelsList?api_key=e1fwxMBsQKaOmq5X5Pf0cy")
        .then(resp => {
            const channel = resp.data.data.find((c: any) => c.id === canale.id)

            Dialog.infoDialog({
                title: "Dettaglio canale",
                clickOutside: true,
                content: <>
                    <div>
                        <strong>Nome</strong>: {channel.name}
                    </div>
                    <div>
                        <strong>Canale TV</strong>: {channel.channel}
                    </div>
                    <div>
                        <strong>Emittente</strong>: {channel.station.name}
                    </div>
                </>
            })
        })
        .catch(() => NotificationMsg.showError("Unable to load channel!"))
        .finally(loading.close)
    }

    getActions = (node: TreeNode): JSX.Element => {
        if(node.type === "concorrente" || node.type === "conduttore") return <Button textBtn onClick={() => window.open("https://it.wikipedia.org/wiki/" + node.data.nome, "_blank")} tooltip="Apri Wikipedia" btnColor="black">
            <Icon iconKey="wikipedia-w" type="fab" large />
        </Button>

        if(node.type === "comico") return <>
            {
                !node.data.composizione && <Button textBtn btnColor="darkblue" tooltip="Dati" className="mr-3" onClick={() => this.openDettaglioComico(node.data)}>
                    <Icon iconKey="id-card" type="far" large />
                </Button>
            }

            <Button textBtn btnColor="red" tooltip={this.hasChildren(node) ? "Elimina gruppo" : "Elimina comico"}>
                <DeleteIcon large />
            </Button>
        </>

        if(node.type === "luogo") return <Button textBtn btnColor="darkblue" tooltip="Dettagli" onClick={() => this.openDettaglioCanale(node.data)}>
            <Icon iconKey="tv" type="far" large />
        </Button>

        if(node.type === "componente") return <>
            <Button textBtn btnColor="darkblue" tooltip="Dati" className="mr-3" onClick={() => this.openDettaglioComico(node.data)}>
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

    render = (): JSX.Element => {
        const { list } = this.state

        if(!list) return <div style={{ textAlign: "center", fontSize: 50 }}>
            <LoadingIcon color="var(--darkblue)" spinning />
        </div>

        return this.renderTree()
    }

    getColumnData = (col: IColumn, node: TreeNode): JSX.Element => {
        if(node.type === "root" && this.hasChildren(node) && col.field === "status"){
            return <Status type="info" hideIcon>
                <Icon iconKey="calendar-day" type="far" /> Prossimamente
            </Status>
        }
    }
}