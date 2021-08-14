import React from "react"
import { MasterDetail } from "../layout/MasterDetail"
import { Card } from "../layout/Card"
import { Status } from "../layout/Status"
import { Apis, ColumnApis, ResultCode, Usage, WhenToUse } from "./Layouts"
import { MDExample } from "./Examples"

interface IState{
    readonly list: any[]
}

export class MasterdetailPage extends React.Component<{}, IState>{
    constructor(props: {}){
        super(props)

        this.state = {
            list: [
                {
                    "id": "1",
                    "idEdizione": "1",
                    "nome": "Leonardo",
                    "cognome": "Grandolfo",
                    "cf": "GRNLRD99D17L219S",
                    "frequenza": "0",
                    "dataNascita": "Fri, 16 Apr 1999 22:00:00 GMT",
                    "email": "leonardo.grandolfo99@gmail.com",
                    "promosso": "0",
                    "codice": "18099",
                    "password": "password123"
                },
                {
                    "nome": "Sgorbio",
                    "cognome": "Ambulante",
                    "cf": "GRNLRD99D17L219C",
                    "dataNascita": "Mon, 19 Jul 2021 22:00:00 GMT",
                    "email": "aa@lld.tom",
                    "idEdizione": "1",
                    "id": "b69f50fa-f30a-4d22-b39d-0c69a716a906",
                    "frequenza": "0",
                    "promosso": "0"
                },
                {
                    "nome": "Adriano",
                    "cognome": "Lonzi",
                    "cf": "GRNLRD99D17L219D",
                    "dataNascita": "Thu, 15 Jul 2021 22:00:00 GMT",
                    "email": "leonardo.grandolfo@maggioli.it",
                    "idEdizione": "1",
                    "id": "49e39e09-5e2f-466f-9889-ade1bfd0846b",
                    "frequenza": "0",
                    "promosso": "0",
                    "archiviato": "1"
                },
                {
                    "nome": "Carlo",
                    "cognome": "Vanzina",
                    "cf": "MTTMSC79D19L222P",
                    "dataNascita": "Mon, 19 Jul 2021 22:00:00 GMT",
                    "email": "etsy@la.com",
                    "idEdizione": "1",
                    "id": "c56963a6-4cd1-4797-9998-ff2db571bc37",
                    "frequenza": "0",
                    "promosso": "0",
                    "archiviato": "1"
                }
            ]
        }
    }

    getDetailTitle = ({ nome, cognome }: any): JSX.Element => <span>
        {cognome} {nome} <Status type="info" style={{
            fontSize: "initial",
            fontWeight: "normal",
            verticalAlign: "super"
        }}>Attivo</Status>
    </span>

    render = (): JSX.Element => {
        const { list } = this.state

        return <>
            <WhenToUse>When you want to render a master-detail layout.</WhenToUse>
            <Usage notes="click the detail icon or double click a row to open detail" />
            
            <ResultCode
                title="Example"
                result={<MasterDetail columns={[
                    { field: "cognome", label: "Cognome" },
                    { field: "nome", label: "Nome" },
                    { field: "dataNascita", label: "Data di nascita", type: "date", align: "center" },
                ]} data={list} getDetailTitle={this.getDetailTitle}>
                    <Card title="Informazioni anagrafiche">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis nesciunt quae ratione nobis animi qui placeat fugiat quibusdam, perspiciatis sit illo quas amet velit reprehenderit omnis quod cumque earum esse?
                    </Card>
                </MasterDetail>}
                code={MDExample}
            />

            <Apis data={[
                {
                    name: "columns",
                    desc: "Defines the grid columns.",
                    type: "Array of IColumn",
                    required: true,
                    onDoubleClick: () => window.location.href = "#columnProps",
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "data",
                    desc: "Defines the grid datasource.",
                    type: "Array of IDataColumn",
                    required: true,
                    onDoubleClick: () => window.location.href = "#dataColumnProps",
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "getDetailTitle",
                    desc: "Function to determine the title of the detail page.",
                    type: "function (must return string or JSX)",
                    required: true,
                    default: "null",
                    fnParams: "The selected item in the grid (any)"
                },
                {
                    name: "onOpenDetail",
                    desc: "Function triggered when opening the detail.",
                    type: "function",
                    required: false,
                    default: "null",
                    fnParams: "The selected item in the grid (any)"
                }
            ]} />

            <ColumnApis />
        </>
    }
}