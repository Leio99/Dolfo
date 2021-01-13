import React, { FormEvent } from "react"
import { Cifratore } from "../../../commons/Cifratore"
import { GestoriService } from "../../../services/GestoriService"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { RecuperoPassword } from "./RecuperoPassword"

export interface IState{
    readonly adminName: string
    readonly adminPassword: string
    readonly loading: boolean
}

export class LoginGestore extends React.PureComponent<undefined, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            adminName: "",
            adminPassword: "",
            loading: false
        }
    }

    componentDidMount = () => document.body.classList.add("login")

    componentWillUnmount = () => document.body.classList.remove("login")

    changeName = (adminName: string) => this.setState({ adminName })

    changePassword = (adminPassword: string) => this.setState({ adminPassword })

    openForgot = () => {
        const dialog = Dialog.openDialog({
            title: "Recupero della password",
            hideFooter: true,
            icon: <Icon iconKey="key" type="far" />,
            content: <RecuperoPassword close={() => dialog.close()} />
        })
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    tryLogin = (e: FormEvent) => {
        e.preventDefault()

        const { adminName, adminPassword } = this.state,
        cipher = new Cifratore()

        if(adminName.trim() === "" || adminPassword === "")
            return NotificationMsg.showError("Riempire tutti i campi!")

        this.toggleLoading()

        GestoriService.tryLogin({
            username: adminName,
            password: cipher.encode(adminPassword)
        }).then(response => {
            this.toggleLoading()
            sessionStorage.setItem("sessionGestore", JSON.stringify(response.data))
            ComponentsPermissions.checkLoginGestore()
            NotificationMsg.showSuccess("Login effettuato con successo!")
        }).catch(this.toggleLoading)
    }

    render = (): JSX.Element => {
        const { loading } = this.state

        return <div>
            <form className="floating-centered p-3 rounded shadow bg-white col-10 col-md-5" onSubmit={this.tryLogin}>
                <h2>Accesso gestori</h2>

                <TextInput name="username" label="Username" onChange={this.changeName} disabled={loading} icon={{ iconKey: "user" }} required />
                <TextInput name="password" type="password" label="Password" onChange={this.changePassword} togglePassword disabled={loading} required />

                <Button type="submit" fullSize bigBtn btnColor="green" className="text-uppercase mt-2" loading={loading}>Accedi</Button>
                <Button onClick={this.openForgot} fullSize textBtn btnColor="darkblue" className="mt-2">Hai dimenticato la password?</Button>
            </form>
        </div>
    }
}