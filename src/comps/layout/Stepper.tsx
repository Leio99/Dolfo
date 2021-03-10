import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Icon } from "./Icon"
import { Step } from "./Step"

export interface IProps{
    readonly currentStep?: number
    readonly className?: string
    readonly style?: CSSProperties
    readonly vertical?: boolean
}

export class Stepper extends React.PureComponent<IProps>{
    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.currentStep !== this.props.currentStep){
            const node = ReactDOM.findDOMNode(this),
            container = Array.from(node.childNodes).find((v: any) => v.classList.contains("dolfo-stepper-steps")) as HTMLElement

            container.style.overflow = "hidden"

            setTimeout(() => container.style.removeProperty("overflow"), 400)
        }
    }

    getChildrenStepsWithSeparators = () => {
        let children: any[] = []

        React.Children.forEach(this.props.children, (child: any, i: number) => {
            if(i > 0) children.push("")

            children.push({ step: child, index: i })
        })

        return children
    }

    getChildrenSteps = () => React.Children.map(this.props.children, (child: any) => child)

    render = (): JSX.Element => {
        const props = this.props,
        steps = this.getChildrenSteps(),
        stepsSeparated = this.getChildrenStepsWithSeparators(),
        currentStep = props.currentStep >= 0 ? props.currentStep : 0,
        marginLeft = (-currentStep * 100) + "%"

        return <div className={"dolfo-stepper" + (props.vertical ? " vertical" : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            <div className="dolfo-stepper-header">
                {
                    stepsSeparated.map((child: { step: Step, index: number } | string) => {
                        if(typeof child === "string") return <div className="dolfo-step-separator"></div>

                        return <div className={"dolfo-stepper-step-title" + (currentStep === child.index ? " current" : "")}>
                            <div className="dolfo-stepper-step-circle">
                                {child.step.props.icon ? <Icon type={child.step.props.icon.type} iconKey={child.step.props.icon.iconKey} /> : (child.index + 1)}
                            </div>
                            {child.step.props.title && <label className="dolfo-stepper-label">
                                {child.step.props.title}
                            </label>}
                        </div>
                    })
                }
            </div>

            <div className="dolfo-stepper-steps">
                {
                    steps.map((step: Step, i: number) => {
                        const style = i === 0 ? props.vertical ? step.props.style : { ...step.props.style, marginLeft } : null,
                        isCurrent = currentStep === i

                        return <div className={"dolfo-step" + (isCurrent ? " current" : "")} style={style}>
                            {step}
                        </div>
                    })
                }
            </div>
        </div>
    }
}
