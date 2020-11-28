import React from "react"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import Select from "../../form/Select"
import { Option } from "../../form/Option"
import { Uploader } from "../../form/Uploader"
import { Table } from "../../layout/Table"
import { capitalizeFirst } from "../../../commons/utility"

const fields = [{
    label: "Nome",
    field: "nome",
    icon: "user"
},{
    label: "Cognome",
    field: "cognome",
    icon: "user"
},{
    label: "Codice Fiscale",
    field: "cf",
    icon: "address-card"
},{
    label: "Data di nascita",
    field: "dataNascita",
    icon: "calendar-day"
},{
    label: "E-mail",
    field: "email",
    icon: "envelope"
}]

export interface IState{
    readonly anno: number
    readonly loading: boolean
    readonly rows: string[]
    readonly fields: {
        nome: number,
        cognome: number,
        cf: number,
        dataNascita: number,
        email: number
    }
}

export class ImportaStudenti extends React.PureComponent<undefined, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            anno: 1,
            loading: false,
            rows: [],
            fields: {
                nome: 0,
                cognome: 0,
                cf: 0,
                dataNascita: 0,
                email: 0
            }
        }
    }

    changeAnno = (anno: number) => this.setState({ anno })

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    changeField = (field: string, position: number) => {
        let fields = {...this.state.fields} as any
        fields[field] = position 

        this.setState({ fields })
    }

    showImportPreview = () => {
        const { rows, fields, anno } = this.state,
        data = rows.map(r => {
            const pieces = this.splitRow(r)

            return {
                nome: capitalizeFirst(pieces[fields.nome]),
                cognome: capitalizeFirst(pieces[fields.cognome]),
                cf: pieces[fields.cf],
                email: pieces[fields.email],
                dataNascita: pieces[fields.dataNascita],
                anno 
            }
        })

        Dialog.openDialog({
            width: "80vw",
            title: "Anteprima dati",
            okText: "Conferma",
            okType: "green",
            content: <Table data={data} columns={[
                { label: "Nome", field: "nome", tooltip: true },
                { label: "Cognome", field: "cognome", tooltip: true },
                { label: "Data di nascita", field: "dataNascita", align: "center" },
                { label: "Codice Fiscale", field: "cf" },
                { label: "E-mail", field: "email", tooltip: true }
            ]} />
        })
    }

    readFile = (files: FileList) => {
        const reader = new FileReader()

        reader.onload = (e: any) => {
            const fileContent = e.target.result.trim(),
            rows = fileContent.split("\n"),
            firstFields = this.splitRow(rows[0])

            Dialog.openDialog({
                width: "500px",
                title: "Selezionare i campi da abbinare",
                icon: <Icon iconKey="code-branch" color="var(--green)" />,
                content: <div>
                    <Select label="Anno frequentato" onChange={this.changeAnno} icon={{ iconKey: "graduation-cap" }}>
                        <Option value={1} label="Primo anno" />
                        <Option value={2} label="Secondo anno" />
                    </Select>

                    {
                        fields.map(f => <Select onChange={val => this.changeField(f.field, val)} label={f.label} icon={{ iconKey: f.icon }}>
                            {
                                firstFields.map((opt, i) => <Option value={i} label={opt} />)
                            }
                        </Select>)
                    }
                </div>,
                onOk: () => this.setState({ rows }, this.showImportPreview),
                okText: "Prosegui"
            })
        }

        reader.readAsText(files[0], "ISO-8859-1")
    }

    splitRow = (row: string) => {
        let regex = /(["'])(?:(?=(\\?))\2.)*?\1/g,
        pieces = row.trim().match(regex)

        return pieces.map(p => p.replace(/["']/g, "")).filter(p => isNaN(Number(p)) && p.toLowerCase().indexOf("via") < 0 && p.length > 1)
    }

    render = (): JSX.Element => <Uploader onChange={this.readFile} dropArea accept=".csv" label={<div>
        <Icon iconKey="file-csv" style={{ fontSize: 50, marginBottom: 10 }} />
        <div>Carica o trascina un file <strong>.csv</strong></div>
    </div>} style={{ height: "calc(100vh - 72px - 5rem)" }} />
}