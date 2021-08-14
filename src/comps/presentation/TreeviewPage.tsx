import React from "react"
import Button from "../layout/Button"
import { CloseCircleIcon, CloseIcon, DeleteIcon, EditIcon, Icon } from "../layout/Icon"
import { TreeNode, TreeView } from "../layout/TreeView"
import axios from "axios"
import { NotificationMsg } from "../layout/NotificationMsg"
import { Dialog } from "../layout/Dialog"
import { Status } from "../layout/Status"
import { formatDate } from "../shared/utility"
import { IColumn } from "../shared/models/IColumn"
import { WhenToUse, Usage, ResultCode } from "./Layouts"
import { TreeExample } from "./Examples"

export class TreeviewPage extends TreeView{
    constructor(){
        super({
            list: [
                {
                    "id": "1",
                    "title": "Colorado",
                    "conduttori": [
                        {
                            "idProgramma": "1",
                            "nome": "Beppe Braida"
                        },
                        {
                            "idProgramma": "1",
                            "nome": "Rossella Brescia"
                        },
                        {
                            "idProgramma": "1",
                            "nome": "Nicola Savino"
                        },
                        {
                            "idProgramma": "1",
                            "nome": "Paolo Ruffini"
                        },
                        {
                            "idProgramma": "1",
                            "nome": "Bel\u00e9n Rodriguez"
                        }
                    ],
                    "luoghi": [
                        {
                            "idProgramma": "1",
                            "nome": "Italia 1",
                            "id": "italia-1"
                        },
                        {
                            "idProgramma": "1",
                            "nome": "Italia 2",
                            "id": "italia-2"
                        }
                    ],
                    "comici": [
                        {
                            "idProgramma": "1",
                            "nominativo": "Panpers",
                            "id": "1",
                            "composizione": [
                                {
                                    "idComico": "1",
                                    "nominativo": "Luca Peracino",
                                    "attivo": true
                                },
                                {
                                    "idComico": "1",
                                    "nominativo": "Andrea Pisani",
                                    "attivo": true
                                }
                            ]
                        },
                        {
                            "idProgramma": "1",
                            "nominativo": "Pino e gli anticorpi",
                            "id": "2",
                            "composizione": [
                                {
                                    "idComico": "2",
                                    "nominativo": "Stefano Manca",
                                    "attivo": true
                                },
                                {
                                    "idComico": "2",
                                    "nominativo": "Michele Manca",
                                    "attivo": true
                                },
                                {
                                    "idComico": "2",
                                    "nominativo": "Roberto Fara",
                                    "attivo": false
                                }
                            ]
                        },
                        {
                            "idProgramma": "1",
                            "nominativo": "Angelo Pintus",
                            "id": "3",
                            "attivo": true
                        }
                    ]
                },
                {
                    "id": "2",
                    "title": "Zelig",
                    "conduttori": [
                        {
                            "idProgramma": "2",
                            "nome": "Claudio Bisio"
                        },
                        {
                            "idProgramma": "2",
                            "nome": "Vanessa Incontrada"
                        },
                        {
                            "idProgramma": "2",
                            "nome": "Federico Basso"
                        },
                        {
                            "idProgramma": "2",
                            "nome": "Paola Cortellesi"
                        }
                    ],
                    "luoghi": [
                        {
                            "idProgramma": "2",
                            "nome": "Canale 5",
                            "id": "canale-5"
                        }
                    ]
                },
                {
                    "id": "3",
                    "title": "Tale e quale show",
                    "concorrenti": [
                        {
                            "anno": 2015,
                            "concorrenti": [
                                {
                                    "anno": 2015,
                                    "nome": "Max Giusti",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Massimo Lopez",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Walter Nudo",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Sergio Friscia",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Francesco Cicchella",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Savino Zaba",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Bianca Guaccero",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Laura Freddi",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Elena Di Cioccio",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Karima",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Giulia Luzi",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2015,
                                    "nome": "Cosima Coppola",
                                    "idProgramma": "3"
                                }
                            ]
                        },
                        {
                            "anno": 2014,
                            "concorrenti": [
                                {
                                    "anno": 2014,
                                    "nome": "Luca Barbareschi",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Matteo Becucci",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Alessandro Greco",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Pino Insegno",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Gianni Nazzaro",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Valerio Scanu",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Michela Andreozzi",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Raffaella Fico",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Rita Forte",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Roberta Giarrusso",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Veronica Maya",
                                    "idProgramma": "3"
                                },
                                {
                                    "anno": 2014,
                                    "nome": "Serena Rossi",
                                    "idProgramma": "3"
                                }
                            ]
                        }
                    ],
                    "conduttori": [
                        {
                            "idProgramma": "3",
                            "nome": "Carlo Conti"
                        }
                    ],
                    "luoghi": [
                        {
                            "idProgramma": "3",
                            "nome": "Rai 1",
                            "id": "rai-1"
                        },
                        {
                            "idProgramma": "3",
                            "nome": "Rai Premium",
                            "id": "rai-premium"
                        }
                    ]
                }
            ],
            showExpandAll: true,
            addColumn: [
                { align: "center", label: "Stato", field: "status" }
            ]
        })
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
        if(node.type === "concorrente" || node.type === "conduttore") return <Button type="text" onClick={() => window.open("https://it.wikipedia.org/wiki/" + node.data.nome, "_blank")} tooltip="Apri Wikipedia" btnColor="black">
            <Icon iconKey="wikipedia-w" type="fab" large />
        </Button>

        if(node.type === "comico") return <>
            {
                !node.data.composizione && <Button type="text" btnColor="darkblue" tooltip="Dati" className="mr-3" onClick={() => this.openDettaglioComico(node.data)}>
                    <Icon iconKey="id-card" type="far" large />
                </Button>
            }

            <Button type="text" btnColor="red" tooltip={this.hasChildren(node) ? "Elimina gruppo" : "Elimina comico"}>
                <DeleteIcon large />
            </Button>
        </>

        if(node.type === "luogo") return <Button type="text" btnColor="darkblue" tooltip="Dettagli" onClick={() => this.openDettaglioCanale(node.data)}>
            <Icon iconKey="tv" type="far" large />
        </Button>

        if(node.type === "componente") return <>
            <Button type="text" btnColor="darkblue" tooltip="Dati" className="mr-3" onClick={() => this.openDettaglioComico(node.data)}>
                <Icon iconKey="id-card" type="far" large />
            </Button>

            <Button type="text" btnColor="orange" tooltip="Modifica" className="mr-3">
                <EditIcon large />
            </Button>

            <Button type="text" btnColor="red" tooltip="Rimuovi dal gruppo">
                <CloseCircleIcon large />
            </Button>
        </>
    }

    render = (): JSX.Element => {
        return <>
            <WhenToUse>When you want to render a tree-view table.</WhenToUse>
            <Usage />

            <ResultCode
                title="Example"
                result={this.renderTree()}
                code={TreeExample}
            />

            <p className="notes">Note: to render a tree view, your component must extend the <em>TreeView</em> class and implement the abstract methods inherited. See the code example for more.</p>
        </>
    }

    getColumnData = (col: IColumn, node: TreeNode): JSX.Element => {
        if(node.type === "root" && this.hasChildren(node) && col.field === "status"){
            return <Status type="info" hideIcon>
                <Icon iconKey="calendar-day" type="far" /> Prossimamente
            </Status>
        }
    }
}