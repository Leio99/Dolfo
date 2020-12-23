import React from "react"
import { convertFromUTC, getDateTime, LoadingIconCentered } from "../../../commons/utility"
import { PresenzeService } from "../../../services/PresenzeService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { EditIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { EditPresenza } from "./dialogs/DialogEditPresenza"

export interface IProps{
    readonly idStudente: number
    reloadTotali: () => void
}
export interface IState{
    readonly presenze: any[]
}

export class TabellaPresenze extends React.PureComponent<IProps, IState>{

    constructor(props: IProps){
        super(props)

        this.state = {
            presenze: null
        }
    }

    componentDidMount = () => {
        PresenzeService.getPresenzeStudente(this.props.idStudente).then(response => {

            let presenze = response.data as any[]

            this.setState({
                presenze: presenze.map(p => {
                    p.ingresso = convertFromUTC(p.ingresso)
                    p.uscita = getDateTime(p.uscita) === "00:00" ? "Non firmata" : convertFromUTC(p.uscita)

                    return p
                })
            })
        })
    }

    savePresenza = (presenza: any) => {
        this.setState({
            presenze: this.state.presenze.map(p => {
                if(p.idPresenza === presenza.idPresenza) return presenza

                return p
            })
        })

        this.props.reloadTotali()
    }

    editPresenza = (presenza: any) => Dialog.openDialogComponent(EditPresenza, { presenza, onSave: this.savePresenza })

    render = (): JSX.Element => {
        const { presenze } = this.state

        if(!presenze) return <LoadingIconCentered />

        return <div>
            <h3>Presenze dello studente</h3>

            <Table columns={[
                { label: "Data", field: "data", canSearch: true, width: 150, align: "center", type: "date" },
                { label: "Entrata", field: "ingresso", width: 200, align: "center" },
                { label: "Uscita", field: "uscita", width: 200, align: "center" },
                { label: "Lezione", field: "lezione", tooltip: true, canSearch: true },
                { label: "Azioni", field: "azioni", width: "20%", align: "center" },
            ]} data={
                presenze.map(p => {
                    p.azioni = <Button tooltip="Modifica orari" circleBtn onClick={() => this.editPresenza(p)} btnColor="orange">
                        <EditIcon />
                    </Button>

                    return p
                })
            } />
        </div>
    }
}