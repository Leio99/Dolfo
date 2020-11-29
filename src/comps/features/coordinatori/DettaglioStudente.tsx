import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { formatItalian, LoadingIconCentered } from "../../../commons/utility";
import { StudentiService } from "../../../services/StudentiService";
import { Card } from "../../layout/Card";
import { LoadingIcon } from "../../layout/Icon";
import { Progress } from "../../layout/Progress";
import { history } from "../../Navigator";
import { ComponentsPaths } from "../ComponentsPaths";
import TabellaPresenze from "./TabellaPresenze";

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

    componentDidMount = () => {
        let id = this.props.match.params.id

        if(isNaN(parseInt(id)))
            history.push(ComponentsPaths.PATH_COORDINATORI_HOME)

        StudentiService.getStudente(id).then(response => {
            this.setState({
                studente: response.data
            })
        }).catch(() => history.push(ComponentsPaths.PATH_COORDINATORI_HOME))

        StudentiService.getOreStudente(id).then(response => {
            this.setState({
                oreTotali: response.data as number
            })
        })

        this.loadTotali()
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

    render = (): JSX.Element => {
        const { studente, totPresenze, oreTotali } = this.state,
        idStudente = this.props.match.params.id,
        perc = studente?.frequenza !== null ? Math.round(100 * totPresenze / oreTotali) : null,
        color = perc >= 80 ? "green" : "red"

        if(!studente) return <LoadingIconCentered />

        return <div>
            <div className="row mx-0">
                <Card title={studente.ritirato ? "Ritirato: " + formatItalian(studente.dataRitiro) : studente.annoFrequentazione === 1 ? "Primo anno" : "Secondo anno"} className="col-12 col-md mr-0 mr-md-2 mb-3">
                    <h3 className="text-uppercase mb-2 text-truncate">{studente.nome} {studente.cognome}</h3>
                    <p className="mb-0"><strong>Data di nascita</strong>: {formatItalian(studente.dataNascita)}</p>
                    <p className="mb-0"><strong>E-mail</strong>: {studente.email}</p>
                </Card>

                <Card title="Presenze totali (ore)" className="col-12 col-md mb-3">
                    {
                        !isNaN(perc) ? <Progress circular percent={perc} circleWidth={80} className="float-left mr-3" color={color} /> : <LoadingIcon spinning />
                    }

                    <div className="progress-label">
                        {
                            oreTotali !== null && totPresenze !== null ? <span>
                                {totPresenze}/{oreTotali}
                            </span> : <LoadingIcon spinning />
                        }
                    </div>
                </Card>
            </div>

            <TabellaPresenze idStudente={parseInt(idStudente)} reloadTotali={this.loadTotali} />
        </div>
    }
}