import React, { FormEvent } from "react"
import { Option } from "../../form/Option"
import { RadioButton } from "../../form/RadioButton"
import Button from "../../layout/Button"
import { StepProps } from "./Base"

export interface IState{
    readonly gender: string
}

export class Step1 extends React.PureComponent<StepProps, IState>{
    constructor(props: StepProps){
        super(props)

        this.state = {
            gender: ""
        }
    }

    changeGender = (gender: string) => this.setState({ gender })

    sendStep = (e: FormEvent) => {
        e.preventDefault()
        this.props.setVar("step1", this.state)
        this.props.nextStep()
    }

    render = () => {
        const { gender } = this.state

        return <form onSubmit={this.sendStep} className={!this.props.isCurrent && "d-none"}>
            <div className="row">
                <div className="col">
                    <RadioButton controlName="animal" label="Sei un ragazzo o una ragazza?" onChange={this.changeGender} required>
                        <Option label="Ragazzo" value="M" className="mb-1" />
                        <br />
                        <Option label="Ragazza" value="F" />
                    </RadioButton>
                </div>

                <div className="px-4">
                    <img src="http://habboemotion.com/resources/images/figures/Figure%20(55).gif" alt="male-female" />
                </div>
            </div>

            <div className="text-right mt-3">
                <Button smallBtn btnColor="blue" type="submit" disabled={gender === ""}>Prossimo</Button>
            </div>
        </form>
    }
}