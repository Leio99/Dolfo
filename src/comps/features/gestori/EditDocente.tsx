import React, { FormEvent } from "react"
import { RouteComponentProps } from "react-router-dom"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { Docente } from "../../../models/Docente"
import { DocentiService } from "../../../services/DocentiService"
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
    readonly loadingForm: boolean
    readonly docente: Docente
}

export class EditDocente extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            loadingForm: false,
            docente: null
        }
    }

    componentDidMount = () => {
        DocentiService.getDocente(this.props.match.params.id).then(response => {
            this.setState({
                ...response.data,
                docente: response.data
            })
        }).catch(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    toggleLoading = () => this.setState({ loadingForm: !this.state.loadingForm })
    
    editDocente = (e: FormEvent) => {
        e.preventDefault()

        const { nome, cognome, email, cf, docente } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16 && sendCF !== "")
            return NotificationMsg.showError("Codice Fiscale non valido!")

        this.toggleLoading()

        DocentiService.editDocente(docente.id, {
            nome: sendNome,
            cognome: sendCognome,
            email: sendEmail,
            cf: sendCF,
        }).then(() => {
            this.toggleLoading()
            this.props.onSave && this.props.onSave()
            NotificationMsg.showSuccess("Docente modificato con successo!")
        }).catch(this.toggleLoading)
    }

    render = (): JSX.Element => {
        const { loadingForm, nome, cognome, cf, email, docente } = this.state

        if(!docente) return <LoadingIconCentered />

        return <form onSubmit={this.editDocente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loadingForm} required value={nome} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loadingForm} required value={cognome} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loadingForm} maxLength={16} value={cf} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" disabled={loadingForm} required value={email} />
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Salva docente
            </Button>
        </form>
    }
}