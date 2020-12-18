import React from "react"
import { formatItalian, LoadingIconCentered } from "../../../commons/utility"
import { PresenzeService } from "../../../services/PresenzeService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { CheckIcon, DeleteIcon, Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { Table } from "../../layout/Table"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"

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

    loadPresenze = () => {
        PresenzeService.getPresenzeDaConfermare().then(response => {
            this.setState({
                listaPresenze: response.data
            })
        })
    }

    componentDidMount = this.loadPresenze

    confermaPresenza = (idPresenza: number) => {
        Dialog.yesNoDialog(null, "Vuoi confermare la presenza selezionata?", () => {
            const loadingDialog = this.showLoadingDialog()

            PresenzeService.confermaPresenza(idPresenza).then(() => {
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

        Dialog.yesNoDialog(null, "Vuoi confermare le presenze selezionate?", () => {
            const loadingDialog = this.showLoadingDialog()

            PresenzeService.confermaPresenze(idPresenze).then(() => {
                loadingDialog.close()
                this.loadPresenze()
                this.removeAllFromList(idPresenze)
                NotificationMsg.showSuccess("Presenze confermate!")
            }).catch(loadingDialog.close)
        })
    }

    rejectPresenza = (idPresenza: number) => {
        Dialog.yesNoDialog(null, "Vuoi cancellare la presenza selezionata?", () => {
            const loadingDialog = this.showLoadingDialog()

            PresenzeService.rifiutaPresenza(idPresenza).then(() => {
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
    openDettaglio = (id: number, docente = false) => {
        const path = docente ? ComponentsPaths.PATH_COORDINATORI_DETAILS_DOCENTE : ComponentsPaths.PATH_COORDINATORI_DETAILS_STUDENTE,
        Component = Components[path]

        Dialog.openDialog({
            title: Component.pageTitle,
            content: <Component.Component match={{ params: { id } }} />,
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
            <h3 className="d-inline-block">Presenze da confermare</h3>

            <Button disabled={!selectedList.length} btnColor="green" onClick={this.confirmAll} className="float-right">
                <Icon iconKey="tasks" /> Conferma presenze
            </Button>
            
            <div className="clearfix mt-3"></div>

            <Table columns={[
                { isCheck: true, onCheckAll: this.checkUncheckAll, checked: selectedList.length === listaPresenze.length && selectedList.length > 0, checkTooltip: "Seleziona tutte", width: "5%", align: "center" },
                { label: "Data", field: "data", align: "center", canSearch: true },
                { label: "Entrata", field: "ingresso", align: "center" },
                { label: "Uscita", field: "uscita", align: "center" },
                { label: "Studente/Docente", field: "des", tooltip: true, canSearch: true },
                { label: "Lezione", field: "lezione", tooltip: true, width: "30%" },
                { label: "Azioni", field: "azioni", align: "center" }
            ]} data={listaPresenze.map(p => {
                let newP = {...p},
                isSelected = selectedList.includes(newP.idPresenza)

                newP.data = formatItalian(newP.data)
                newP.rowStyle = isSelected ? { backgroundColor: "var(--hoverblue)" } : null

                newP.onDoubleClick = () => this.checkUnCheck(newP.idPresenza)
                newP.checked = isSelected
                newP.onCheckChange = newP.onDoubleClick
                newP.des = p.des + (p.idStudente ? " (studente)" : " (docente)")

                newP.azioni = <div>
                    <Button circleBtn btnColor="green" onClick={() => this.confermaPresenza(newP.idPresenza)} tooltip="Conferma" className="mx-2">
                        <CheckIcon />
                    </Button>

                    <Button circleBtn btnColor="red" onClick={() => this.rejectPresenza(newP.idPresenza)} tooltip="Rifiuta" className="mx-2">
                        <DeleteIcon />
                    </Button>

                    <Button circleBtn btnColor="blue" onClick={() => this.openDettaglio(newP.targetId, newP.tipo === "D")} tooltip="Info studente" className="mx-2">
                        <Icon iconKey="user" />
                    </Button>
                </div>

                return newP
            })} />
        </div>
    }
}