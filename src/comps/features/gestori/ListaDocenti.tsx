import React from "react"
import Button from "../../layout/Button"
import { AddIcon, DetailIcon, EditIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { ComponentsPaths } from "../ComponentsPaths"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { DocentiService } from "../../../services/DocentiService"

export interface IState{
    readonly docenti: any[]
}
export class ListaDocenti extends React.PureComponent<undefined, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            docenti: null
        }
    }

    componentDidMount = () => {
        DocentiService.getDocenti().then(response => {
            this.setState({
                docenti: response.data
            })
        })
    }
    
    isInCorso = (doc: any) => doc.corsi.includes(1)

    openDetail = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI + "/" + id)
    
    openModifica = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_EDIT_DOCENTE_BASE + "/" + id)

    buildTable = (studenti: any[]) => {
        return <Table columns={[
            { label: "Docente", field: "desDocente", canSearch: true, tooltip: true, width: "80%" },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={
            studenti.sort(s => s.ritirato ? 0 : -1).map(d => {
                return {
                    rowStyle: d.ritirato ? { backgroundColor: "#f8f8f8" } : !this.isInCorso(d) ? { backgroundColor: "var(--hoverblue)" } : null,
                    onDoubleClick: () => this.openDetail(d.idDocente),
                    desDocente: d.nome + " " + d.cognome,
                    azioni: <div>
                        <Button btnColor="blue" className="m-2" circleBtn onClick={() => this.openDetail(d.idDocente)} tooltip="Dettagli">
                            <DetailIcon />
                        </Button>
                        
                        {
                            !d.ritirato && <Button circleBtn btnColor="orange" className="m-2" tooltip="Modifica" onClick={() => this.openModifica(d.idDocente)}>
                                <EditIcon />
                            </Button>
                        }
                    </div>
                }
            })
        } />
    }

    render = (): JSX.Element => {
        const { docenti } = this.state,
        docs = docenti?.sort((a, _) => a.ritirato ? 0 : -1),
        loadingIcon = <LoadingIconCentered />

        return <div>
            <Button type="popup" popupPosition="bottom" options={[
                { text: <span>
                    <AddIcon color="var(--green)" /> Aggiungi
                </span>, onClick: () => goTo(ComponentsPaths.PATH_GESTORI_ADD_DOCENTE) },
            ]} className="float-right">Gestione docenti</Button>

            <div className="clearfix mb-2"></div>

            {
                docenti ? this.buildTable(docs) : loadingIcon
            }
        </div>
    }
}