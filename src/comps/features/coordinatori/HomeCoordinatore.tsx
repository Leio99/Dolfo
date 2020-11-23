import React from "react"
import { copyToClipBoard } from "../../../commons/utility"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Icon } from "../../layout/Icon"
import { ComponentsPermissions } from "../ComponentsPermissions"

export class HomeCoordinatore extends React.Component{
    readonly login = ComponentsPermissions.getLoginCoordinatore()

    render = (): JSX.Element => {
        return <div>
            <Card title="Dati generali">
                <h3 className="text-uppercase">{this.login.nome} {this.login.cognome}</h3>
                <span>
                    Codice di accesso alla firma: <strong>{this.login.codiceCorso}</strong>
                    <Button textBtn btnColor="grey" className="ml-2" onClick={() => copyToClipBoard(this.login.codiceCorso)}>
                        <Icon iconKey="copy" />
                    </Button>
                </span>
            </Card>
        </div>
    }
}