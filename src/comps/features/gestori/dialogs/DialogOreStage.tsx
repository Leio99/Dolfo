import React from "react"
import { formatNumber, LoadingIconCentered } from "../../../../commons/utility"
import { StudentiService } from "../../../../services/StudentiService"
import { Dialog, ComponentAsDialogProps } from "../../../layout/Dialog"
import { LoadingIcon } from "../../../layout/Icon"
import { Table } from "../../../layout/Table"

export interface IProps extends ComponentAsDialogProps{
    readonly idStudente: number
}
export interface IState{
    readonly listaOre: any[]
    readonly oreTotali: number
}

export class DialogOreStage extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            listaOre: null,
            oreTotali: null
        }
    }

    componentDidMount = () => {
        StudentiService.getOreStage(this.props.idStudente).then(response => {
            this.setState({
                listaOre: response.data
            })
        }).catch(() => this.setState({ listaOre: [] }))

        StudentiService.getTotaleOreStage(this.props.idStudente).then(response => {
            this.setState({
                oreTotali: response.data
            })
        }).catch(() => this.setState({ oreTotali: 0 }))
    }

    render = (): JSX.Element => {
        const { listaOre, oreTotali } = this.state

        return <Dialog overflows={!!listaOre} visible clickOutside onClose={this.props.close} title={<span>
            Ore di stage segnate (totale: {oreTotali === null ? <LoadingIcon spinning /> : formatNumber(oreTotali)})
        </span>} width="70vw" hideFooter>
            {
                listaOre ? <Table columns={[
                    { label: "Data", field: "data", canSearch: true, align: "center", type: "date" },
                    { label: "Descrizione", field: "descrizione", width: "30%", tooltip: true },
                    { label: "Ora inizio", field: "oraInizio", align: "center", type: "time" },
                    { label: "Ora fine", field: "oraFine", align: "center", type: "time" },
                    { label: "Ore svolte", field: "totaleRelativo", align: "center" },
                ]} data={listaOre.map(o => {
                    let temp = {...o}
                    temp.totaleRelativo = formatNumber(o.totaleRelativo)

                    return temp
                })} exportable exportFormat={["csv"]} /> : <LoadingIconCentered />
            }
        </Dialog>
    }
}