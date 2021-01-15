import React from "react"
import Button from "../../layout/Button"
import { AddIcon, CloseIcon, DetailIcon, EditIcon, Icon, WarningIconOutline } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { ComponentsPaths } from "../ComponentsPaths"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { DocentiService } from "../../../services/DocentiService"
import { Docente } from "../../../models/Docente"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { Dialog } from "../../layout/Dialog"

export interface IState{
    readonly docenti: Docente[]
}
export class ListaDocenti extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(props: undefined){
        super(props)

        this.state = {
            docenti: null
        }
    }

    loadDocenti = () => {
        this.setState({ docenti: null})
        DocentiService.getDocenti(this.session.idEnte).then(response => {
            this.setState({
                docenti: response.data
            })
        }).catch(() => this.setState({ docenti: [] }))
    }

    componentDidMount = this.loadDocenti

    openDetail = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI + "/" + id)
    
    openModifica = (id: number) => goTo(ComponentsPaths.PATH_GESTORI_EDIT_DOCENTE_BASE + "/" + id)

    ritiraReintegraDocente = (d: Docente) => {
        Dialog.openDialog({
            title: "Attenzione",
            icon: <WarningIconOutline color="var(--orange)" />,
            content: !d.ritirato ? <span>
                <div>Si sta per ritirare un docente (<strong>{d.nome} {d.cognome}</strong>).</div>
                <div>I dati identificativi del docente e le presenze verranno comunque mantenuti, ma il docente non potrà più registrare nuove presenze (in seguito si potrà reintegrare il docente, se necessario).</div>
            </span> : <span>
                <div>Si sta per reintegrare un docente (<strong>{d.nome} {d.cognome}</strong>).</div>
            </span>,
            onOk: () => {
                const loadingDialog = Dialog.loadingDialog()
                DocentiService.ritiraReintegraDocente(d.id).then(() => {
                    loadingDialog.close()
                    this.loadDocenti()
                }).catch(() => loadingDialog.close())
            },
            okText: "Conferma",
            okType: "red",
            overflows: true,
            top: true,
            clickOutside: true,
            cancelType: "grey"
        })
    }

    buildTable = (docenti: Docente[]) => {
        return <Table columns={[
            { label: "Docente", field: "desDocente", canSearch: true, tooltip: true },
            { label: "Stato", field: "stato", width: "15%", align: "center" },
            { label: "Azioni", field: "azioni", width: "26%", align: "center" },
        ]} data={docenti.map(d => {
                return {
                    rowStyle: d.ritirato ? { backgroundColor: "#f8f8f8" } : null,
                    onDoubleClick: () => this.openDetail(d.id),
                    desDocente: d.cognome + " " + d.nome,
                    stato: !d.ritirato ? <Icon iconKey="dot-circle" type="far" color="var(--blue)" tooltip="Attivo" large /> : <CloseIcon color="var(--red)" tooltip="Ritirato" large />,
                    azioni: <div>
                        <Button btnColor="blue" className="m-2" circleBtn onClick={() => this.openDetail(d.id)} tooltip="Dettagli">
                            <DetailIcon />
                        </Button>
                        
                        <Button circleBtn btnColor="orange" className="m-2" tooltip="Modifica" onClick={() => this.openModifica(d.id)}>
                            <EditIcon />
                        </Button>
                        
                        <Button circleBtn btnColor="red" className="m-2" tooltip={d.ritirato ? "Reintegra dicebte" : "Ritira docente"} onClick={() => this.ritiraReintegraDocente(d)}>
                            <Icon iconKey={d.ritirato ? "reply" : "user-times"} />
                        </Button>
                    </div>
                }
            })
        } />
    }

    render = (): JSX.Element => {
        const { docenti } = this.state,
        loadingIcon = <LoadingIconCentered />

        return <div>
            <Button type="popup" popupPosition="bottom" options={[
                { text: <span>
                    <AddIcon color="var(--green)" /> Aggiungi
                </span>, onClick: () => goTo(ComponentsPaths.PATH_GESTORI_ADD_DOCENTE) },
            ]} className="float-right">Gestione docenti</Button>

            <div className="clearfix mb-2"></div>

            {
                docenti ? this.buildTable(docenti) : loadingIcon
            }
        </div>
    }
}