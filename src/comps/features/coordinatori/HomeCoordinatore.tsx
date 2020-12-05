import React from "react"
import { copyToClipBoard } from "../../../commons/utility"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Icon } from "../../layout/Icon"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { ListaPresenzeDaConfermare } from "./ListaPresenzeDaConfermare"

export class HomeCoordinatore extends React.Component{
    readonly login = ComponentsPermissions.getLoginCoordinatore()

    render = (): JSX.Element => {
        return <div>
            <Card title="Dati generali" className="mb-3">
                <h2 className="text-uppercase">{this.login.nome} {this.login.cognome}</h2>
                <span>
                    Codice di accesso alla firma: <strong>{this.login.codiceCorso}</strong>
                    <Button tooltip="Copia il codice" textBtn btnColor="grey" className="ml-2 align-top" onClick={() => copyToClipBoard(this.login.codiceCorso)}>
                        <Icon iconKey="copy" large />
                    </Button>
                </span>
            </Card>

            <ListaPresenzeDaConfermare />
        </div>
    }
}