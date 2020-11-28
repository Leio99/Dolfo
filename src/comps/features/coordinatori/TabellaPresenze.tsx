import React from "react"
import { convertFromUTC, formatItalian, getDateTime } from "../../../commons/utility"
import { StudentiService } from "../../../services/StudentiService"
import TimePicker from "../../form/TimePicker"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { CheckIcon, CloseIcon, EditIcon, LoadingIcon } from "../../layout/Icon"
import { Table } from "../../layout/Table"

export interface IProps{
    readonly idStudente: number
    reloadTotali(): void
}
export interface IState{
    readonly presenze: any[]
    readonly editingList: any[]
    readonly loading: boolean
}

export default class TabellaPresenze extends React.PureComponent<IProps, IState>{

    constructor(props: IProps){
        super(props)

        this.state = {
            presenze: null,
            editingList: [],
            loading: false
        }
    }

    componentDidMount = () => {
        StudentiService.getPresenze(this.props.idStudente).then(response => {

            let presenze = response.data as any[]

            this.setState({
                presenze: presenze.map(p => {
                    p.ingresso = convertFromUTC(p.ingresso)
                    p.uscita = getDateTime(p.uscita) === "00:00" ? "Non firmata" : convertFromUTC(p.uscita)

                    return p
                })
            })
        })
    }

    changeEntrata = (entrata: string, idPresenza: number) => {
        let presenze = this.state.editingList.map(p => {
            if(p.idPresenza === idPresenza)
                p.ingresso = entrata

            return p
        }) 

        this.setState({
            editingList: presenze
        })
    }

    changeUscita = (uscita: string, idPresenza: number) => {
        let presenze = this.state.editingList.map(p => {
            if(p.idPresenza === idPresenza)
                p.uscita = uscita

            return p
        }) 

        this.setState({
            editingList: presenze
        })
    }

    startTimeEdit = (p: any) => {
        this.setState({
            editingList: this.state.editingList.concat(p)
        })
    }

    confirmEdit = (id: number) => {
        const { presenze, editingList } = this.state,
        presenza = editingList.find(p => p.idPresenza === id),
        data = new Date()

        this.toggleLoading()

        StudentiService.editPresenza(id, {
            idPresenza: presenza.idPresenza,
            idStudente: presenza.idStudente,
            ingresso: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${presenza.ingresso}`),
            uscita: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${presenza.uscita}`),
            idLezione: presenza.idLezione
        }).then(response => {
            let output = response.data

            if(output.trim() === "success"){
                let newPresenze = presenze.map(p => {
                    if(p.idPresenza === id){
                        return presenza
                    }

                    return p
                })

                this.setState({
                    presenze: newPresenze,
                    editingList: editingList.filter(p => p.idPresenza !== presenza.idPresenza)
                })

                this.props.reloadTotali()
            }else{
                Dialog.openDialog({
                    title: "Errore!",
                    content: output,
                    type: "error"
                })
            }

            this.toggleLoading()
        }).catch(this.toggleLoading)
    }

    getCategorie = () => {
        const { presenze } = this.state 
        let categorie: string[] = []

        presenze.forEach(p => {
            if(!categorie.includes(p.lezione))
                categorie.push(p.lezione)
        })

        return categorie
    }

    annullaModifica = (presenza: any) => {
        this.setState({
            editingList: this.state.editingList.filter(p => p.idPresenza !== presenza.idPresenza)
        })
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    render = (): JSX.Element => {
        const { presenze, editingList, loading } = this.state

        if(!presenze) return <LoadingIcon spinning style={{ fontSize: 50 }} />

        return <div>
            <h3>Presenze dello studente</h3>

            <Table columns={[
                { label: "Giorno", field: "data", canSearch: true, width: 150 },
                { label: "Entrata", field: "ingresso" },
                { label: "Uscita", field: "uscita" },
                { label: "Lezione", field: "lezione", tooltip: true, canSearch: true },
                { label: "Azioni", field: "azioni", width: "20%", align: "center" },
            ]} data={
                presenze.map(p => {
                    let presenzaEdit = editingList.find(pre => pre.idPresenza === p.idPresenza)
                    
                    return {
                        data: formatItalian(p.data),
                        ingresso: presenzaEdit ? <TimePicker defaultValue={p.ingresso} onChange={(v) => this.changeEntrata(v, p.idPresenza)} disabled={loading} /> : p.ingresso,
                        uscita: presenzaEdit ? <TimePicker defaultValue={p.uscita} onChange={(v) => this.changeEntrata(v, p.idPresenza)} disabled={loading} /> : p.uscita,
                        lezione: p.lezione,
                        azioni: presenzaEdit ? <div>
                            <Button tooltip="Annulla" btnColor="red" circleBtn onClick={() => this.annullaModifica(p)} className="mr-2" disabled={loading}>
                                <CloseIcon />
                            </Button>

                            <Button tooltip="Conferma modifiche" circleBtn onClick={() => this.confirmEdit(p.idPresenza)} btnColor="green" loading={loading}>
                                <CheckIcon />
                            </Button>
                        </div> : <Button tooltip="Modifica orari" circleBtn onClick={() => this.startTimeEdit(p)} btnColor="orange">
                            <EditIcon />
                        </Button>
                    }
                })
            } />
        </div>
    }
}