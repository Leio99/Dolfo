import React from "react"
import { Card } from "../layout/Card"
import { Status } from "../layout/Status"
import { Apis, ColumnApis, ResultCode, Usage, WhenToUse } from "./Layouts"
import { MDExample } from "./Examples"
import { goToApiBlock } from "../MenuContent"
import { MasterDetail } from "../layout/table/MasterDetail"

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
                    "password": "password123",
                    "stato": <Status type="info">Attivo</Status>
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
                    "promosso": "0",
                    checked: true,
                    "stato": <Status type="info">Attivo</Status>
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
                    "archiviato": "1",
                    "stato": <Status type="info">Attivo</Status>
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
                    "archiviato": "1",
                    "stato": <Status type="info">Attivo</Status>
                }
            ]
        }
    }

    getTitle = ({ nome, cognome }: any) => cognome + " " + nome

    getDetailTitle = ({ nome, cognome }: any): React.ReactNode => <span>
        {this.getTitle({ nome, cognome })} <Status type="info" style={{
            fontSize: "initial",
            fontWeight: "normal",
            verticalAlign: "super"
        }}>Attivo</Status>
    </span>

    render = (): React.ReactNode => {
        const { list } = this.state

        return <>
            <WhenToUse>When you want to render a master-detail layout.</WhenToUse>
            <Usage notes="click the detail icon or double click a row to open detail" />
            
            <ResultCode
                title="Example"
                result={<MasterDetail columns={[
                    { field: "check", label: "", type: "check", checkTooltip: "Seleziona tutti", checked: true },
                    { field: "cognome", label: "Cognome" },
                    { field: "nome", label: "Nome" },
                    { field: "dataNascita", label: "Data di nascita", type: "date", align: "center" },
                    { field: "stato", label: "Stato", align: "center" }
                ]} data={list} getDetailTitle={this.getDetailTitle} getTitle={this.getTitle}>
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
                    onDoubleClick: () => goToApiBlock("#columnProps"),
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "data",
                    desc: "Defines the grid datasource.",
                    type: "Array of IDataColumn",
                    required: true,
                    onDoubleClick: () => goToApiBlock("#dataColumnProps"),
                    rowStyle: { backgroundColor: "var(--hoverblue)" }
                },
                {
                    name: "layoutType",
                    desc: "Defines the type of layout. If not passed, shows a button to allow viewmode toggling.",
                    type: "string (card or grid)",
                    required: false,
                    default: "grid"
                },
                {
                    name: "hideToggleButton",
                    desc: "Hides the button used to toggle the layout type.",
                    type: "boolean",
                    required: false,
                    default: "false"
                },
                {
                    name: "getDetailTitle",
                    desc: "Function to determine the title of the detail page.",
                    type: "function (must return string or ReactNode)",
                    required: true,
                    default: "null",
                    fnParams: "The selected item in the grid (any)"
                },
                {
                    name: "getTitle",
                    desc: "Function to determine the title of the card (when shown).",
                    type: "function (must return string or ReactNode)",
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