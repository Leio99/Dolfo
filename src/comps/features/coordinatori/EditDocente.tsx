import React, { FormEvent } from "react"
import { RouteComponentProps } from "react-router-dom"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { CorsiService } from "../../../services/CorsiService"
import { DocentiService } from "../../../services/DocentiService"
import { MaterieService } from "../../../services/MaterieService"
import { Option } from "../../form/Option"
import Select from "../../form/Select"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

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
    readonly materieList: any[]
    readonly corsiList: any[]
    readonly materieScelte: number[]
    readonly corsiScelti: number[]
    readonly docente: any
}

export class EditDocente extends React.PureComponent<IProps, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: IProps){
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
            materieScelte: [],
            docente: null
        }
    }

    componentDidMount = () => {
        DocentiService.getDocente(this.props.match.params.id).then(response => {
            this.setState({
                ...response.data,
                docente: response.data,
                corsiScelti: response.data.corsi,
                materieScelte: response.data.materie
            })

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
        }).catch(() => goTo(ComponentsPaths.PATH_COORDINATORI_HOME))
    }

    changeNome = (nome: string) => this.setState({ nome })

    changeCognome = (cognome: string) => this.setState({ cognome })

    changeEmail = (email: string) => this.setState({ email })

    changeCF = (cf: string) => this.setState({ cf })

    changeMaterieScelte = (materieScelte: number[]) => this.setState({ materieScelte })

    changeCorsiScelti = (corsiScelti: number[]) => this.setState({ corsiScelti })

    toggleLoading = () => this.setState({ loadingForm: !this.state.loadingForm })
    
    editDocente = (e: FormEvent) => {
        e.preventDefault()

        const { nome, cognome, email, cf, materieScelte, corsiScelti, docente } = this.state,
        sendNome = nome.trim(),
        sendCognome = cognome.trim(),
        sendEmail = email.trim(),
        sendCF = cf.trim()

        if(sendNome === "" || sendCognome === "" || sendEmail === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(sendCF.length !== 16 && sendCF !== "")
            return NotificationMsg.showError("Codice Fiscale non valido!")

        if(!materieScelte.length)
            return NotificationMsg.showError("Scegliere almeno una materia!")

        if(!corsiScelti.length)
            return NotificationMsg.showError("Scegliere almeno un corso!")

        this.toggleLoading()

        DocentiService.editDocente(docente.idDocente, {
            idDocente: parseInt(this.props.match.params.id),
            nome: sendNome,
            cognome: sendCognome,
            email: sendEmail,
            cf: sendCF,
            tenere: corsiScelti.map(c => { return { idCorso: c, idDocente: docente.idDocente } }),
            insegnare: materieScelte.map(m => { return { idMateria: m, idDocente: docente.idDocente } }),
            ritirato: docente.ritirato
        }).then(() => {
            this.toggleLoading()
            this.props.onSave && this.props.onSave()
            NotificationMsg.showSuccess("Docente modificato con successo!")
        }).catch(this.toggleLoading)
    }

    render = (): JSX.Element => {
        const { loadingForm, corsiList, materieList, nome, cognome, cf, corsiScelti, materieScelte, email, docente } = this.state

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
                
                <div className="col-12 col-md-6">
                    <Select label="Materie insegnate" disabled={loadingForm} onChange={this.changeMaterieScelte} icon={{ iconKey: "list-alt" }} multiple loading={!materieList} canSearch required defaultValue={materieScelte}>
                        {
                            materieList?.map(m => <Option label={m.nome} value={m.idMateria} />)
                        }
                    </Select>
                </div>

                <div className="col-12 col-md-6">
                    <Select label="Corsi in cui insegna" disabled={loadingForm} onChange={this.changeCorsiScelti} icon={{ iconKey: "chalkboard-teacher" }} multiple loading={!corsiList} required defaultValue={corsiScelti}>
                        {
                            corsiList?.map(c => <Option label={c.nome} value={c.idCorso} />)
                        }
                    </Select>
                </div>
            </div>

            <Button type="submit" className="mt-2 text-uppercase" btnColor="green" bigBtn fullSize loading={loadingForm}>
                Salva docente
            </Button>
        </form>
    }
}