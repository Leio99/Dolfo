import React, { FormEvent } from "react"
import { EdizioniService } from "../../../services/EdizioniService"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { DetailIcon, Icon, QuestionCircleOutlineIcon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { Tab } from "../../layout/Tab"
import { Tabs } from "../../layout/Tabs"
import { Calendario } from "../altro/Calendario"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly originalId: string
    readonly idCalendario: string
    readonly loadingForm: boolean
    readonly loadingCalendario: boolean
}

export class ConfigCalendario extends React.PureComponent<any, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(){
        super(undefined)

        this.state = {
            originalId: "",
            idCalendario: "",
            loadingCalendario: true,
            loadingForm: false
        }
    }

    componentDidMount = () => {
        EdizioniService.getIdCalendario(this.session.idGestore).then(response => {
            this.setState({
                originalId: response.data,
                idCalendario: response.data,
                loadingCalendario: false
            })
        })
    }

    toggleLoadForm = () => this.setState({ loadingForm: !this.state.loadingForm})

    salvaConfig = (e: FormEvent) => {
        e.preventDefault()
        const idCalendario = this.state.idCalendario.trim()

        if(idCalendario === "")
            return NotificationMsg.showError("Riempire il campo!")

        this.toggleLoadForm()

        EdizioniService.editIdCalendario(this.session.idGestore, {
            idCalendario
        }).then(() => {
            this.setState({
                originalId: idCalendario,
                loadingForm: false
            })
        }).catch(this.toggleLoadForm)
    }

    changeId = (idCalendario: string) => this.setState({ idCalendario })

    openScreen = (n: number) => {
        Dialog.openDialog({
            customFooter: [],
            clickOutside: true,
            title: "Immagine",
            width: "80vw",
            content: <img src={`/images/calendario-tutorial-${n}.png`} width="100%" alt="tutorial" />
        })
    }

    openGoogleCalendar = () => window.open("https://calendar.google.com/")

    openInfo = () => {
        Dialog.openDialog({
            title: "Configurazione del calendario",
            overflows: true,
            okText: "Ho capito",
            clickOutside: true,
            content: <div>
                <p>Questa schermata permette di configurare il calendario Google dal quale verranno prese le lezioni, che saranno poi registrate e potranno essere firmate da studenti e docenti.</p>
                <p>Per prima cosa è necessario creare un calendario su <Button textBtn btnColor="blue" onClick={this.openGoogleCalendar}> Google Calendar <DetailIcon /></Button> e renderlo <strong>pubblico</strong>.</p>
                <p>
                    <strong>Rendere pubblico il calendario</strong>
                    <div>Per rendere pubblico un calendario bisogna cliccare sulla rotellina (<Icon iconKey="cog" type="far" />) in alto a destra (<Button textBtn btnColor="blue" onClick={() => this.openScreen(1)}>immagine</Button>) e poi sull'opzione <strong>Impostazioni</strong> nel menu che appare.</div>
                    <div>Scorrere quindi sulla sinistra e cercare il calendario che si desidera integrare. Sulla destra scendere fino al paragrafo <strong>Autorizzazioni all'accesso</strong> (<Button textBtn btnColor="blue" onClick={() => this.openScreen(2)}>immagine</Button>) e spuntare la casella <em>Rendi disponibile pubblicamente</em>, assicurandosi che la voce <em>Vedere tutti i dettagli dell'evento</em> nel menu a tendina sia selezionata.</div>
                </p>

                <p>Arrivati a questo punto, bisogna copiare l'identificativo (ID) del calendario e incollarlo in questa pagina.</p>

                <p>
                    <strong>Recuperare l'ID del calendario</strong>
                    <div>
                        Una volta reso pubblico il calendario, scendere ancora più in basso fino al paragrafo <strong>Integra calendario</strong> e copiare il testo sotto <em>ID calendario</em> (<Button textBtn btnColor="blue" onClick={() => this.openScreen(3)}>immagine</Button>).
                    </div>
                </p>
            </div>,
            type: "warning",
            width: "700px",
            okType: "blue",
            icon: <QuestionCircleOutlineIcon color="var(--orange)" />
        })
    }

    render = (): JSX.Element => {
        const { idCalendario, originalId, loadingCalendario, loadingForm } = this.state

        return <Tabs>
            <Tab title="Configurazione">
                <form onSubmit={this.salvaConfig}>
                    <TextInput icon={{ iconKey: "google", type: "fab" }} label="Id calendario Google"value={idCalendario} name="idCalendario" disabled={loadingForm || loadingCalendario} onChange={this.changeId} required />

                    <div className="text-right mt-3">
                        <Button textBtn tooltip="Dove mi trovo?" onClick={this.openInfo} btnColor="orange">
                            <QuestionCircleOutlineIcon color="var(--orange)" large />
                        </Button>
                        <Button type="submit" className="ml-3" loading={loadingForm} disabled={loadingCalendario} btnColor="green">
                            Salva
                        </Button>
                    </div>
                </form>
            </Tab>

            {
                originalId && !loadingCalendario && !loadingForm && <Tab title="Anteprima">
                    <Calendario idCalendario={originalId} />
                </Tab>
            }
        </Tabs>
    }
}