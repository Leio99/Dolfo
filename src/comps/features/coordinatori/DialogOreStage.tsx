import React from "react"
import { downloadCSV, formatItalian, getTime, LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import Button from "../../layout/Button"
import { Dialog, ComponentAsDialogProps } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import { Table } from "../../layout/Table"

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
        const { listaOre } = this.state,
        props = this.props

        return <Dialog overflows visible clickOutside onClose={props.close} title="Ore di stage segnate" width="70vw" customFooter={[
            <Button onClick={() => downloadCSV(this.state.listaOre)} btnColor="blue" smallBtn disabled={!listaOre || !listaOre.length}>
                <Icon iconKey="download" /> Scarica CSV
            </Button>
        ]}>
            {
                listaOre ? <Table columns={[
                    { label: "Data", field: "data", canSearch: true, align: "center" },
                    { label: "Descrizione", field: "argomento", width: "30%", tooltip: true },
                    { label: "Ora inizio", field: "oraInizio", align: "center" },
                    { label: "Ora fine", field: "oraFine", align: "center" },
                    { label: "Ore svolte", field: "totaleRelativo", align: "center" },
                ]} data={listaOre.map(o => {
                    o.data = formatItalian(o.data)
                    o.oraInizio = getTime(o.oraInizio)
                    o.oraFine = getTime(o.oraFine)

                    return o
                })} /> : <LoadingIconCentered />
            }
        </Dialog>
    }
}