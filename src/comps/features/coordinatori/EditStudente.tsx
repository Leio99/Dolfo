import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { LoadingIconCentered } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import DatePicker from "../../form/DatePicker"
import Select from "../../form/Select"
import { Option } from "../../form/Option"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"

export interface IRouteParams{
    readonly id: string
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
}

export class EditStudente extends React.PureComponent<RouteComponentProps<IRouteParams>, IState>{
    constructor(props: RouteComponentProps<IRouteParams>){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            dataNascita: "",
            annoFrequentazione: 1,
            loading: true,
            loadingForm: false
        }
    }

    componentDidMount = () => {
        StudentiService.getStudente(this.props.match.params.id).then(response => {
            this.setState({
                ...response.data,
                loading: false
            })
        })
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeDataNascita = (dataNascita: string) => this.setState({ dataNascita })

    changeAnno = (annoFrequentazione: number) => this.setState({ annoFrequentazione })

    editStudente = (e: any) => {
        e.preventDefault()

        const { nome, cognome, email, cf, annoFrequentazione, dataNascita } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendCF === "" || dataNascita === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        if(annoFrequentazione !== 1 && annoFrequentazione !== 2)
            return NotificationMsg.showError("Classe non valida!")

        this.setState({ loadingForm: true })

        setTimeout(() => this.setState({ loadingForm: false }), 2000)
    }

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
                    <Select label="Anno frequentato" defaultValue={annoFrequentazione} disabled onChange={this.changeAnno} icon={{ iconKey: "graduation-cap" }}>
                        <Option label="Primo anno" value={1} />
                        <Option label="Secondo anno" value={2} />
                    </Select>
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Modifica studente
            </Button>
        </form>
    }
}