import React from "react"
import { LoadingIconCentered } from "../../../../commons/utility"
import { StudentiService } from "../../../../services/StudentiService"
import { Dialog, ComponentAsDialogProps } from "../../../layout/Dialog"
import { Table } from "../../../layout/Table"

export interface IProps extends ComponentAsDialogProps{
    readonly idStudente: number
}
export interface IState{
    readonly listaOre: any[]
}

export class DialogOreStage extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            listaOre: null
        }
    }

    componentDidMount = () => {
        StudentiService.getOreStage(this.props.idStudente).then(response => {
            this.setState({
                listaOre: response.data
            })
        })
    }

    render = (): JSX.Element => {
        const { listaOre } = this.state

        return <Dialog overflows={!!listaOre} visible clickOutside onClose={this.props.close} title="Ore di stage segnate" width="70vw" hideFooter>
            {
                listaOre ? <Table columns={[
                    { label: "Data", field: "data", canSearch: true, align: "center", type: "date" },
                    { label: "Descrizione", field: "argomento", width: "30%", tooltip: true },
                    { label: "Ora inizio", field: "oraInizio", align: "center", type: "time" },
                    { label: "Ora fine", field: "oraFine", align: "center", type: "time" },
                    { label: "Ore svolte", field: "totaleRelativo", align: "center" },
                ]} data={listaOre} exportable exportFormat={["csv"]} /> : <LoadingIconCentered />
            }
        </Dialog>
    }
}