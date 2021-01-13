import React, { FormEvent } from "react"
import { EdizioniService } from "../../../../services/EdizioniService"
import { TextInput } from "../../../form/TextInput"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { NotificationMsg } from "../../../layout/NotificationMsg"

export interface IProps extends ComponentAsDialogProps{
    readonly idGestore: number
    readonly reloadList: () => void
    readonly edizione?: any
}
export interface IState{
    readonly desc: string
    readonly loading: boolean
}

export class DialogAddEditEdizione extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            desc: props.edizione?.descrizione || "",
            loading: false
        }
    }

    sendEdizione = (e: FormEvent) => {
        e.preventDefault()
        const { desc } = this.state

        if(desc.trim() === "")
            return NotificationMsg.showError("Inserire una descrizione!")

        this.toggleLoading()

        if(this.props.edizione){
            EdizioniService.editEdizione(this.props.edizione.id, { descrizione: desc }).then(() => {
                this.props.reloadList()
                this.props.close()
            }).catch(this.toggleLoading)
        }else{
            EdizioniService.addEdizione(this.props.idGestore, { descrizione: desc }).then(() => {
                this.props.reloadList()
                this.props.close()
            }).catch(this.toggleLoading)
        }
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    changeDesc = (desc: string) => this.setState({ desc })

    render = (): JSX.Element => {
        const { loading, desc } = this.state,
        title = this.props.edizione ? "Modifica" : "Nuova"

        return <Dialog visible title={title + " edizione"} hideFooter onClose={this.props.close}>
            <form onSubmit={this.sendEdizione}>
                <TextInput label="Descrizione" onChange={this.changeDesc} required disabled={loading} icon={{ iconKey: "laptop" }} value={desc} />

                <div className="text-right mt-3">
                    <Button smallBtn btnColor="green" type="submit" loading={loading}>{title} edizione</Button>
                </div>
            </form>
        </Dialog>
    }
}