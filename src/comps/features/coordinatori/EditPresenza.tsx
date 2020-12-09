import React from "react"
import { formatWithMonth } from "../../../commons/utility"
import { PresenzeService } from "../../../services/PresenzeService"
import TimePicker from "../../form/TimePicker"
import Button from "../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../layout/Dialog"
import { QuestionCircleIcon } from "../../layout/Icon"

export interface IProps extends ComponentAsDialogProps{
    readonly presenza: any
    readonly onSave: (presenza: any) => void
    readonly isDocente?: boolean
}
export interface IState{
    readonly loading: boolean
    readonly ingresso: string
    readonly uscita: string
}

export class EditPresenza extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            loading: false,
            ingresso: props.presenza.ingresso,
            uscita: props.presenza.uscita
        }
    }

    modificaPresenza = (e: any) => {
        e.preventDefault()

        const { ingresso, uscita } = this.state,
        { presenza, isDocente } = this.props,
        idObj = isDocente ? { idDocente: presenza.idDocente } : { idStudente: presenza.idStudente },
        data = new Date()

        this.toggleLoading()

        PresenzeService.editPresenza(this.props.presenza.idPresenza, {
            ...idObj,
            idPresenza: presenza.idPresenza,
            ingresso: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${ingresso}`),
            uscita: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${uscita}`),
            idLezione: presenza.idLezione
        }).then(response => {
            let output = response.data

            if(output.trim() === "success"){
                const newPresenza = {
                    ...presenza,
                    ingresso,
                    uscita
                }

                this.props.onSave(newPresenza)
                this.props.close()
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

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    editIngresso = (ingresso: string) => this.setState({ ingresso })

    editUscita = (uscita: string) => this.setState({ uscita })

    openDettagli = () => {
        const presenza = this.props.presenza

        Dialog.infoDialog({
            title: "Dettagli presenza",
            content: <div>
                <p className="mb-1">
                    <strong>Data</strong>: {formatWithMonth(presenza.data)}
                </p>
                <p className="mb-0">
                    <strong>Lezione</strong>: {presenza.lezione}
                </p>
            </div>
        })
    }

    render = (): JSX.Element => {
        const { loading, ingresso, uscita } = this.state,
        { close } = this.props

        return <Dialog title={<span>
            <Button textBtn btnColor="blue" tooltip="Dettagli presenza" className="align-top" onClick={this.openDettagli}>
                <QuestionCircleIcon />    
            </Button> Modifica presenza
        </span>} visible hideFooter onClose={close}>
            <form onSubmit={this.modificaPresenza}>
                <TimePicker defaultValue={ingresso} onChange={this.editIngresso} disabled={loading} label="Orario di ingresso" required />

                <TimePicker defaultValue={uscita} onChange={this.editUscita} disabled={loading} label="Orario di uscita" required />

                <Button type="submit" className="mt-2 text-uppercase" fullSize loading={loading} btnColor="green">Salva presenza</Button>
            </form>
        </Dialog>
    }
}