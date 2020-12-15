import React from "react"
import Button from "../../layout/Button"
import { AddIcon, CheckIcon, CloseIcon, DetailIcon, EditIcon, Icon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { goTo, LoadingIconCentered, notImplemented } from "../../../commons/utility"
import { DocentiService } from "../../../services/DocentiService"
import { Switch } from "../../form/Switch"

export interface IState{
    readonly docenti: any[]
    readonly showAll: boolean
}
export class ListaDocenti extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: undefined){
        super(props)

        this.state = {
            docenti: null,
            showAll: false
        }
    }

    componentDidMount = () => {
        DocentiService.getDocenti().then(response => {
            this.setState({
                docenti: response.data
            })
        })
    }
    
    isInCorso = (doc: any) => {
        return doc.corsi.indexOf(this.session.idCorso) >= 0
    }

    openDetail = (id: number) => goTo(ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI + "/" + id)
    
    openModifica = (id: number) => goTo(ComponentsPaths.PATH_COORDINATORI_EDIT_DOCENTE_BASE + "/" + id)

    buildTable = (studenti: any[]) => {
        return <Table columns={[
            { label: "Docente", field: "desDocente", canSearch: true, tooltip: true },
            { label: "Stato", field: "stato", width: "15%", align: "center" },
            { label: "Ore 1° anno", field: "ore1", width: "15%", align: "center", tooltip: true },
            { label: "Ore 2° anno", field: "ore2", width: "15%", align: "center", tooltip: true },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={
            studenti.sort(s => s.ritirato ? 0 : -1).map(d => {
                return {
                    rowStyle: d.ritirato ? { backgroundColor: "#f8f8f8" } : !this.isInCorso(d) ? { backgroundColor: "var(--hoverblue)" } : null,
                    onDoubleClick: () => this.openDetail(d.idDocente),
                    desDocente: d.nome + " " + d.cognome,
                    ore1: d.monteOre.orePrimo,
                    ore2: d.monteOre.oreSecondo,
                    stato: d.ritirato ? <CloseIcon color="var(--red)" tooltip="Ritirato" large /> : <CheckIcon color="var(--green)" tooltip="Attivo" large />,
                    azioni: <div>
                        <Button btnColor="blue" className="mx-2" circleBtn onClick={() => this.openDetail(d.idDocente)} tooltip="Dettagli">
                            <DetailIcon />
                        </Button>
                        
                        {
                            !d.ritirato && <Button circleBtn btnColor="orange" className="mx-2" tooltip="Modifica" onClick={() => this.openModifica(d.idDocente)}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            !d.ritirato && <Button circleBtn btnColor="red" className="mx-2" tooltip="Ritira" onClick={notImplemented}>
                                <Icon iconKey="user-times" />
                            </Button>
                        }

                        {
                            d.ritirato && <Button circleBtn btnColor="red" className="mx-2" tooltip="Reintegra" onClick={notImplemented}>
                                <Icon iconKey="reply" />
                            </Button>
                        }
                    </div>
                }
            })
        } />
    }

    switchCheckAll = () => this.setState({ showAll: !this.state.showAll })
    
    render = (): JSX.Element => {
        const { docenti, showAll } = this.state,
        lista = showAll ? docenti : docenti?.filter(d => this.isInCorso(d)),
        docs = lista?.sort((a, _) => a.ritirato ? 0 : -1),
        loadingIcon = <LoadingIconCentered />

        return <div>
            <Button type="popup" popupPosition="bottom" options={[
                { text: <span>
                    <AddIcon color="var(--green)" /> Aggiungi
                </span>, onClick: () => goTo(ComponentsPaths.PATH_COORDINATORI_ADD_DOCENTE) },
            ]} className="float-right">Gestione docenti</Button>

            <Switch checked={showAll} onChange={this.switchCheckAll} label="Mostra solo i docenti del corso" className="align-sub" />

            <div className="clearfix mb-2"></div>

            {
                docenti ? this.buildTable(docs) : loadingIcon
            }
        </div>
    }
}