import React from "react"
import Button from "../layout/Button"
import { Step, Stepper } from "../layout/Stepper"
import { goToApiBlock, MenuContentProps } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class StepperPage extends React.Component<MenuContentProps, {
    readonly [x: string]: number
}>{
    constructor(props: MenuContentProps){
        super(props)

        this.state = {
            stepper1: 0,
            stepper2: 0
        }
    }

    addStep = (key: string) => this.setState({ [key]: this.state[key] +  1 })

    removeStep = (key: string) => this.setState({ [key]: this.state[key] - 1 })

    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a stepper.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple stepper"
            result={<Stepper currentStep={this.state.stepper1}>
                <Step title="Step 1" icon={{ iconKey: "home" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="blue" onClick={() => this.addStep("stepper1")}>Next</Button>
                </Step>
                <Step title="Step 2" icon={{ iconKey: "cogs" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="blue" onClick={() => this.addStep("stepper1")}>Next</Button>
                    <Button size="small" type="text" btnColor="red" onClick={() => this.removeStep("stepper1")}>Back</Button>
                </Step>
                <Step icon={{ iconKey: "power-off" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="green" onClick={() => this.addStep("stepper1")}>End</Button>
                </Step>
            </Stepper>}
            code={'<Stepper currentStep={this.state.stepper1}>\n\t<Step title="Step 1" icon={{ iconKey: "home" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="blue" onClick={() => this.addStep("stepper1")}>Next</Button>\n\t</Step>\n\t<Step title="Step 2" icon={{ iconKey: "cogs" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="blue" onClick={() => this.addStep("stepper1")}>Next</Button>\n\t\t<Button size="small" type="text" btnColor="red" onClick={() => this.removeStep("stepper1")}>Back</Button>\n\t</Step>\n\t<Step icon={{ iconKey: "power-off" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="green" onClick={() => this.addStep("stepper1")}>End</Button>\n\t</Step>\n</Stepper>'}
        />

        <ResultCode
            title="Vertical"
            result={<Stepper vertical currentStep={this.state.stepper2}>
                <Step icon={{ iconKey: "home" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="blue" onClick={() => this.addStep("stepper2")}>Next</Button>
                </Step>
                <Step icon={{ iconKey: "cogs" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="blue" onClick={() => this.addStep("stepper2")}>Next</Button>
                    <Button size="small" type="text" btnColor="red" onClick={() => this.removeStep("stepper2")}>Back</Button>
                </Step>
                <Step icon={{ iconKey: "power-off" }}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>

                    <Button size="small" btnColor="green" onClick={() => this.addStep("stepper2")}>End</Button>
                </Step>
            </Stepper>}
            code={'<Stepper vertical currentStep={this.state.stepper2}>\n\t<Step icon={{ iconKey: "home" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="blue" onClick={() => this.addStep("stepper2")}>Next</Button>\n\t</Step>\n\t<Step icon={{ iconKey: "cogs" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="blue" onClick={() => this.addStep("stepper2")}>Next</Button>\n\t\t<Button size="small" type="text" btnColor="red" onClick={() => this.removeStep("stepper2")}>Back</Button>\n\t</Step>\n\t<Step icon={{ iconKey: "power-off" }}>\n\t\t<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quia laborum facilis quibusdam molestias! Quas eos ipsum nobis corporis amet fuga est, doloribus voluptatum! Recusandae dignissimos numquam odio veritatis doloremque!</p>\n\n\t\t<Button size="small" btnColor="green" onClick={() => this.addStep("stepper2")}>End</Button>\n\t</Step>\n</Stepper>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single steps.",
                type: "Step",
                required: true,
                onDoubleClick: () => goToApiBlock("#stepProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "currentStep",
                desc: "Determines the current step (index = 0). It must be managed by your component.",
                type: "number",
                required: true
            },
            {
                name: "vertical",
                desc: "Determines whether the stepper should be horizontal or vertical.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional style for the stepper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="stepProps" title="Step properties" data={[
            {
                name: "title",
                desc: "The title of the step.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "icon",
                desc: "Custom icon for the step circle.",
                type: "Icon",
                required: false,
                default: "null",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "loading",
                desc: "Determines whether the step is loading or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional style for the step.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <IconApis {...this.props} />
    </>
}