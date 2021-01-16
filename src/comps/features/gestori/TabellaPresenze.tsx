import React from "react"
import { getTime, LoadingIconCentered } from "../../../commons/utility"
import { Presenza } from "../../../models/Presenza"
import { PresenzeService } from "../../../services/PresenzeService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { EditIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { EditPresenza } from "./dialogs/DialogEditPresenza"

export interface IProps{
    readonly targetId: number
    readonly isDocente?: boolean
    reloadTotali: () => void
}
export interface IState{
    readonly presenze: Presenza[]
}

export class TabellaPresenze extends React.PureComponent<IProps, IState>{

    constructor(props: IProps){
        super(props)

        this.state = {
            presenze: null
        }
    }

    componentDidMount = () => {

        PresenzeService.getPresenze(this.props.targetId, this.props.isDocente).then(response => {
            const presenze = response.data as Presenza[]

            this.setState({
                presenze: presenze.map(p => {
                    let newP = {...p}
                    newP.oraEntrata = getTime(p.oraEntrata)
                    newP.oraUscita = getTime(p.oraUscita)

                    return newP
                })
            })
        })
    }

    savePresenza = (presenza: Presenza) => {
        this.setState({
            presenze: this.state.presenze.map(p => {
                if(p.id === presenza.id) return presenza

                return p
            })
        })

        this.props.reloadTotali()
    }

    editPresenza = (presenza: Presenza) => Dialog.openDialogComponent(EditPresenza, { presenza, onSave: this.savePresenza })

    render = (): JSX.Element => {
        const { presenze } = this.state

        if(!presenze) return <LoadingIconCentered />

        return <div>
            <h3>Presenze firmate</h3>

            <Table columns={[
                { label: "Data", field: "data", canSearch: true, width: 150, align: "center", type: "date" },
                { label: "Entrata", field: "oraEntrata", width: 200, align: "center" },
                { label: "Uscita", field: "oraUscita", width: 200, align: "center" },
                { label: "Lezione", field: "lezione", tooltip: true, canSearch: true },
                { label: "Azioni", field: "azioni", width: "20%", align: "center" },
            ]} data={
                presenze.map(p => {
                    let temp = {...p}
                    temp.oraUscita = p.oraUscita === "00:00" ? "Non firmata" : p.oraUscita
                    temp.azioni = <Button tooltip="Modifica orari" circleBtn onClick={() => this.editPresenza(p)} btnColor="orange">
                        <EditIcon />
                    </Button>

                    return temp
                })
            } />
        </div>
    }
}