import React, { FormEvent } from "react"
import DatePicker from "../../form/DatePicker"
import Button from "../../layout/Button"
import { StepProps } from "./Base"

export interface IState{
    readonly dataNascita: string
}

export class Step3 extends React.PureComponent<StepProps, IState>{
    constructor(props: StepProps){
        super(props)

        this.state = {
            dataNascita: ""
        }
    }

    changeDataNascita = (dataNascita: string) => this.setState({ dataNascita })

    sendStep = (e: FormEvent) => {
        e.preventDefault()
        this.props.setVar("step3", this.state)
        this.props.nextStep()
    }

    render = () => {
        const { dataNascita } = this.state

        return <form onSubmit={this.sendStep} className={!this.props.isCurrent && "d-none"}>
            <div className="row">
                <div className="col">
                    <DatePicker label="Data di nascita" onChange={this.changeDataNascita} />
                </div>
                <div className="px-4">
                    <img src="http://habboemotion.com/resources/images/figures/frank_17.gif" alt="birth" />
                </div>
            </div>

            <div className="d-flex mt-3">
                <Button smallBtn textBtn btnColor="red" onClick={this.props.prevStep}>Indietro</Button>
                <Button smallBtn btnColor="blue" type="submit" className="ml-auto" disabled={dataNascita === ""}>Prossimo</Button>
            </div>
        </form>
    }
}