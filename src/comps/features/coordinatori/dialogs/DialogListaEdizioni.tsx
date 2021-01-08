import React from "react"
import { LoadingIconCentered } from "../../../../commons/utility"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { AddIcon } from "../../../layout/Icon"
import { Table } from "../../../layout/Table"
import { DialogAddEdizione } from "./DialogAddEdizione"

export interface IProps extends ComponentAsDialogProps{
    readonly idEnte: number
    readonly reloadEdizioni: (newList: any[]) => void
}
export interface IState{
    readonly listaEdizioni: any[]
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

        setTimeout(() => this.setState({
            listaEdizioni: [
                { desc: "Edizione 1", id: 1 },
                { desc: "Edizione 2", id: 2 }
            ]
        }), 2000)
    }

    componentDidMount = this.reloadList

    openAddEdizione = () => {
        Dialog.openDialogComponent(DialogAddEdizione, {
            idEnte: this.props.idEnte,
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
                    { field: "desc", label: "Descrizione", canSearch: true, tooltip: true, width: "80%" }
                ]} data={listaEdizioni} />
            }
        </Dialog>
    }
}