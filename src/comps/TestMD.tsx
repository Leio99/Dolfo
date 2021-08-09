import React from "react"
import axios from "axios"
import { MasterDetail } from "./layout/MasterDetail"
import { Card } from "./layout/Card"
import { Status } from "./layout/Status"

const json = require("../studenti.json")

interface IState{
    readonly list: any[]
}

export class TestMD extends React.Component<{}, IState>{
    constructor(){
        super({})

        this.state = {
            list: []
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/students/?tutorId=1")
        .then(r => this.setState({ list: r.data }))
        .catch(() => this.setState({ list: json }))
    }

    getDetailTitle = (item: any) => <span>
        {item.cognome} {item.nome} <Status type="info" style={{
            fontSize: "initial",
            fontWeight: "normal",
            verticalAlign: "super"
        }}>Attivo</Status>
    </span>

    render = (): JSX.Element => {
        const { list } = this.state

        return <MasterDetail columns={[
            { field: "cognome", label: "Cognome" },
            { field: "nome", label: "Nome" },
            { field: "dataNascita", label: "Data di nascita", type: "date", align: "center" },
        ]} data={list} getDetailTitle={this.getDetailTitle}>
            <Card title="Informazioni anagrafiche">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis nesciunt quae ratione nobis animi qui placeat fugiat quibusdam, perspiciatis sit illo quas amet velit reprehenderit omnis quod cumque earum esse?
            </Card>
        </MasterDetail>
    }
}