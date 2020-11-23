import React from "react"
import { StudentiService } from "../../../services/StudentiService"
import { Switch } from "../../form/Switch"
import { Dialog } from "../../layout/Dialog"
import { NotificationMsg } from "../../layout/NotificationMsg"

export interface IProps{
    readonly idCorso: number
    readonly anno: number
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
        const { idCorso, anno } = this.props

        StudentiService.getStatoStage(idCorso, anno).then(response => {
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

        StudentiService.cambiaStatoStage(this.props.anno).then(response => {
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

    render = (): JSX.Element => {
        const { attivato, loading } = this.state

        return <Switch loading={loading} label={(attivato ? "Disattiva" : "Attiva") + " lo stage per la classe"} onChange={this.switchStage} checked={attivato} />
    }
}