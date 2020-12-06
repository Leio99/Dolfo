import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import DatePicker from "../../form/DatePicker"
import Select from "../../form/Select"
import { Option } from "../../form/Option"
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
    readonly dataNascita: string
    readonly annoFrequentazione: number
    readonly loading: boolean
    readonly loadingForm: boolean
    readonly studente: any
}

export class EditStudente extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            dataNascita: "",
            annoFrequentazione: 1,
            loading: true,
            loadingForm: false,
            studente: null
        }
    }

    componentDidMount = () => {
        StudentiService.getStudente(this.props.match.params.id).then(response => {
            this.setState({
                ...response.data,
                loading: false,
                studente: response.data
            })
        }).catch(() => goTo(ComponentsPaths.PATH_COORDINATORI_HOME))
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeDataNascita = (dataNascita: string) => this.setState({ dataNascita })

    editStudente = (e: any) => {
        e.preventDefault()

        const { nome, cognome, email, cf, annoFrequentazione, dataNascita, studente } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim(),
        idStudente = this.props.match.params.id

        if(sendNome === "" || sendCognome === "" || sendCF === "" || dataNascita === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        if(annoFrequentazione !== 1 && annoFrequentazione !== 2)
            return NotificationMsg.showError("Classe non valida!")

        this.toggleLoading()

        StudentiService.editStudente(idStudente, {
            idStudente: parseInt(idStudente),
            nome: sendNome,
            cognome: sendCognome,
            email: sendEmail,
            cf: sendCF,
            annoFrequentazione,
            dataNascita: new Date(dataNascita),
            promosso: studente.promosso,
            ritirato: studente.ritirato,
            idCorso: studente.idCorso
        }).then(() => {
            this.toggleLoading()
            this.props.onSave && this.props.onSave()
            NotificationMsg.showSuccess("Studente modificato!")
        }).catch(this.toggleLoading)
    }

    toggleLoading = () => this.setState({ loadingForm: !this.state.loadingForm })

    render = (): JSX.Element => {
        const { nome, cognome, cf, email, dataNascita, loading, loadingForm, annoFrequentazione } = this.state

        if(loading) return <LoadingIconCentered />

        return <form onSubmit={this.editStudente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" value={nome} icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loadingForm} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" value={cognome} icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loadingForm} />
                </div>

                <div className="col-12 col-md-6">
                    <DatePicker defaultValue={new Date(dataNascita)} label="Data di nascita" onChange={this.changeDataNascita} disabled={loadingForm} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" value={cf} icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loadingForm} maxLength={16} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="email" value={email} type="email" onChange={this.changeEmail} label="E-mail" disabled={loadingForm} />
                </div>

                
                <div className="col-12 col-md-6">
                    <Select label="Anno frequentato" defaultValue={annoFrequentazione} disabled icon={{ iconKey: "graduation-cap" }}>
                        <Option label="Primo anno" value={1} />
                        <Option label="Secondo anno" value={2} />
                    </Select>
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Salva studente
            </Button>
        </form>
    }
}