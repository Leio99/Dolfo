import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { dateIsToday, formatNumber, formatWithMonth, goTo, LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { CardActions } from "../../layout/CardActions"
import { Dialog } from "../../layout/Dialog"
import { DetailIcon, EditIcon, Icon, LoadingIcon } from "../../layout/Icon"
import { Progress } from "../../layout/Progress"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"
import { DialogOreStage } from "./dialogs/DialogOreStage"
import { EditStudente } from "./EditStudente"
import { TabellaPresenze } from "./TabellaPresenze"
import { Studente } from "../../../models/Studente"

export interface IRouteParams{
    readonly id: string
}
export interface IProps extends RouteComponentProps<IRouteParams>{
    readonly dialogClose?: () => void
}
export interface IState{
    readonly studente: Studente
    readonly totPresenze: number
    readonly oreTotali: number
}

export class DettaglioStudente extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            studente: null,
            totPresenze: 0,
            oreTotali: 0
        }
    }

    loadStudente = () => {
        const id = this.props.match.params.id

        if(isNaN(parseInt(id)))
            goTo(ComponentsPaths.PATH_GESTORI_HOME)

        StudentiService.getStudente(id).then(response => {
            this.setState({
                studente: response.data
            }, this.loadTotali)

            StudentiService.getOreStudente(id).then(response => {
                this.setState({
                    totPresenze: response.data as number
                })
            })
        }).catch(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
    }

    componentDidMount = this.loadStudente

    loadTotali = () => {
        this.setState({
            oreTotali: null
        })

        StudentiService.getTotaleOre(this.state.studente.idEdizione).then(response => {
            this.setState({
                oreTotali: response.data as number
            })
        })
    }

    openStageDialog = () => Dialog.openDialogComponent(DialogOreStage, { idStudente: parseInt(this.props.match.params.id) })
    
    openModifica = () => {
        const dialog = Dialog.openDialog({
            title: Components[ComponentsPaths.PATH_GESTORI_EDIT_STUDENTE].pageTitle,
            content: <EditStudente {...this.props} onSave={() => {
                dialog.close()
                this.loadStudente()
            }} />,
            hideFooter: true,
            width: "70vw",
            icon: <Icon iconKey="user-edit" type="far" />
        })
    }

    goToFullDetail = () => {
        this.props.dialogClose()
        goTo(ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/" + this.props.match.params.id)
    }

    render = (): JSX.Element => {
        const { studente, totPresenze, oreTotali } = this.state,
        idStudente = this.props.match.params.id,
        color = studente?.frequenza >= 80 ? "green" : "red"

        if(!studente) return <LoadingIconCentered />

        return <div>
            <div className="row mx-0">
                <Card title={"Studente " + (studente.promosso ? "archiviato" : "attivo")} className="col-12 col-md mr-0 mr-md-2 mb-3">
                    {
                        dateIsToday(studente.dataNascita) && <Icon iconKey="birthday-cake" large tooltip="Oggi è il compleanno" className="star-animated ml-2 float-right" />
                    }

                    <h2 className="text-uppercase mb-2 text-truncate">{studente.nome} {studente.cognome}</h2>

                    <div className="mb-1">
                        <Icon large type="far" iconKey="calendar-day" className="mr-1" /> {formatWithMonth(studente.dataNascita)}
                    </div>
                    <div>
                        <Icon large type="far" iconKey="envelope" className="mr-1" /> <a data-tooltip="Invia e-mail" href={"mailto:" + studente.email}>{studente.email}</a>
                    </div>

                    <CardActions className="text-right">
                        {
                            this.props.dialogClose ? <Button textBtn onClick={this.goToFullDetail} btnColor="black" tooltip="Vedi dettaglio completo" className="mr-3">
                                <DetailIcon large />
                            </Button> : null
                        }

                        <Button textBtn onClick={this.openModifica} btnColor="orange" tooltip="Modifica">
                            <EditIcon large />
                        </Button>
                    </CardActions>
                </Card>

                <Card title="Presenze totali (escluso stage)" className="col-12 col-md mb-3">
                    {
                        <Progress circular percent={studente.frequenza} circleWidth={80} className="mr-3" color={color} convertCommas />
                    }

                    <div className="progress-label">
                        {
                            oreTotali != null && totPresenze != null ? <span>
                                {formatNumber(totPresenze)}/{formatNumber(oreTotali)}
                            </span> : <LoadingIcon spinning />
                        }
                    </div>

                    <CardActions className="text-right">
                        <Button textBtn onClick={this.openStageDialog} btnColor="darkblue" tooltip="Ore di stage">
                            <Icon iconKey="clipboard-list-check" className="fa-2x" notFW />
                        </Button>
                    </CardActions>
                </Card>
            </div>

            <TabellaPresenze targetId={parseInt(idStudente)} reloadTotali={this.loadStudente} isDialog={!!this.props.dialogClose} />
        </div>
    }
}