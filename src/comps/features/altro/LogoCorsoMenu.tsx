import React from "react"
import { Dialog } from "../../layout/Dialog"

export class LogoCorsoMenu extends React.Component{
    openInfoDialog = () => {
        Dialog.openDialog({
            type: "info",
            title: "Informazioni",
            clickOutside: true,
            okType: "blue",
            width: "400px",
            content: <div>
                <img src="https://i.imgur.com/5Z1DbN7.png" className="float-left mr-4" width="100" alt="logo_corso" />
                <div>
                    <strong>Corso:</strong> Alan Turing
                </div>
                <div>
                    <strong>Utente:</strong> Luca Arcangeli
                </div>
            </div>
        })
    }

    render = (): JSX.Element => {
        return <div className="menu-logo-block">
            <img src="https://i.imgur.com/5Z1DbN7.png" alt="menu_logo" onClick={this.openInfoDialog} />
        </div>
    }
}