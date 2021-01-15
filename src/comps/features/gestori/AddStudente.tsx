import React, { FormEvent } from "react"
import { goTo, reverseDate } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import DatePicker from "../../form/DatePicker"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly nome: string
    readonly cognome: string
    readonly email: string
    readonly dataNascita: Date
    readonly cf: string
    readonly loading: boolean
}

export class AddStudente extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(props: undefined){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            dataNascita: null,
            cf: "",
            loading: false
        }
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeDataNascita = (dataNascita: Date) => this.setState({ dataNascita })

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    creaStudente = (e: FormEvent) => {
        e.preventDefault()

        const { nome, cognome, email, cf, dataNascita } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendCF === "" || !dataNascita || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        this.toggleLoading()

        StudentiService.addStudenti(this.session.idGestore, [{
            nome: sendNome,
            cognome: sendCognome,
            cf: sendCF,
            dataNascita: reverseDate(dataNascita),
            email: sendEmail
        }]).then(() => {
            this.toggleLoading()
            NotificationMsg.showSuccess("Studente creato con successo!")
            goTo(ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI)
        }).catch(this.toggleLoading)
    }

    goToImportCSV = () => goTo(ComponentsPaths.PATH_GESTORI_IMPORT_STUDENTI)

    render = (): JSX.Element => {
        const { loading } = this.state

        return <form onSubmit={this.creaStudente}>
            <div className="row">
                <div className="col-12 col-md-4">
                    <TextInput name="nome" icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loading} required />
                </div>

                <div className="col-12 col-md-4">
                    <TextInput name="cognome" icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loading} required />
                </div>

                <div className="col-12 col-md-4">
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" disabled={loading} required />
                </div>

                <div className="col-12 col-md-6">
                    <DatePicker label="Data di nascita" onChange={this.changeDataNascita} disabled={loading} required />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loading} maxLength={16} required />
                </div>
            </div>

            <div className="d-flex">
                <Button btnColor="blue" tooltip="Importa da CSV" className="mx-4 mt-2" textBtn bigBtn onClick={this.goToImportCSV}>
                    <Icon iconKey="upload" />
                </Button>
            
                <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loading}>
                    Aggiungi studente
                </Button>
            </div>
        </form>
    }
}