import React, { FormEvent } from "react"
import { TextInput } from "../../../form/TextInput"
import Button from "../../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { NotificationMsg } from "../../../layout/NotificationMsg"

export interface IProps extends ComponentAsDialogProps{
    readonly idEnte: number
    readonly reloadList: () => void
}
export interface IState{
    readonly desc: string
    readonly loading: boolean
}

export class DialogAddEdizione extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            desc: "",
            loading: false
        }
    }

    addEdizione = (e: FormEvent) => {
        e.preventDefault()
        const { desc } = this.state

        if(desc.trim() === "")
            return NotificationMsg.showError("Inserire una descrizione!")

        this.setState({ loading: true })

        setTimeout(() => {
            this.props.reloadList()
            this.props.close()
        }, 2000)
        // loading = true,
        // chiamata
        // poi this.props.reloadList() e this.props.close
    }

    changeDesc = (desc: string) => this.setState({ desc })

    render = (): JSX.Element => {
        const { loading } = this.state

        return <Dialog visible title="Nuova edizione" hideFooter onClose={this.props.close}>
            <form onSubmit={this.addEdizione}>
                <TextInput label="Descrizione" onChange={this.changeDesc} required disabled={loading} icon={{ iconKey: "laptop" }} />

                <div className="text-right mt-3">
                    <Button smallBtn btnColor="green" type="submit" loading={loading}>Aggiungi edizione</Button>
                </div>
            </form>
        </Dialog>
    }
}