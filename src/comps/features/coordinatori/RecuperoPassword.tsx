import React from "react"
import { Cifratore } from "../../../commons/Cifratore"
import { CoordinatoriService } from "../../../services/CoordinatoriService"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { ComponentAsDialogProps, Dialog } from "../../layout/Dialog"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { Step } from "../../layout/Step"
import { Stepper } from "../../layout/Stepper"

export interface IState{
    readonly currentStep: number
    readonly email: string
    readonly code: string
    readonly newPassword: string
    readonly newPasswordConfirm: string
    readonly idUtente: number
    readonly loading: boolean
}

export class RecuperoPassword extends React.PureComponent<ComponentAsDialogProps, IState>{
    constructor(props: ComponentAsDialogProps){
        super(props)

        this.state = {
            currentStep: 0,
            email: "",
            code: "",
            newPassword: "",
            newPasswordConfirm: "",
            idUtente: null,
            loading: false
        }
    }
    
    cancelRecover = () => {
        this.setState({
            currentStep: 0,
            email: "",
            code: "",
            newPassword: "",
            newPasswordConfirm: "",
            idUtente: null,
            loading: false
        })

        this.props.close()
    }

    changeMail = (email: string) => this.setState({ email })

    changeCode = (code: string) => this.setState({ code })

    changePassword = (newPassword: string) => this.setState({ newPassword })

    changePasswordConfirm = (newPasswordConfirm: string) => this.setState({ newPasswordConfirm })

    increaseStep = () => this.setState({ currentStep: this.state.currentStep + 1 })

    decreaseStep = () => this.setState({ currentStep: this.state.currentStep - 1 })

    switchLoading = () => this.setState({ loading: !this.state.loading })

    confirmFirstStep = (e: any) => {
        e.preventDefault()
        
        const { email } = this.state

        if(email === "")
            return NotificationMsg.showError("Riempire il campo!")

        this.switchLoading()

        CoordinatoriService.recuperoPassword(email).then(response => {
            let data = response.data,
            idUtente = parseInt(data)

            if(!isNaN(idUtente)){
                this.setState({
                    idUtente
                })
    
                this.increaseStep()
            }

            this.switchLoading()
        }).catch(this.switchLoading)
    }

    confirmSecondStep = (e: any) => {
        e.preventDefault()
        
        if(this.state.code === "")
            return NotificationMsg.showError("Riempire il campo!")

        this.increaseStep()
    }

    savePassword = (e: any) => {
        e.preventDefault()

        const { newPassword, newPasswordConfirm, idUtente, code } = this.state

        if(newPassword === "" || newPasswordConfirm === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        if(newPassword.length < 8){
            Dialog.infoDialog({
                title: "Errore!",
                content: "La password deve avere almeno 8 caratteri.",
                type: "error"
            })

            return
        }

        if(newPassword !== newPasswordConfirm){
            Dialog.infoDialog({
                title: "Errore!",
                content: "Le password non corrispondono.",
                type: "error"
            })

            return
        }

        this.switchLoading()

        let cipher = new Cifratore(),
        password = cipher.encode(newPassword)

        CoordinatoriService.cambioPassword({
            idUtente,
            password,
            codice: code
        }).then(response => {
            let msg = response.data

            if(msg.trim() === "success"){
                Dialog.infoDialog({
                    title: "Complimenti!",
                    content: "Password modificata con successo. Effettua il login.",
                    type: "success",
                    onOk: this.cancelRecover
                })
            }else{
                Dialog.infoDialog({
                    title: "Errore!",
                    content: "Non è stato possibile completare l'operazione.",
                    type: "error"
                })

                this.switchLoading()
            }
        }).catch(this.switchLoading)
    }

    render = (): JSX.Element => {
        const { currentStep, email, code, newPassword, newPasswordConfirm, loading } = this.state

        return <Dialog title="Recupero della password" onClose={this.cancelRecover} hideFooter visible>
            <Stepper currentStep={currentStep}>
                <Step title="E-mail" loading={loading}>
                    <form onSubmit={this.confirmFirstStep}>
                        <TextInput label="Inserisci la tua e-mail" value={email} type="email" onChange={this.changeMail} />

                        <Button type="submit" smallBtn btnColor="blue" className="mt-2 float-right" >Prosegui</Button>

                        <div className="clearfix"></div>
                    </form>
                </Step>

                <Step title="Codice">
                    <form onSubmit={this.confirmSecondStep}>
                        <TextInput value={code} label="Inserisci il codice ricevuto via e-mail" onChange={this.changeCode} icon={{ iconKey: "hashtag" }} />

                        <Button smallBtn textBtn btnColor="red" className="mt-2" onClick={this.decreaseStep}>Indietro</Button>
                        <Button type="submit" smallBtn btnColor="blue" className="mt-2 float-right">Prosegui</Button>

                        <div className="clearfix"></div>
                    </form>
                </Step>

                <Step title="Nuova password" loading={loading}>
                    <form onSubmit={this.savePassword}>
                        <TextInput value={newPassword} label="Crea la tua nuova password" type="password" onChange={this.changePassword} />
                        <TextInput value={newPasswordConfirm} label="Conferma la nuova password" type="password" onChange={this.changePasswordConfirm} />

                        <Button smallBtn textBtn btnColor="red" className="mt-2" onClick={this.decreaseStep}>Indietro</Button>
                        <Button type="submit" smallBtn btnColor="blue" className="mt-2 float-right">Salva la password</Button>

                        <div className="clearfix"></div>
                    </form>
                </Step>
            </Stepper>
        </Dialog>
    }
}