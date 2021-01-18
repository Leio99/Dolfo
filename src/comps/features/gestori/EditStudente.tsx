import React, { FormEvent } from "react"
import { RouteComponentProps } from "react-router-dom"
import { goTo, LoadingIconCentered, reverseDate } from "../../../commons/utility"
import { Studente } from "../../../models/Studente"
import { StudentiService } from "../../../services/StudentiService"
import DatePicker from "../../form/DatePicker"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPaths } from "../ComponentsPaths"

export interface IRouteParams{
    readonly id: string
}
export interface IProps extends RouteComponentProps<IRouteParams>{
    readonly onSave?: () => void
}
export interface IState{
    readonly nome: string
    readonly cognome: string
    readonly email: string
    readonly cf: string
    readonly dataNascita: Date
    readonly loading: boolean
    readonly loadingForm: boolean
    readonly studente: Studente
}

export class EditStudente extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            dataNascita: null,
            loading: true,
            loadingForm: false,
            studente: null
        }
    }

    componentDidMount = () => {
        StudentiService.getStudente(this.props.match.params.id).then(response => {
            const studente = response.data

            this.setState({
                ...studente,
                dataNascita: new Date(response.data.dataNascita),
                loading: false,
                studente
            })
        }).catch(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeDataNascita = (dataNascita: Date) => this.setState({ dataNascita })

    editStudente = (e: FormEvent) => {
        e.preventDefault()

        const { nome, cognome, email, cf, dataNascita, studente } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendCF === "" || !dataNascita || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        this.toggleLoading()

        StudentiService.editStudente(studente.id, {
            nome: sendNome,
            cognome: sendCognome,
            email: sendEmail,
            cf: sendCF,
            dataNascita: reverseDate(dataNascita)
        }).then(() => {
            this.toggleLoading()
            this.props.onSave && this.props.onSave()
            NotificationMsg.showSuccess("Studente modificato!")
        }).catch(this.toggleLoading)
    }

    toggleLoading = () => this.setState({ loadingForm: !this.state.loadingForm })

    render = (): JSX.Element => {
        const { nome, cognome, cf, email, dataNascita, loading, loadingForm } = this.state

        if(loading) return <LoadingIconCentered />

        return <form onSubmit={this.editStudente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" value={nome} icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loadingForm} required />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" value={cognome} icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loadingForm} required />
                </div>

                <div className="col-12 col-md-6">
                    <DatePicker defaultValue={new Date(dataNascita)} label="Data di nascita" onChange={this.changeDataNascita} disabled={loadingForm} required />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" value={cf} icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loadingForm} maxLength={16} required />
                </div>

                <div className="col-12">
                    <TextInput name="email" value={email} type="email" onChange={this.changeEmail} label="E-mail" disabled={loadingForm} required />
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Salva studente
            </Button>
        </form>
    }
}