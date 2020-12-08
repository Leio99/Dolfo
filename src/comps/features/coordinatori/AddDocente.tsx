import React from "react"
import { CorsiService } from "../../../services/CorsiService"
import { MaterieService } from "../../../services/MaterieService"
import { Option } from "../../form/Option"
import Select from "../../form/Select"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly nome: string
    readonly cognome: string
    readonly email: string
    readonly cf: string
    readonly loadingForm: boolean
    readonly materieList: any[]
    readonly corsiList: any[]
    readonly materieScelte: number[]
    readonly corsiScelti: number[]
}

export class AddDocente extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: undefined){
        super(props)

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            cf: "",
            loadingForm: false,
            materieList: null,
            corsiList: null,
            corsiScelti: [],
            materieScelte: []
        }
    }

    componentDidMount = () => {
        CorsiService.getCorsi().then(response => {
            this.setState({
                corsiList: response.data
            })
        })

        MaterieService.getMaterie(this.session.idCorso).then(response => {
            this.setState({
                materieList: response.data
            })
        })
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeMaterieScelte = (materieScelte: number[]) => this.setState({ materieScelte })

    changeCorsiScelti = (corsiScelti: number[]) => this.setState({ corsiScelti })
    
    creaDocente = (e: any) => {
        e.preventDefault()

        const { nome, cognome, email, cf, materieScelte, corsiScelti } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendCF === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16)
            return NotificationMsg.showError("Codice Fiscale non valido!")

        if(!materieScelte.length)
            return NotificationMsg.showError("Scegliere almeno una materia!")

        if(!corsiScelti.length)
            return NotificationMsg.showError("Scegliere almeno un corso!")

        this.setState({ loadingForm: true })

        setTimeout(() => this.setState({ loadingForm: false }), 2000)
    }

    render = (): JSX.Element => {
        const { loadingForm, corsiList, materieList } = this.state

        return <form onSubmit={this.creaDocente}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextInput name="nome" icon={{ iconKey: "user" }} onChange={this.changeNome} label="Nome" disabled={loadingForm} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cognome" icon={{ iconKey: "user" }} onChange={this.changeCognome} label="Cognome" disabled={loadingForm} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="cf" icon={{ iconKey: "address-card" }} onChange={this.changeCF} label="Codice Fiscale" disabled={loadingForm} maxLength={16} />
                </div>

                <div className="col-12 col-md-6">
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" disabled={loadingForm} />
                </div>
                
                <div className="col-12 col-md-6">
                    <Select label="Materie insegnate" disabled={loadingForm} onChange={this.changeMaterieScelte} icon={{ iconKey: "list-alt" }} multiple loading={!materieList} canSearch>
                        {
                            materieList?.map(m => <Option label={m.nome} value={m.idMateria} />)
                        }
                    </Select>
                </div>

                <div className="col-12 col-md-6">
                    <Select label="Corsi in cui insegna" disabled={loadingForm} onChange={this.changeCorsiScelti} icon={{ iconKey: "chalkboard-teacher" }} multiple loading={!corsiList}>
                        {
                            corsiList?.map(c => <Option label={c.nome} value={c.idCorso} />)
                        }
                    </Select>
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Aggiungi docente
            </Button>
        </form>
    }
}