import React from "react"
import { LoadingIconCentered } from "../../../../commons/utility"
import { Edizione } from "../../../../models/Edizione"
import { EdizioniService } from "../../../../services/EdizioniService"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { AddIcon, EditIcon } from "../../../layout/Icon"
import { Table } from "../../../layout/Table"
import { DialogAddEditEdizione } from "./DialogAddEditEdizione"

export interface IProps extends ComponentAsDialogProps{
    readonly idGestore: number
    readonly reloadEdizioni: (newList: Edizione[]) => void
}
export interface IState{
    readonly listaEdizioni: Edizione[]
}

export class DialogListaEdizioni extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            listaEdizioni: null
        }
    }

    reloadList = () => {
        this.setState({ listaEdizioni: null })        

        EdizioniService.getByGestore(this.props.idGestore).then(response => {
            this.setState({ listaEdizioni: response.data })
        })
    }

    componentDidMount = this.reloadList

    openAddEdizione = () => {
        Dialog.openDialogComponent(DialogAddEditEdizione, {
            idGestore: this.props.idGestore,
            reloadList: this.reloadList
        })
    }

    openEditEdizione = (edizione: Edizione) => {
        Dialog.openDialogComponent(DialogAddEditEdizione, {
            edizione,
            reloadList: this.reloadList
        })
    }

    closeDialog = () => {
        this.state.listaEdizioni && this.props.reloadEdizioni(this.state.listaEdizioni)
        this.props.close()
    }

    render = (): JSX.Element => {
        const { listaEdizioni } = this.state

        return <Dialog clickOutside visible onClose={this.closeDialog} customFooter={[
            <Button textBtn smallBtn btnColor="red" onClick={this.closeDialog}>Chiudi</Button>
        ]} title="Lista delle edizioni" overflows={!!listaEdizioni}>
            <div className="text-right mb-2">
                <Button  btnColor="green" textBtn onClick={this.openAddEdizione}>
                    <AddIcon /> Aggiungi
                </Button>
            </div>
            {
                !listaEdizioni ? <LoadingIconCentered /> : <Table columns={[
                    { field: "descrizione", label: "Descrizione", canSearch: true, tooltip: true, width: "80%" },
                    { field: "azioni", label: "Azioni", align: "center" },
                ]} data={listaEdizioni.map(e => {
                    let copy = {...e}

                    copy.azioni = <Button circleBtn btnColor="orange" onClick={() => this.openEditEdizione(e)} tooltip="Modifica">
                        <EditIcon />
                    </Button>

                    return copy
                })} />
            }
        </Dialog>
    }
}