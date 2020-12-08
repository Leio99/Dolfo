import React from "react"
import Select from "../../form/Select"
import { Option } from "../../form/Option"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { AddIcon, CheckIcon, CloseIcon, DetailIcon, EditIcon, Icon } from "../../layout/Icon"
import { Tab } from "../../layout/Tab"
import { Table } from "../../layout/Table"
import { Tabs } from "../../layout/Tabs"
import { Accordion } from "../../layout/Accordion"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { StudentiService } from "../../../services/StudentiService"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { StageSwitch } from "./StageSwitch"
import { goTo, LoadingIconCentered } from "../../../commons/utility"

export interface IState{
    readonly studenti: any[]
    readonly checkList: any[]
}
export class ListaStudenti extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: undefined){
        super(props)

        this.state = {
            studenti: null,
            checkList: []
        }
    }

    componentDidMount = () => {
        StudentiService.getStudentiCorso(this.session.idCorso).then(response => {
            this.setState({
                studenti: response.data
            })
        })
    }

    toggleCheckAll = (anno: number) => {
        const current = this.state.checkList,
        checkList = current.find(s => s.annoFrequentazione === anno) ? current.filter(s => s.annoFrequentazione !== anno) : current.concat(this.state.studenti.filter(s => !s.ritirato && s.annoFrequentazione === anno && !s.promosso))

        this.setState({ checkList })
    }

    toggleCheck = (studente: any) => {
        const list = this.state.checkList
        let checkList

        if(list.includes(studente))
            checkList = this.state.checkList.filter(s => s.idStudente !== studente.idStudente)
        else
            checkList = this.state.checkList.concat(studente) 

        this.setState({ checkList })
    }

    openDetail = (id: number) => goTo(ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI + "/" + id)
    
    openModifica = (id: number) => goTo(ComponentsPaths.PATH_COORDINATORI_EDIT_STUDENTE_BASE + "/" + id)

    buildTable = (studenti: any[]) => {
        const { checkList } = this.state
        let checkedAll = true

        studenti.forEach(s => {
            if(checkList.indexOf(s) === -1 && !s.ritirato) checkedAll = false
        })

        return <Table columns={[
            { isCheck: true, checkTooltip: "Seleziona tutti", onCheckAll: () => this.toggleCheckAll(studenti[0].annoFrequentazione), checked: checkedAll, width: "5%", align: "center" },
            { label: "Studente", field: "desStudente", canSearch: true, tooltip: true },
            { label: "Stato", field: "stato", width: "15%", align: "center" },
            { label: "Frequenza", field: "frequenza", width: "15%", align: "center", canSearch: true },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={
            studenti.sort(s => s.ritirato ? 0 : -1).map(s => {
                return {
                    rowStyle: s.ritirato ? { backgroundColor: "#f8f8f8" } : null,
                    onDoubleClick: () => this.openDetail(s.idStudente),
                    checked: checkList.includes(s),
                    onCheckChange: () => this.toggleCheck(s),
                    checkDisabled: s.ritirato,
                    desStudente: s.nome + " " + s.cognome,
                    stato: s.ritirato ? <CloseIcon color="var(--red)" tooltip="Ritirato" large /> : <CheckIcon color="var(--green)" tooltip="Attivo" large />,
                    frequenza: (isNaN(s.frequenza) ? 0 : s.frequenza) + "%",
                    azioni: <div>
                        <Button btnColor="blue" className="mx-2" circleBtn onClick={() => this.openDetail(s.idStudente)} tooltip="Dettagli">
                            <DetailIcon />
                        </Button>
                        
                        {
                            !s.ritirato && <Button circleBtn btnColor="orange" className="mx-2" tooltip="Modifica" onClick={() => this.openModifica(s.idStudente)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            !s.ritirato && <Button circleBtn btnColor="red" className="mx-2" tooltip="Ritira">
                                <Icon iconKey="user-times" />
                            </Button>
                        }

                        <Button circleBtn btnColor="green" className="mx-2" tooltip="Archivia">
                            <Icon iconKey="user-check" />
                        </Button>
                    </div>
                }
            })
        } />
    }

    moveStudents = () => {
        if(!this.state.checkList.length)
            return NotificationMsg.showError("Seleziona almeno uno studente!")

        Dialog.openDialog({
            title: "Sposta studenti",
            width: "450px",
            okText: "Conferma",
            okType: "green",
            overflows: true,
            top: true,
            content: <div>
                <Select label="Scegli l'anno in cui spostare gli studenti" icon={{ iconKey: "graduation-cap" }}>
                    <Option value={1} label="Primo anno" />
                    <Option value={2} label="Secondo anno" />
                </Select>

                <Accordion title="Mostra studenti selezionati" className="mt-3">
                    {
                        this.state.checkList.map(s => {
                            return <div className="py-2">
                                <strong>{s.nome} {s.cognome}</strong> <div className="float-right">{s.annoFrequentazione}° anno</div>
                            </div>
                        })
                    }
                </Accordion>
            </div>
        })
    }
    
    render = (): JSX.Element => {
        const { studenti } = this.state,
        primoAnno = studenti ? studenti.filter(s => s.annoFrequentazione === 1 && !s.promosso) : null,
        secondoAnno = studenti ? studenti.filter(s => s.annoFrequentazione === 2 && !s.promosso) : null,
        listaArchiviati = studenti ? studenti.filter(s => s.promosso) : null,
        loadingIcon = <LoadingIconCentered />

        return <Tabs>
            <Tab title={<span>
                <Icon type="far" iconKey="users" /> Studenti attivi
            </span>}>
                <div>
                    <Button type="popup" popupPosition="bottom" options={[
                        { text: <span>
                            <AddIcon color="var(--green)" /> Aggiungi
                        </span>, onClick: () => goTo(ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE) },
                        { text: <span>
                            <Icon iconKey="file-csv" color="var(--blue)" /> Importa da CSV
                        </span>, onClick: () =>  goTo(ComponentsPaths.PATH_COORDINATORI_IMPORT_STUDENTI) },
                        { text: <span>
                            <Icon iconKey="arrows-alt" color="var(--orange)" /> Sposta
                        </span>, onClick: this.moveStudents }
                    ]} btnColor="darkblue" className="float-right">Gestisci studenti</Button>

                    <div className="clearfix"></div>

                    <Tabs className="mt-2">
                        <Tab title="Primo anno">
                            <StageSwitch anno={1} idCorso={this.session.idCorso} />
                            
                            <div className="clearfix"></div>

                            {
                                !primoAnno ? loadingIcon : this.buildTable(primoAnno)
                            }
                        </Tab>
                        <Tab title="Secondo anno">
                            <StageSwitch anno={2} idCorso={this.session.idCorso} />

                            <div className="clearfix"></div>
                            
                            {
                                !secondoAnno ? loadingIcon : this.buildTable(secondoAnno)
                            }
                        </Tab>
                    </Tabs>
                </div>
            </Tab>

            <Tab title={<span>
                <Icon type="far" iconKey="user-graduate" /> Studenti archiviati
            </span>}>
                {
                    !listaArchiviati ? loadingIcon : <Table columns={[
                        { label: "Studente", field: "desStudente", canSearch: true, tooltip: true },
                        { label: "Anno", field: "anno", width: "15%", align: "center", canSearch: true },
                        { label: "Stato", field: "stato", align: "center" },
                        { label: "Frequenza", field: "frequenza", width: "15%", align: "center", canSearch: true },
                        { label: "Azioni", field: "azioni", width: "26%", align: "center" },
                    ]} data={
                        listaArchiviati.map(s => {
                            return {
                                onDoubleClick: () => this.openDetail(s.idStudente),
                                stato: !s.ritirato ? <Icon iconKey="user-graduate" large color="var(--green)" tooltip="Promosso" /> : <Icon iconKey="user-times" large color="var(--red)" tooltip="Ritirato/Bocciato" />,
                                desStudente: s.nome + " " + s.cognome,
                                anno: s.annoFrequentazione === 1 ? "Primo" : "Secondo",
                                frequenza: (isNaN(s.frequenza) ? 0 : s.frequenza) + "%",
                                azioni: <Button circleBtn btnColor="blue" onClick={() => this.openDetail(s.idStudente)} tooltip="Dettagli">
                                    <DetailIcon />
                                </Button>
                            }
                        })
                    } />
                }
            </Tab>
        </Tabs>
    }
}