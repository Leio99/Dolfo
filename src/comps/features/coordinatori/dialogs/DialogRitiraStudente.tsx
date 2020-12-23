import React from "react"
import { formatDate, notImplemented } from "../../../../commons/utility"
import DatePicker from "../../../form/DatePicker"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { WarningIconOutline } from "../../../layout/Icon"

export interface IProps extends ComponentAsDialogProps{
    readonly studente: any
}
export interface IState{
    readonly dataRitiro: string
}

export class DialogRitiraStudente extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            dataRitiro: formatDate(new Date())
        }
    }

    confermaRitiro = () => {
        const loading = Dialog.loadingDialog()

        setTimeout(() => {
            notImplemented()
            loading.close()
            this.props.close()
        }, 2000)
    }

    changeDataRitiro = (dataRitiro: string) => this.setState({ dataRitiro })

    render = (): JSX.Element => {
        const { studente } = this.props,
        { dataRitiro } = this.state

        return <Dialog title={<span>
            <WarningIconOutline color="var(--red)" /> Attenzione
        </span>} visible clickOutside onClose={this.props.close} customFooter={[
            <Button btnColor="red" onClick={this.confermaRitiro} smallBtn disabled={dataRitiro === ""}>Conferma</Button>,
            <Button btnColor="grey" onClick={this.props.close} smallBtn textBtn>Annulla</Button>
        ]}>
            <div>Si sta per ritirare uno studente (<strong>{studente.nome} {studente.cognome}</strong>).</div>
            I dati identificativi dello studente e le presenze verranno comunque mantenuti, ma lo studente non potrà più registrare nuove presenze e non potrà essere reintegrato all'interno del corso.

            <DatePicker label="Data di ritiro" defaultValue={new Date()} onChange={this.changeDataRitiro} wrapperStyle={{ marginTop: 10 }} />
        </Dialog>
    }
}