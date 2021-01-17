import React from "react"
import { getTime, LoadingIconCentered } from "../../../commons/utility"
import { Presenza } from "../../../models/Presenza"
import { PresenzeService } from "../../../services/PresenzeService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { CheckIcon, DeleteIcon, Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { Table } from "../../layout/Table"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly listaPresenze: Presenza[]
    readonly selectedList: number[]
}

export class ListaPresenzeDaConfermare extends React.PureComponent<any, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(props: undefined){
        super(props)

        this.state = {
            listaPresenze: null,
            selectedList: []
        }
    }

    loadPresenze = () => {
        this.setState({ listaPresenze: null, selectedList: [] })
        PresenzeService.getPresenzeDaConfermare(this.session.idGestore).then(response => {
            this.setState({
                listaPresenze: response.data
            })
        })
    }

    componentDidMount = this.loadPresenze

    confermaPresenza = (target: number|number[]) => {
        const title = Array.isArray(target) ? "Vuoi confermare le presenze selezionate?" : "Vuoi confermare la presenza selezionata?"

        Dialog.yesNoDialog(null, title, () => {
            const loadingDialog = this.showLoadingDialog()

            PresenzeService.confermaPresenze(Array.isArray(target) ? target : [target]).then(() => {
                loadingDialog.close()
                this.loadPresenze()
                NotificationMsg.showSuccess("Presenza confermata!")
            }).catch(loadingDialog.close)
        })
    }

    confirmAll = () => {
        const idPresenze = this.state.selectedList

        if(!idPresenze.length)
            return NotificationMsg.showError("Seleziona almeno una presenza!")

        this.confermaPresenza(idPresenze)
    }

    rejectPresenza = (idPresenza: number) => {
        Dialog.yesNoDialog(null, "Vuoi rifiutare la presenza selezionata?", () => {
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
        const path = docente ? ComponentsPaths.PATH_GESTORI_DETAILS_DOCENTE : ComponentsPaths.PATH_GESTORI_DETAILS_STUDENTE,
        Component = Components[path]

        const dialog = Dialog.openDialog({
            title: Component.pageTitle,
            content: <Component.Component match={{ params: { id } }} dialogClose={() => dialog.close()} />,
            width: "95vw",
            overflows: true,
            hideFooter: true,
            clickOutside: true,
            icon: <Icon iconKey="id-card" type="far" />
        })
    }

    checkUncheckAll = () => {
        const { selectedList, listaPresenze } = this.state

        let newList: number[]

        if(selectedList.length === listaPresenze.length) newList = []
        else newList = listaPresenze.map(p => p.id)

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
                { type: "check", onCheckAll: this.checkUncheckAll, checked: selectedList.length === listaPresenze.length && selectedList.length > 0, checkTooltip: "Seleziona tutte", width: "5%", align: "center" },
                { label: "Data", field: "data", align: "center", canSearch: true, type: "date" },
                { label: "Entrata", field: "oraEntrata", align: "center" },
                { label: "Uscita", field: "oraUscita", align: "center" },
                { label: "Studente/Docente", field: "des", tooltip: true, canSearch: true },
                { label: "Lezione", field: "lezione", tooltip: true, width: "30%" },
                { label: "Azioni", field: "azioni", align: "center" }
            ]} data={listaPresenze.map(p => {
                let newP = {...p},
                isSelected = selectedList.includes(newP.id)

                newP.rowStyle = isSelected ? { backgroundColor: "var(--hoverblue)" } : null
                newP.onDoubleClick = () => this.checkUnCheck(newP.id)
                newP.checked = isSelected
                newP.onCheckChange = newP.onDoubleClick
                
                if(p.tipoUtente === "S"){
                    newP.des = p.cognomeStudente + " " + p.nomeStudente + " (studente)"
                }else{
                    newP.des = p.cognomeDocente + " " + p.nomeDocente + " (docente)"
                }

                newP.oraEntrata = getTime(p.oraEntrata)
                newP.oraUscita = getTime(p.oraUscita)

                newP.azioni = <div>
                    <Button circleBtn btnColor="green" onClick={() => this.confermaPresenza(newP.id)} tooltip="Conferma" className="m-2">
                        <CheckIcon />
                    </Button>

                    <Button circleBtn btnColor="red" onClick={() => this.rejectPresenza(newP.id)} tooltip="Rifiuta" className="m-2">
                        <DeleteIcon />
                    </Button>

                    <Button circleBtn btnColor="blue" onClick={() => this.openDettaglio(newP.idUtente, newP.tipoUtente === "D")} tooltip={"Info " + (newP.tipoUtente === "D" ? "docente" : "studente")} className="m-2">
                        <Icon iconKey="user" />
                    </Button>
                </div>

                return newP
            })} />
        </div>
    }
}