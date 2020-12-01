import React from "react"
import { formatItalian, getTime, LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import { Table } from "../../layout/Table"

export interface IProps{
    readonly visible: boolean
    readonly idStudente: number
    readonly onClose: () => void
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

    componentDidUpdate = () => {
        StudentiService.getOreStage(this.props.idStudente).then(response => {
            this.setState({
                listaOre: response.data
            })
        })
    }

    downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," + this.state.listaOre.map(e => Object.values(e).join(";")).join("\n"),
        encodedUri = encodeURI(csvContent),
        link = document.createElement("a")

        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "OreStage.csv")
        document.body.appendChild(link)

        link.click()
    }

    render = (): JSX.Element => {
        const { listaOre } = this.state,
        props = this.props

        return <Dialog visible={props.visible} onClose={props.onClose} title="Ore di stage segnate" width="70vw" customFooter={[
            <Button textBtn onClick={props.onClose} btnColor="red">Chiudi</Button>,
            <Button onClick={this.downloadCSV} btnColor="darkblue" smallBtn disabled={!listaOre || !listaOre.length}>
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