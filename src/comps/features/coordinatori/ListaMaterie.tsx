import React from "react"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { MaterieService } from "../../../services/MaterieService"
import { LoadingIconCentered } from "../../../commons/utility"
import Button from "../../layout/Button"
import { AddIcon, EditIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"
import { Dialog } from "../../layout/Dialog"
import { AddEditMateria } from "./AddEditMateria"

export interface IState{
    readonly materieList: any[]
}

export class ListaMaterie extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: undefined){
        super(props)

        this.state = {
            materieList: null
        }
    }

    componentDidMount = () => this.loadMaterie()

    loadMaterie = () => {
        MaterieService.getMaterie(this.session.idCorso).then(response => {
            this.setState({
                materieList: response.data
            })
        }).catch(() => this.setState({ materieList: [] }))
    }

    openAddMateria = () => {
        const dialog = Dialog.openDialog({
            title: "Nuova materia",
            hideFooter: true,
            content: <AddEditMateria reloadList={this.loadMaterie} closeDialog={() => dialog.close()} />
        })
    }

    openEditMateria = (materia: any) => {
        const dialog = Dialog.openDialog({
            title: "Modifica materia",
            hideFooter: true,
            content: <AddEditMateria reloadList={this.loadMaterie} closeDialog={() => dialog.close()} editMateria={materia} editing />
        })
    }

    render = (): JSX.Element => {
        const { materieList } = this.state

        if(!materieList) return <LoadingIconCentered />

        return <div>
            <Button btnColor="green" className="float-right" onClick={this.openAddMateria}>
                <AddIcon /> Aggiungi materia
            </Button>

            <div className="clearfix"></div>

            <div className="mt-3">
                <Table columns={[
                    { label: "Materia", field: "nome", canSearch: true, width: "90%", tooltip: true },
                    { label: "Azioni", field: "azioni" },
                ]} data={materieList.map(m => {
                    m.azioni = <Button circleBtn tooltip="Modifica" btnColor="orange" onClick={() => this.openEditMateria(m)}>
                        <EditIcon />
                    </Button>

                    return m
                })} />
            </div>
        </div>
    }
}