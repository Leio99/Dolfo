import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { dateIsToday, formatItalian, formatWithMonth, LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Dialog } from "../../layout/Dialog"
import { EditIcon, Icon, LoadingIcon } from "../../layout/Icon"
import { Progress } from "../../layout/Progress"
import { history } from "../../Navigator"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"
import { DialogOreStage } from "./DialogOreStage"
import { EditStudente } from "./EditStudente"
import TabellaPresenze from "./TabellaPresenze"

export interface IRouteParams{
    readonly id: string
}
export interface IState{
    readonly studente: any
    readonly totPresenze: number
    readonly oreTotali: number
}

export class DettaglioStudente extends React.PureComponent<RouteComponentProps<IRouteParams>, IState>{
    constructor(props: RouteComponentProps<IRouteParams>){
        super(props)

        this.state = {
            studente: null,
            totPresenze: 0,
            oreTotali: 0
        }
    }

    componentDidMount = () => this.loadStudente()

    loadStudente = () => {
        const id = this.props.match.params.id

        if(isNaN(parseInt(id)))
            history.push(ComponentsPaths.PATH_COORDINATORI_HOME)

        StudentiService.getStudente(id).then(response => {
            this.setState({
                studente: response.data
            })

            StudentiService.getOreStudente(id).then(response => {
                this.setState({
                    oreTotali: response.data as number
                })
            })
    
            this.loadTotali()
        }).catch(() => history.push(ComponentsPaths.PATH_COORDINATORI_HOME))
    }

    loadTotali = () => {
        this.setState({
            totPresenze: null
        })

        StudentiService.getTotaleOre(this.props.match.params.id).then(response => {
            this.setState({
                totPresenze: response.data as number
            })
        })
    }

    openStageDialog = () => Dialog.openDialogComponent(DialogOreStage, { idStudente: parseInt(this.props.match.params.id) })
    
    openModifica = () => {
        const dialog = Dialog.openDialog({
            title: Components[ComponentsPaths.PATH_COORDINATORI_EDIT_STUDENTE].pageTitle,
            content: <EditStudente {...this.props} onSave={() => {
                dialog.close()
                this.loadStudente()
            }} />,
            hideFooter: true,
            width: "70vw",
            icon: <Icon iconKey="user-edit" type="far" />
        })
    }

    render = (): JSX.Element => {
        const { studente, totPresenze, oreTotali } = this.state,
        idStudente = this.props.match.params.id,
        perc = studente?.frequenza !== null ? Math.round(100 * totPresenze / oreTotali) : null,
        color = perc >= 80 ? "green" : "red"

        if(!studente) return <LoadingIconCentered />

        return <div>
            <div className="row mx-0">
                <Card title={studente.ritirato ? "Ritirato: " + formatItalian(studente.dataRitiro) : studente.annoFrequentazione === 1 ? "Primo anno" : "Secondo anno"} className="col-12 col-md mr-0 mr-md-2 mb-3">
                    {
                        dateIsToday(studente.dataNascita) && <Icon iconKey="birthday-cake" large tooltip="Oggi è il compleanno" className="star-animated ml-2 float-right" />
                    }

                    <h2 className="text-uppercase mb-2 text-truncate">{studente.nome} {studente.cognome}</h2>

                    <div className="mb-1">
                        <Icon large type="far" iconKey="calendar-day" className="mr-1" /> {formatWithMonth(studente.dataNascita)}
                    </div>
                    <div className="d-inline">
                        <Icon large type="far" iconKey="envelope" className="mr-1" /> <a data-tooltip="Invia e-mail" href={"mailto:" + studente.email}>{studente.email}</a>
                    </div>

                    <div className="text-right">
                        <Button textBtn onClick={this.openModifica} btnColor="orange" tooltip="Modifica">
                            <EditIcon className="mr-2" large />
                        </Button>
                    </div>
                </Card>

                <Card title="Presenze totali (ore)" className="col-12 col-md mb-3">
                    <div className="float-left">
                        {
                            !isNaN(perc) ? <Progress circular percent={perc} circleWidth={80} className="mr-3" color={color} /> : <LoadingIcon spinning />
                        }

                        <div className="progress-label">
                            {
                                oreTotali !== null && totPresenze !== null ? <span>
                                    {totPresenze}/{oreTotali}
                                </span> : <LoadingIcon spinning />
                            }
                        </div>
                    </div>

                    <div className="clearfix"></div>

                    <div className="text-right">
                        <Button textBtn onClick={this.openStageDialog} btnColor="darkblue" tooltip="Ore di stage">
                            <Icon iconKey="clipboard-list-check" className="fa-2x" />
                        </Button>
                    </div>
                </Card>
            </div>

            <TabellaPresenze idStudente={parseInt(idStudente)} reloadTotali={this.loadTotali} />
        </div>
    }
}