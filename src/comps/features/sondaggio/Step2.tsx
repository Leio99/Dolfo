import React, { FormEvent } from "react"
import { TextInput } from "../../form/TextInput"
import Button from "../../layout/Button"
import { StepProps } from "./Base"

export interface IState{
    readonly username: string
    readonly password: string
    readonly email: string
}

export class Step2 extends React.PureComponent<StepProps, IState>{
    constructor(props: StepProps){
        super(props)

        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    changeNome = (username: string) => this.setState({ username })
    changePassword = (password: string) => this.setState({ password })
    changeEmail = (email: string) => this.setState({ email })

    sendStep = (e: FormEvent) => {
        e.preventDefault()
        this.props.setVar("step2", this.state)
        this.props.nextStep()
    }

    validateForm = () => {
        const state = this.state,
        username = state.username.trim(),
        password = state.password,
        email = state.email.trim()

        if(username === "" || password === "" || email === "") return true

        if(username.length < 3) return true
        if(password.length < 8) return true

        return false
    }

    render = () => {
        return <form onSubmit={this.sendStep} className={!this.props.isCurrent && "d-none"}>
            <div className="row">
                <div className="col">
                    <TextInput name="username" onChange={this.changeNome} label="Username" icon={{ iconKey: "user" }} required />
                    <TextInput name="password" type="password" onChange={this.changePassword} label="Password" required />
                    <TextInput name="email" type="email" onChange={this.changeEmail} label="E-mail" required />
                </div>
                <div className="px-4">
                    <img src="http://habboemotion.com/resources/images/figures/Figure%20(92).gif" alt="identity" />
                </div>
            </div>

            <div className="d-flex mt-3">
                <Button smallBtn textBtn btnColor="red" onClick={this.props.prevStep}>Indietro</Button>
                <Button smallBtn btnColor="blue" type="submit" className="ml-auto" disabled={this.validateForm()}>Prossimo</Button>
            </div>
        </form>
    }
}