import React, { FormEvent } from "react"
import { goTo } from "../../../commons/utility"
import { DocentiService } from "../../../services/DocentiService"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly nome: string
    readonly cognome: string
    readonly email: string
    readonly cf: string
    readonly loadingForm: boolean
}

export class AddDocente extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(props: undefined){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            loadingForm: false
        }
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    creaDocente = (e: FormEvent) => {
        e.preventDefault()

        const { nome, cognome, email, cf } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16 && sendCF !== "")
            return NotificationMsg.showError("Codice Fiscale non valido!")

        this.toggleLoading()

        DocentiService.addDocente(this.session.idEnte, [{
            nome: sendNome,
            cf: sendCF,
            cognome: sendCognome,
            email: sendEmail
        }]).then(() => {
            this.toggleLoading()
            NotificationMsg.showSuccess("Docente creato con successo!")
            goTo(ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI)
        }).catch(this.toggleLoading)
    }

    toggleLoading = () => this.setState({ loadingForm: !this.state.loadingForm })

    render = (): JSX.Element => {
        const { loadingForm } = this.state

        return <form onSubmit={this.creaDocente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loadingForm} required />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loadingForm} required />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loadingForm} maxLength={16} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" disabled={loadingForm} required />
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Aggiungi docente
            </Button>
        </form>
    }
}