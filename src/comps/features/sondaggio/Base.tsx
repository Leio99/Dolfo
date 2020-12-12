import React from "react"
import { ComponentAsDialogProps, Dialog } from "../../layout/Dialog";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

export interface IState{
    readonly step: number
    readonly poll: any
}
export interface StepProps{
    readonly setVar: (key: string, value: any) => void
    readonly nextStep: () => void
    readonly prevStep: () => void
    readonly closePoll: () => void
    readonly isCurrent: boolean
    readonly poll: any
}

export class Base extends React.PureComponent<ComponentAsDialogProps, IState>{
    readonly MAX_STEPS = 4

    constructor(props: ComponentAsDialogProps){
        super(props)

        this.state = {
            step: 1,
            poll: {}
        }
    }

    setVar = (key: string, value: any) => {
        const poll = {
            ...this.state.poll,
            [key]: value
        }

        this.setState({ poll })
    }

    nextStep = () => this.setState({ step: this.state.step < this.MAX_STEPS ? this.state.step + 1 : this.state.step })

    prevStep = () => this.setState({ step: this.state.step > 1 ? this.state.step - 1 : this.state.step })

    render = (): JSX.Element => {
        const { step, poll } = this.state,
        props = {  setVar: this.setVar, prevStep: this.prevStep, nextStep: this.nextStep, poll, closePoll: this.props.close }

        return <Dialog title={"Registrazione: " + step + "/" + this.MAX_STEPS} onClose={this.props.close} hideFooter visible top>
            <Step1 {...props} isCurrent={step === 1} />
            <Step2 {...props} isCurrent={step === 2} />
            <Step3 {...props} isCurrent={step === 3} />
            <Step4 {...props} isCurrent={step === 4} />
        </Dialog>
    }
}