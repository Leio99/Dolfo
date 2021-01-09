import React from "react"
import { StudentiService } from "../../../services/StudentiService"
import { Switch } from "../../form/Switch"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { QuestionCircleOutlineIcon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"

export interface IProps{
    readonly idCorso: number
}
export interface IState{
    readonly loading: boolean
    readonly attivato: boolean
}

export class StageSwitch extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            loading: true,
            attivato: false
        }
    }

    componentDidMount = () => {
        const { idCorso } = this.props

        StudentiService.getStatoStage(idCorso, 1).then(response => {
            let status = response.data as boolean

            this.setState({
                attivato: status
            })

            this.toggleLoading()
        })
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    switchStage = () => {
        this.toggleLoading()

        StudentiService.cambiaStatoStage(1).then(response => {
            let message = response.data

            if(message === "success"){
                this.toggleLoading()

                this.setState({
                    attivato: !this.state.attivato
                }, () => NotificationMsg.showSuccess("Stage " + (this.state.attivato ? "attivato" : "disattivato") + "!"))
            }else{
                Dialog.infoDialog({
                    type: "error",
                    content: "C'è stato un errore. Riprova."
                })
            }
        })
    }

    infoStage = () => {
        Dialog.openDialog({
            title: "Attiva/Disattiva lo stage",
            width: "400px",
            hideCancel: true,
            okType: "blue",
            icon: <QuestionCircleOutlineIcon color="var(--orange)" />,
            content: "Se attivata, quest'impostazione permette agli studenti di segnare le ore di stage svolte presso le aziende tramite la propria area personale."
        })
    }

    render = (): JSX.Element => {
        const { attivato, loading } = this.state

        return <div className="my-3 mr-2">
            <Switch loading={loading} label={(attivato ? "Disattiva" : "Attiva") + " lo stage"} onChange={this.switchStage} checked={attivato} className="mr-2" />
            <Button textBtn btnColor="orange" tooltip="Informazioni" onClick={this.infoStage}>
                <QuestionCircleOutlineIcon />
            </Button>
        </div>
    }
}