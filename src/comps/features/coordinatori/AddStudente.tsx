import React from "react"
import DatePicker from "../../form/DatePicker"
import { Option } from "../../form/Option"
import Select from "../../form/Select"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"

export interface IState{
    readonly nome: string
    readonly cognome: string
    readonly anno: number
    readonly email: string
    readonly dataNascita: string
    readonly cf: string
    readonly loading: boolean
}

export class AddStudente extends React.PureComponent<undefined, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            anno: 1,
            dataNascita: "",
            cf: "",
            loading: false
        }
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeDataNascita = (dataNascita: string) => this.setState({ dataNascita })

    changeAnno = (anno: number) => this.setState({ anno })
    
    creaStudente = (e: any) => {
        e.preventDefault()

        const { nome, cognome, email, cf, anno, dataNascita } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendCF === "" || dataNascita === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        if(anno !== 1 && anno !== 2)
            return NotificationMsg.showError("Classe non valida!")

        this.setState({ loading: true })

        setTimeout(() => this.setState({ loading: false }), 2000)
    }

    render = (): JSX.Element => {
        const { loading } = this.state

        return <form onSubmit={this.creaStudente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loading} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loading} />
                </div>

                <div className="col-12 col-md-6">
                    <DatePicker label="Data di nascita" onChange={this.changeDataNascita} disabled={loading} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loading} maxLength={16} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" disabled={loading} />
                </div>

                
                <div className="col-12 col-md-6">
                    <Select label="Anno frequentato" disabled={loading} onChange={this.changeAnno} icon={{ iconKey: "graduation-cap" }}>
                        <Option label="Primo anno" value={1} />
                        <Option label="Secondo anno" value={2} />
                    </Select>
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loading}>
                Aggiungi studente
            </Button>
        </form>
    }
}