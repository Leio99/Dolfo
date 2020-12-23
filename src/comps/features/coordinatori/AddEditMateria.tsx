import React, { FormEvent } from "react"
import { MaterieService } from "../../../services/MaterieService"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IProps{
    readonly reloadList: () => void
    readonly closeDialog: () => void
    readonly editing?: boolean
    readonly editMateria?: any
}
export interface IState{
    readonly nome: string
    readonly loading: boolean
}

export class AddEditMateria extends React.PureComponent<IProps, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: IProps){
        super(props)

        this.state = {
            nome: props.editing && props.editMateria ? props.editMateria.nome : "",
            loading: false
        }
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    changeNome = (nome: string) => this.setState({ nome })

    addMateria = (e: FormEvent) => {
        e.preventDefault()

        const { nome } = this.state,
        { editing, editMateria } = this.props

        if(nome.trim() === "")
            return NotificationMsg.showError("Inserire un nome per la materia!")

        this.toggleLoading()

        !editing ? MaterieService.addMateria(this.session.idCorso, nome).then(() => {
            this.props.reloadList()
            this.props.closeDialog()
        }) : MaterieService.editMateria(editMateria.idMateria, nome).then(() => {
            this.props.reloadList()
            this.props.closeDialog()
        })
    }

    render = (): JSX.Element => {
        const { loading, nome } = this.state,
        { editing } = this.props

        return <form onSubmit={this.addMateria}>
            <TextInput icon={{ iconKey: "money-check-edit" }} label="Nome della materia" onChange={this.changeNome} value={nome} disabled={loading} required />

            <div className="text-right">
                <Button type="submit" className="mt-2 text-uppercase" fullSize btnColor="green" loading={loading}>
                    {editing ? "Salva" : "Aggiungi"} materia
                </Button>
            </div>
        </form>
    }
}