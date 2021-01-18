import React from "react"
import { getTime, LoadingIconCentered } from "../../../commons/utility"
import { Presenza } from "../../../models/Presenza"
import { PresenzeService } from "../../../services/PresenzeService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { FullLoader } from "../../layout/FullLoader"
import { EditIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { EditPresenza } from "./dialogs/DialogEditPresenza"

export interface IProps{
    readonly targetId: number
    readonly isDocente?: boolean
    readonly reloadTotali: () => void
    readonly isDialog?: boolean
}
export interface IState{
    readonly presenze: Presenza[]
    readonly nextPage: boolean
    readonly page: number
    readonly totalSize: number
    readonly bigLoader: { close?: () => void }
}

export class TabellaPresenze extends React.PureComponent<IProps, IState>{
    readonly START_PAGE = 1

    constructor(props: IProps){
        super(props)

        this.state = {
            presenze: null,
            nextPage: false,
            page: this.START_PAGE,
            totalSize: 0,
            bigLoader: null
        }
    }

    loadPresenze = () => {
        if(this.state.page > 1)
            this.setState({ bigLoader: FullLoader.show() })

        PresenzeService.getPresenze(this.props.targetId, this.props.isDocente, this.state.page).then(response => {
            const obj = response.data as { presenze: Presenza[], totalSize: number },
            presenze = obj.presenze.map(p => {
                let newP = {...p}
                newP.oraEntrata = getTime(p.oraEntrata)
                newP.oraUscita = getTime(p.oraUscita)

                return newP
            })

            this.setState({
                presenze,
                nextPage: obj.totalSize > obj.presenze.length,
                totalSize: obj.totalSize,
                bigLoader: null
            }, this.state.bigLoader?.close)
        })
    }

    checkForPresences = () => {
        if(this.state.nextPage && Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.state.presenze && !this.state.bigLoader)
            this.setState({ page: this.state.page + 1 }, this.loadPresenze)
    }

    componentDidMount = () => {
        !this.props.isDialog && window.addEventListener("scroll", this.checkForPresences)

        this.loadPresenze()
    }

    componentWillUnmount = () => window.removeEventListener("scroll", this.checkForPresences)

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
        const { presenze, totalSize } = this.state

        if(!presenze) return <LoadingIconCentered />

        return <div>
            <h3 className="mr-3">Presenze firmate</h3>
            <span className="float-right">{presenze.length} su {totalSize} totali</span>
            <div className="clearfix"></div>

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