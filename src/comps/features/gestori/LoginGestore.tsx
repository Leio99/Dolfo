import React from "react"
import { GestoriService } from "../../../services/GestoriService"
import Button from "../../layout/Button"
import { NotificationMsg } from "../../layout/NotificationMsg"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IState{
    readonly loading: boolean
}

export class LoginGestore extends React.PureComponent<undefined, IState>{
    constructor(props: undefined){
        super(props)

        this.state = {
            loading: false
        }
    }

    componentDidMount = () => document.body.classList.add("login")

    componentWillUnmount = () => document.body.classList.remove("login")

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    tryLogin = () => {
        this.toggleLoading()

        GestoriService.tryLogin(null).then(response => {
            this.toggleLoading()
            sessionStorage.setItem("sessionGestore", JSON.stringify(response.data))
            ComponentsPermissions.checkLoginGestore()
            NotificationMsg.showSuccess("Login effettuato con successo!")
        }).catch(this.toggleLoading)
    }

    openSPID = () => {
        const y = window.top.outerHeight / 2 + window.top.screenY - (500 / 2),
        x = window.top.outerWidth / 2 + window.top.screenX - (500 / 2),
        new_window = window.open("http://localhost:3000/layout", "", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=500, height=500, top=${y}, left=${x}`);

        (new_window as any).sendSPIDResponse = this.tryLogin
    }

    render = (): JSX.Element => {
        const { loading } = this.state

        return <div className="floating-centered p-3 rounded shadow bg-white col-10 col-md-5">
            <h2>Accesso gestori</h2>

            <Button fullSize bigBtn btnColor="blue" className="text-uppercase mt-2" loading={loading} onClick={this.openSPID}>Accedi con SPID</Button>
        </div>
    }
}