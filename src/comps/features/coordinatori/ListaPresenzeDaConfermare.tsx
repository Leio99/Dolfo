import Axios from "axios"
import React from "react"
import { formatItalian, LoadingIconCentered } from "../../../commons/utility"
import { CheckBox } from "../../form/CheckBox"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { CheckIcon, DeleteIcon, Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { Table } from "../../layout/Table"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"
import { DettaglioStudente } from "./DettaglioStudente"

export interface IState{
    readonly listaPresenze: any[]
    readonly selectedList: number[]
}

export class ListaPresenzeDaConfermare extends React.PureComponent<any, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            listaPresenze: null,
            selectedList: []
        }
    }

    componentDidMount = () => this.loadPresenze()

    loadPresenze = () => {
        Axios.get("http://mygraphic.altervista.org/esame/?presenze").then(response => {
            this.setState({
                listaPresenze: response.data
            })
        })
    }

    confermaPresenza = (idPresenza: number) => {
        Dialog.yesNoDialog("Attenzione", "Vuoi confermare la presenza selezionata?", () => {
            const loadingDialog = this.showLoadingDialog()

            Axios.put("http://mygraphic.altervista.org/esame/?presenze&conferma", { idPresenza }).then(() => {
                loadingDialog.close()
                this.loadPresenze()
                this.removeFromList(idPresenza)
                NotificationMsg.showSuccess("Presenza confermata!")
            }).catch(loadingDialog.close)
        })
    }

    confirmAll = () => {
        const idPresenze = this.state.selectedList

        if(!idPresenze.length)
            return NotificationMsg.showError("Seleziona almeno una presenza!")

        Dialog.yesNoDialog("Attenzione", "Vuoi confermare le presenze selezionate?", () => {
            const loadingDialog = this.showLoadingDialog()

            Axios.put("http://mygraphic.altervista.org/esame/?presenze&confermaAll", { idPresenze }).then(() => {
                loadingDialog.close()
                this.loadPresenze()
                this.removeAllFromList(idPresenze)
                NotificationMsg.showSuccess("Presenze confermate!")
            }).catch(loadingDialog.close)
        })
    }

    rejectPresenza = (idPresenza: number) => {
        Dialog.yesNoDialog("Attenzione", "Vuoi cancellare la presenza selezionata?", () => {
            const loadingDialog = this.showLoadingDialog()

            Axios.put("http://mygraphic.altervista.org/esame/?presenze&rifiuta", { idPresenza }).then(() => {
                loadingDialog.close()
                this.loadPresenze()
                this.removeFromList(idPresenza)
                NotificationMsg.showSuccess("Presenza cancellata!")
            }).catch(loadingDialog.close)
        })
    }

    showLoadingDialog = () => Dialog.loadingDialog("Elaborazione...")

    removeAllFromList = (ids: number[]) => {
        this.setState({
            selectedList: this.state.selectedList.filter(n => !ids.includes(n))
        })
    }

    removeFromList = (idPresenza: number) => {
        this.setState({
            selectedList: this.state.selectedList.filter(p => p !== idPresenza)
        })
    }

    addToList = (idPresenza: number) => {
        this.setState({
            selectedList: this.state.selectedList.concat(idPresenza)
        })
    }

    checkUnCheck = (idPresenza: number) => {
        if(this.state.selectedList.includes(idPresenza)) this.removeFromList(idPresenza)
        else this.addToList(idPresenza)
    }

    openInfoStudente = (idStudente: number) => {
        Dialog.openDialog({
            title: Components[ComponentsPaths.PATH_COORDINATORI_DETAILS_STUDENTE].pageTitle,
            content: <DettaglioStudente match={{ 
                params: { id: idStudente.toString()},
                isExact: true,
                path: null,
                url: null
            }} history={null} location={null} />,
            width: "95vw",
            overflows: true,
            hideFooter: true,
            clickOutside: true,
            icon: <Icon iconKey="id-card" type="far" />
        })
    }

    checkUncheckAll = () => {
        const { selectedList, listaPresenze } = this.state

        let newList

        if(selectedList.length === listaPresenze.length) newList = []
        else newList = listaPresenze.map(p => p.idPresenza)

        this.setState({
            selectedList: newList
        })
    }

    render = (): JSX.Element => {
        const { listaPresenze, selectedList } = this.state

        if(!listaPresenze) return <LoadingIconCentered />

        return <div className="mt-3">
            <Button disabled={!selectedList.length} btnColor="green" onClick={this.confirmAll} className="float-right">
                <Icon iconKey="check-double" /> Conferma presenze
            </Button>

            <h3>Presenze da confermare</h3>
            
            <div className="clearfix mt-3"></div>

            <Table columns={[
                { label: <CheckBox checked={selectedList.length === listaPresenze.length} onChange={this.checkUncheckAll} tooltip="Seleziona tutte" disabled={!listaPresenze.length} />, field: "check", width: "5%", align: "center" },
                { label: "Data", field: "data", align: "center", canSearch: true },
                { label: "Entrata", field: "ingresso", align: "center" },
                { label: "Uscita", field: "uscita", align: "center" },
                { label: "Studente", field: "desStudente", tooltip: true, canSearch: true },
                { label: "Lezione", field: "lezione", tooltip: true, width: "30%" },
                { label: "Azioni", field: "azioni", align: "center" }
            ]} data={listaPresenze.map(p => {
                let newP = {...p}
                newP.data = formatItalian(p.data)

                newP.check = <CheckBox checked={selectedList.includes(p.idPresenza)} onChange={() => this.checkUnCheck(p.idPresenza)} />

                newP.azioni = <div>
                    <Button circleBtn btnColor="green" onClick={() => this.confermaPresenza(p.idPresenza)} tooltip="Conferma" className="mx-2">
                        <CheckIcon />
                    </Button>

                    <Button circleBtn btnColor="red" onClick={() => this.rejectPresenza(p.idPresenza)} tooltip="Rifiuta" className="mx-2">
                        <DeleteIcon />
                    </Button>

                    <Button circleBtn btnColor="blue" onClick={() => this.openInfoStudente(p.idStudente)} tooltip="Info studente" className="mx-2">
                        <Icon iconKey="user" />
                    </Button>
                </div>

                return newP
            })} />
        </div>
    }
}