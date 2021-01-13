import React from "react"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { AddIcon, CheckIcon, DetailIcon, EditIcon, Icon, WarningIconOutline } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { Accordion } from "../../layout/Accordion"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { StudentiService } from "../../../services/StudentiService"
import { ComponentsPaths } from "../ComponentsPaths"
import { StageSwitch } from "./StageSwitch"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly studenti: any[]
    readonly checkList: any[]
}
export class ListaStudenti extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()
    
    constructor(props: undefined){
        super(props)

        this.state = {
            studenti: null,
            checkList: []
        }
    }
    
    loadStudenti = () => {
        this.setState({ studenti: null })
        StudentiService.getStudentiEdizione(this.session.idGestore).then(response => {
            this.setState({
                studenti: response.data
            })
        }).catch(() => this.setState({ studenti: [] }))
    }

    componentDidMount = this.loadStudenti

    toggleCheckAll = () => {
        const current = this.state.checkList,
        checkList = current.length ? [] : this.state.studenti.filter(s => !s.promosso)

        this.setState({ checkList })
    }

    toggleCheck = (studente: any) => {
        const list = this.state.checkList
        let checkList

        if(list.includes(studente))
            checkList = this.state.checkList.filter(s => s.id !== studente.id)
        else
            checkList = this.state.checkList.concat(studente) 

        this.setState({ checkList })
    }

    openDetail = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/" + id)
    
    openModifica = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_EDIT_STUDENTE_BASE + "/" + id)

    archiviaStudenti = (target: any | any[]) => {
        Dialog.openDialog({
            title: "Attenzione",
            icon: <WarningIconOutline color="var(--orange)" />, 
            content: Array.isArray(target) ? <div>
                <div>Si stanno per archiviare degli studenti (<strong>{target.length} totali</strong>).</div>
                <div>I dati identificativi degli studenti e le presenze verranno comunque mantenuti, ma gli studenti non potranno più registrare nuove presenze e non potranno essere spostati nuovamente.</div>
                
                <Accordion title="Mostra studenti selezionati" className="mt-3">
                    {
                        target.map(s => {
                            return <div className="py-2">
                                <strong>{s.nome} {s.cognome}</strong>
                            </div>
                        })
                    }
                </Accordion>
            </div> : <div>
                <div>Si sta per archiviare uno studente (<strong>{target.nome} {target.cognome}</strong>).</div>
                <div>I dati identificativi dello studente e le presenze verranno comunque mantenuti, ma lo studente non potrà più registrare nuove presenze e non potrà essere spostato nuovamente.</div>
            </div>,
            onOk: () => {
                const idStudenti = Array.isArray(target) ? target.map(v => v.id) : [target.id],
                loadingDialog = Dialog.loadingDialog()

                StudentiService.archiviaStudenti({ idStudenti }).then(response => {
                    loadingDialog.close()
                    this.loadStudenti()
                })
            },
            okText: "Conferma",
            okType: "red",
            overflows: true,
            top: true,
            clickOutside: true,
            cancelType: "grey"
        })
    }

    buildTable = (studenti: any[]) => {
        const { checkList } = this.state
        let checkedAll = checkList.length > 0

        studenti.forEach(s => {
            if(checkList.indexOf(s) === -1 && !s.promosso) checkedAll = false
        })

        return <Table columns={[
            { type: "check", checkTooltip: "Seleziona tutti", onCheckAll: this.toggleCheckAll, checked: checkedAll, width: "5%", align: "center" },
            { label: "Studente", field: "desStudente", canSearch: true, tooltip: true },
            { label: "Stato", field: "stato", width: "15%", align: "center" },
            { label: "Frequenza", field: "frequenza", width: "15%", align: "center", canSearch: true },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={
            studenti.sort(s => s.promosso || s.ritirato ? 0 : -1).map(s => {
                return {
                    onDoubleClick: () => this.openDetail(s.id),
                    checked: checkList.includes(s),
                    onCheckChange: () => this.toggleCheck(s),
                    rowStyle: s.promosso ? { backgroundColor: "#f8f8f8" } : null,
                    desStudente: s.nome + " " + s.cognome,
                    hideCheck: s.promosso,
                    stato: !s.promosso ? <Icon iconKey="dot-circle" type="far" color="var(--blue)" tooltip="Attivo" large /> : <CheckIcon color="var(--green)" tooltip="Archiviato" large />,
                    frequenza: +parseFloat(s.frequenza).toFixed(2) + "%",
                    azioni: <div>
                        <Button btnColor="blue" className="m-2" circleBtn onClick={() => this.openDetail(s.id)} tooltip="Dettagli">
                            <DetailIcon />
                        </Button>
                        
                        {
                            !s.ritirato && !s.promosso && <Button circleBtn btnColor="orange" className="m-2" tooltip="Modifica" onClick={() => this.openModifica(s.id)}>
                                <EditIcon />
                            </Button>
                        }

                        <Button circleBtn btnColor="red" className="m-2" tooltip="Archivia" onClick={() => this.archiviaStudenti(s)}>
                            <Icon iconKey="user-check" />
                        </Button>
                    </div>
                }
            })
        } />
    }

    promuoviStudenti = () => {
        if(!this.state.checkList.length)
            return NotificationMsg.showError("Selezionare almeno uno studente!")

        this.archiviaStudenti(this.state.checkList)
    }
    
    render = (): JSX.Element => {
        const { studenti } = this.state,
        loadingIcon = <LoadingIconCentered />

        return <div>
            <Button type="popup" popupPosition="bottom" options={[
                { text: <span>
                    <AddIcon color="var(--green)" /> Aggiungi
                </span>, onClick: () => goTo(ComponentsPaths.PATH_GESTORI_ADD_STUDENTE) },
                { text: <span>
                    <Icon iconKey="file-csv" color="var(--blue)" /> Importa da CSV
                </span>, onClick: () =>  goTo(ComponentsPaths.PATH_GESTORI_IMPORT_STUDENTI) },
                { text: <span>
                    <Icon iconKey="user-check" color="var(--red)" /> Archivia selezionati
                </span>, onClick: this.promuoviStudenti }
            ]} className="float-right">Gestione studenti</Button>

            <StageSwitch />
            
            <div className="clearfix"></div>

            { !studenti ? loadingIcon : this.buildTable(studenti) }
        </div>
    }
}