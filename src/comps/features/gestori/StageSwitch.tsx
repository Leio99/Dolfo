import React from "react"
import { EdizioniService } from "../../../services/EdizioniService"
import { StudentiService } from "../../../services/StudentiService"
import { Switch } from "../../form/Switch"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { QuestionCircleOutlineIcon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly loading: boolean
    readonly attivato: boolean
}

export class StageSwitch extends React.PureComponent<any, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()
    
    constructor(){
        super(undefined)

        this.state = {
            loading: true,
            attivato: false
        }
    }

    componentDidMount = () => {
        StudentiService.getStatoStage(this.session.idGestore).then(response => {
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

        EdizioniService.cambiaStatoStage(this.session.idGestore).then(response => {
            this.toggleLoading()

            this.setState({
                attivato: !this.state.attivato
            }, () => NotificationMsg.showSuccess("Stage " + (this.state.attivato ? "attivato" : "disattivato") + "!"))
        }).catch(this.toggleLoading)
    }

    infoStage = () => {
        Dialog.openDialog({
            title: "Attiva/Disattiva lo stage",
            okText: "Ho capito",
            width: "400px",
            type: "warning",
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