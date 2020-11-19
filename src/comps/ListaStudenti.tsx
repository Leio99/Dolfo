import Axios from "axios"
import React from "react"
import { CheckBox } from "./form/CheckBox"
import Button from "./layout/Button"
import { CheckCircleIcon, CloseCircleIcon, Icon, InfoIcon, LoadingIcon } from "./layout/Icon"
import { Tab } from "./layout/Tab"
import { Table } from "./layout/Table"
import { Tabs } from "./layout/Tabs"

export interface IState{
    readonly studenti: any[]
    readonly checkList: any[]
}
export class ListaStudenti extends React.PureComponent<any, IState>{
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

    toggleCheckAll = () => {
        const checkList = this.state.checkList.length > 0 ? [] : this.state.studenti.filter(s => !s.ritirato)

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
        const attivi = this.state.studenti.filter(s => !s.ritirato),
        { checkList } = this.state

        return <Table columns={[
            { label: <CheckBox checked={checkList.length === attivi.length} onChange={this.toggleCheckAll} />, field: "check", width: "5%", align: "center" },
            { label: "Studente", field: "desStudente" },
            { label: "Codice Fiscale", field: "cf" },
            { label: "Frequenza", field: "frequenza", width: "15%", align: "center" },
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
                        <Button btnColor="blue" circleBtn>
                            <InfoIcon />
                        </Button>
                        
                        {
                            !s.ritirato && <Button circleBtn btnColor="orange" className="ml-2">
                                <Icon iconKey="pen" />
                            </Button>
                        }
                        {
                            !s.ritirato && <Button circleBtn btnColor="red" className="ml-2">
                                <Icon iconKey="user-times" />
                            </Button>
                        }

                        {
                            s.ritirato && <Button circleBtn disabled btnColor="white" className="ml-2">
                                <Icon iconKey="user-slash" color="black" />
                            </Button>
                        }

                        <Button circleBtn btnColor="green" className="ml-2">
                            <Icon iconKey="user-check" />
                        </Button>    
                    </div>
                }
            })
        } />
    }
    
    render = (): JSX.Element => {
        const { studenti } = this.state,
        primoAnno = studenti ? studenti.filter(s => s.annoFrequentazione === 1 && !s.promosso) : null,
        secondoAnno = studenti ? studenti.filter(s => s.annoFrequentazione === 2 && !s.promosso) : null,
        listaArchiviati = studenti ? studenti.filter(s => s.promosso) : null,
        loadingIcon = <div className="text-center">
            <LoadingIcon spinning style={{ fontSize: 50 }} />
        </div>

        return <Tabs className="p-5">
            <Tab title={<span>
                <Icon type="far" iconKey="user" /> Studenti attivi
            </span>}>
                <div>
                    <Button type="popup" popupPosition="bottom" options={[
                        { text: <span>
                            <Icon iconKey="plus" /> Aggiungi
                        </span>, onClick: () => null },
                        { text: <span>
                            <Icon iconKey="file-csv" /> Importa da CSV
                        </span>, onClick: () => null },
                        { text: <span>
                            <Icon iconKey="arrows-alt" /> Sposta
                        </span>, onClick: () => null }
                    ]} btnColor="green" className="float-right">Gestisci studenti</Button>

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
                        { label: "Studente", field: "desStudente" },
                        { label: "Codice Fiscale", field: "cf" },
                        { label: "Anno", field: "anno", width: "15%", align: "center" },
                        { label: "Frequenza", field: "frequenza", width: "15%", align: "center" },
                        { label: "Azioni", field: "azioni", width: "26%", align: "center" },
                    ]} data={
                        listaArchiviati.map(s => {
                            return {
                                check: !s.ritirato ? <CheckCircleIcon large color="var(--green)" /> : <CloseCircleIcon large color="var(--red)" />,
                                desStudente: s.nome + " " + s.cognome,
                                cf: s.cf,
                                anno: s.annoFrequentazione === 1 ? "Primo" : "Secondo",
                                frequenza: (isNaN(s.frequenza) ? 0 : s.frequenza) + "%",
                                azioni: <div>
                                    <Button circleBtn btnColor="blue">
                                        <InfoIcon />
                                    </Button>
                                </div>
                            }
                        })
                    } />
                }
            </Tab>
        </Tabs>
    }
}