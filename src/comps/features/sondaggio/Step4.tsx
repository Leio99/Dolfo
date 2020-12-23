import React, { FormEvent } from "react"
import { CheckBox } from "../../form/CheckBox"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { StepProps } from "./Base"

export interface IState{
    readonly accepted: boolean
    readonly loading: boolean
}

export class Step4 extends React.PureComponent<StepProps, IState>{
    constructor(props: StepProps){
        super(props)

        this.state = {
            accepted: false,
            loading: false
        }
    }

    switchAccept = () => this.setState({ accepted: !this.state.accepted })

    sendStep = (e: FormEvent) => {
        e.preventDefault()
        this.props.setVar("step4", { accepted: this.state.accepted })

        this.toggleLoading()

        setTimeout(() => {
            this.toggleLoading()

            Dialog.infoDialog({
                type: "success",
                content: "Registrazione completata! Effettua il login.",
                onOk: this.props.closePoll
            })
        }, 2000)
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading })

    openTerms = (e: FormEvent, policy = false) => {
        e.preventDefault()
        Dialog.openDialog({
            overflows: true,
            width: "500px",
            title: policy ? "Privacy Policy" : "Termini di Servizio",
            className: "text-justify",
            hideCancel: true,
            okText: "Chiudi",
            okType: "blue",
            content: <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero minima ad, praesentium dolores dignissimos ut! Vitae, necessitatibus! Eum earum fuga repudiandae non minus cumque a, dolore perspiciatis et sunt. Deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate consectetur tenetur explicabo nisi odit repellendus nobis natus? Laboriosam mollitia voluptatum quia repellendus libero? Odit vero nostrum harum hic ullam!</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero minima ad, praesentium dolores dignissimos ut! Vitae, necessitatibus! Eum earum fuga repudiandae non minus cumque a, dolore perspiciatis et sunt. Deleniti.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero minima ad, praesentium dolores dignissimos ut! Vitae, necessitatibus! Eum earum fuga repudiandae non minus cumque a, dolore perspiciatis et sunt. Deleniti.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero minima ad, praesentium dolores dignissimos ut! Vitae, necessitatibus! Eum earum fuga repudiandae non minus cumque a, dolore perspiciatis et sunt. Deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aliquid quasi in velit sit corrupti, blanditiis pariatur alias quas tempora molestias aperiam molestiae nulla asperiores adipisci atque eius! Pariatur, labore!</p>
                <p className="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero minima ad, praesentium dolores dignissimos ut! Vitae, necessitatibus! Eum earum fuga repudiandae non minus cumque a, dolore perspiciatis et sunt. Deleniti.</p>
            </div>
        })
    }

    openPolicy = (e: any) => this.openTerms(e, true)

    render = () => {
        const { accepted, loading } = this.state

        return <form onSubmit={this.sendStep} className={!this.props.isCurrent && "d-none"}>
            <div className="row">
                <div className="col text-justify">
                    <p className="mb-1">Ehi, ci siamo quasi!</p>
                    <p className="mb-0">Prima di proseguire devi accettare i nostri <a onClick={this.openTerms} href="/readTerms">Termini di Servizio</a> e la nostra <a onClick={this.openPolicy} href="/readPolicy">Informativa sulla Privacy</a>. Prenditi il tuo tempo per leggerli e torna in questa schermata per completare la tua registrazione.</p>
                </div>
                <div className="px-4">
                    <img src="http://habboemotion.com/resources/images/figures/frank_11.gif" alt="terms" />
                </div>
            </div>

            <div className="my-3">
                <CheckBox checked={accepted} label="Accetto i Termini di Servizio e la Privacy Policy del sito" onChange={this.switchAccept} disabled={loading} />
            </div>

            <div className="d-flex">
                <Button smallBtn textBtn btnColor="red" onClick={this.props.prevStep} disabled={loading}>Indietro</Button>
                <Button smallBtn btnColor="green" type="submit" className="ml-auto" loading={loading} disabled={!accepted}>Completa</Button>
            </div>
        </form>
    }
}