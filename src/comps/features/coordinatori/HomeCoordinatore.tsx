import React from "react"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"

export class HomeCoordinatore extends React.Component{
    readonly login = ComponentsPermissions.getLoginCoordinatore()

    copyToClipBoard = () => {
        const el = document.createElement('textarea');
        el.value = this.login.codiceCorso;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        NotificationMsg.showInfo("Codice copiato negli appunti!")
    }

    render = (): JSX.Element => {
        return <div>
            <Card title="Dati generali">
                <h3 className="text-uppercase">{this.login.nome} {this.login.cognome}</h3>
                <span>
                    Codice di accesso alla firma: <strong>{this.login.codiceCorso}</strong>
                    <Button textBtn btnColor="grey" className="ml-2" onClick={this.copyToClipBoard}>
                        <Icon iconKey="copy" />
                    </Button>
                </span>
            </Card>
        </div>
    }
}