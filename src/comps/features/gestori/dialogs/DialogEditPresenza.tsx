import React, { FormEvent } from "react"
import { formatWithMonth } from "../../../../commons/utility"
import { PresenzeService } from "../../../../services/PresenzeService"
import TimePicker from "../../../form/TimePicker"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { QuestionCircleIcon } from "../../../layout/Icon"

export interface IProps extends ComponentAsDialogProps{
    readonly presenza: any
    readonly onSave: (presenza: any) => void
    readonly isDocente?: boolean
}
export interface IState{
    readonly loading: boolean
    readonly oraEntrata: string
    readonly oraUscita: string
}

export class EditPresenza extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            loading: false,
            oraEntrata: props.presenza.oraEntrata,
            oraUscita: props.presenza.oraUscita
        }
    }

    modificaPresenza = (e: FormEvent) => {
        e.preventDefault()

        const { oraEntrata, oraUscita } = this.state,
        { presenza, isDocente } = this.props,
        data = new Date()

        this.toggleLoading()

        PresenzeService.editPresenza(this.props.presenza.idPresenza, {
            oraEntrata: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${oraEntrata}`),
            oraUscita: new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${oraUscita}`),
            idLezione: presenza.idLezione
        }, isDocente).then(response => {
            const newPresenza = {
                ...presenza,
                oraEntrata,
                oraUscita
            }

            this.props.onSave(newPresenza)
            this.props.close()

            this.toggleLoading()
        }).catch(this.toggleLoading)
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    editIngresso = (oraEntrata: string) => this.setState({ oraEntrata })

    editUscita = (oraUscita: string) => this.setState({ oraUscita })

    openDettagli = () => {
        const presenza = this.props.presenza

        Dialog.infoDialog({
            title: "Dettagli presenza",
            clickOutside: true,
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
        const { loading, oraEntrata, oraUscita } = this.state,
        { close } = this.props

        return <Dialog title={<span>
            <Button textBtn btnColor="blue" tooltip="Dettagli presenza" className="align-top" onClick={this.openDettagli}>
                <QuestionCircleIcon />    
            </Button> Modifica presenza
        </span>} visible hideFooter onClose={close}>
            <form onSubmit={this.modificaPresenza}>
                <TimePicker defaultValue={oraEntrata} onChange={this.editIngresso} disabled={loading} label="Orario di ingresso" required />

                <TimePicker defaultValue={oraUscita} onChange={this.editUscita} disabled={loading} label="Orario di uscita" required />

                <div className="text-right mt-3">
                    <Button type="submit" smallBtn loading={loading} btnColor="green">Salva presenza</Button>
                </div>
            </form>
        </Dialog>
    }
}