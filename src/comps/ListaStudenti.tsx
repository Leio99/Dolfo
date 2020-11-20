import Axios from "axios"
import React from "react"
import { CheckBox } from "./form/CheckBox"
import Select from "./form/Select"
import { Option } from "./form/Option"
import Button from "./layout/Button"
import { Dialog } from "./layout/Dialog"
import { CheckCircleIcon, CloseCircleIcon, DetailIcon, EditIcon, Icon, LoadingIcon } from "./layout/Icon"
import { Tab } from "./layout/Tab"
import { Table } from "./layout/Table"
import { Tabs } from "./layout/Tabs"
import { Accordion } from "./layout/Accordion"
import { NotificationMsg } from "./layout/NotificationMsg"

export interface IState{
    readonly studenti: any[]
    readonly checkList: any[]
}
export class ListaStudenti extends React.PureComponent<any, IState>{
    static PAGE_TITLE = "Studenti del corso"
    
    constructor(props: any){
        super(props)

        this.state = {
            studenti: null,
            checkList: []
        }
    }

    componentDidMount = () => {
        Axios.get("https://registrofitstic.azurewebsites.net/api/studenti/1").then(response => {
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

    buildTable = (studenti: any[]) => {
        const { checkList } = this.state
        let checkedAll = true

        studenti.forEach(s => {
            if(checkList.indexOf(s) === -1 && !s.ritirato) checkedAll = false
        })

        return <Table columns={[
            { label: <CheckBox checked={checkedAll} onChange={() => this.toggleCheckAll(studenti[0].annoFrequentazione)} />, field: "check", width: "5%", align: "center" },
            { label: "Studente", field: "desStudente", canSearch: true },
            { label: "Codice Fiscale", field: "cf", canSearch: true },
            { label: "Frequenza", field: "frequenza", width: "15%", align: "center", canSearch: true },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={
            studenti.sort((s, _) => s.ritirato ? 0 : -1).map(s => {
                return {
                    rowStyle: s.ritirato ? { backgroundColor: "#eee" } : null,
                    onDoubleClick: () => console.log("Hai cliccato ", s),
                    check: s.ritirato ? <CheckBox disabled /> : <CheckBox onChange={() => this.toggleCheck(s)} checked={checkList.includes(s)} />,
                    desStudente: s.nome + " " + s.cognome,
                    cf: s.cf,
                    frequenza: (isNaN(s.frequenza) ? 0 : s.frequenza) + "%",
                    azioni: <div>
                        <Button btnColor="blue" className="mx-2" circleBtn>
                            <DetailIcon />
                        </Button>
                        
                        {
                            !s.ritirato && <Button circleBtn btnColor="orange" className="mx-2">
                                <EditIcon />
                            </Button>
                        }
                        {
                            !s.ritirato && <Button circleBtn btnColor="red" className="mx-2">
                                <Icon iconKey="user-times" />
                            </Button>
                        }

                        {
                            s.ritirato && <Button circleBtn disabled btnColor="white" className="mx-2">
                                <Icon iconKey="user-slash" color="black" />
                            </Button>
                        }

                        <Button circleBtn btnColor="green" className="mx-2">
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
            top: true,
            content: <div>
                <Select label="Scegli l'anno in cui spostare gli studenti">
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
        loadingIcon = <div className="text-center">
            <LoadingIcon spinning style={{ fontSize: 50 }} />
        </div>

        return <div className="px-5">
            <Tabs>
                <Tab title={<span>
                    <Icon type="far" iconKey="user" /> Studenti attivi
                </span>}>
                    <div>
                        <Button type="popup" popupPosition="bottom" options={[
                            { text: <span>
                                <Icon iconKey="plus" color="var(--green)" /> Aggiungi
                            </span>, onClick: () => null },
                            { text: <span>
                                <Icon iconKey="file-csv" color="var(--blue)" /> Importa da CSV
                            </span>, onClick: () => null },
                            { text: <span>
                                <Icon iconKey="arrows-alt" color="var(--orange)" /> Sposta
                            </span>, onClick: this.moveStudents }
                        ]} btnColor="darkblue" className="float-right">Gestisci studenti</Button>

                        <div className="clearfix"></div>

                        <Tabs className="mt-2">
                            <Tab title="Primo anno">
                                {
                                    !primoAnno ? loadingIcon : this.buildTable(primoAnno)
                                }
                            </Tab>
                            <Tab title="Secondo anno">
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
                            { label: <CheckCircleIcon large color="var(--green)" />, field: "check", align: "center" },
                            { label: "Studente", field: "desStudente", canSearch: true },
                            { label: "Codice Fiscale", field: "cf", canSearch: true },
                            { label: "Anno", field: "anno", width: "15%", align: "center", canSearch: true },
                            { label: "Frequenza", field: "frequenza", width: "15%", align: "center", canSearch: true },
                            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
                        ]} data={
                            listaArchiviati.map(s => {
                                return {
                                    onDoubleClick: () => console.log("Hai cliccato ", s),
                                    check: !s.ritirato ? <CheckCircleIcon large color="var(--green)" /> : <CloseCircleIcon large color="var(--red)" />,
                                    desStudente: s.nome + " " + s.cognome,
                                    cf: s.cf,
                                    anno: s.annoFrequentazione === 1 ? "Primo" : "Secondo",
                                    frequenza: (isNaN(s.frequenza) ? 0 : s.frequenza) + "%",
                                    azioni: <div>
                                        <Button circleBtn btnColor="blue">
                                            <DetailIcon />
                                        </Button>
                                    </div>
                                }
                            })
                        } />
                    }
                </Tab>
            </Tabs>
        </div>
    }
}