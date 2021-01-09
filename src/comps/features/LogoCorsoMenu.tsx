import React from "react"
import { CorsiService } from "../../services/CorsiService"
import { Dialog } from "../layout/Dialog"
import { LoadingIcon } from "../layout/Icon"

export interface IState{
    readonly corso: any
}

export class LogoCorsoMenu extends React.PureComponent<any, IState>{
    constructor(){
        super(undefined)

        this.state = {
            corso: null
        }
    }

    componentDidMount = () => {
        CorsiService.getCorso(1).then(response => {
            this.setState({
                corso: response.data
            })
        })
    }

    openInfoDialog = () => {
        const { corso } = this.state

        Dialog.openDialog({
            type: "info",
            title: "Informazioni",
            clickOutside: true,
            okType: "blue",
            width: "400px",
            content: <div>
                <img src={corso.logo} className="float-left mr-4" width="100" alt="logo_corso" />
                <div>
                    <strong>Corso:</strong> {corso.nome}
                </div>
                <div>
                    <strong>Utente:</strong> Luca Arcangeli
                </div>
            </div>
        })
    }

    render = (): JSX.Element => {
        const { corso } = this.state

        return <div className="menu-logo-block">
            {
                !corso ? <LoadingIcon color="#fff" spinning style={{ fontSize: 30 }} /> : <img src="https://i.imgur.com/5Z1DbN7.png" alt="menu_logo" onClick={this.openInfoDialog} />
            }
        </div>
    }
}