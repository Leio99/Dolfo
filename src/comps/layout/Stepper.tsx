import _ from "lodash"
import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { BaseIconProps, Icon, LoadingIcon } from "./Icon"

type InternalStep = { readonly step: Step, readonly index: number } | string

interface IProps extends React.PropsWithChildren{
    readonly currentStep: number
    readonly className?: string
    readonly style?: CSSProperties
    readonly vertical?: boolean
}

interface StepProps extends React.PropsWithChildren{
    readonly title?: string
    readonly icon?: BaseIconProps
    readonly style?: CSSProperties
    readonly loading?: boolean
}

export class Stepper extends React.PureComponent<IProps>{
    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.currentStep !== this.props.currentStep){
            const node = ReactDOM.findDOMNode(this),
            container = Array.from(node.childNodes).find((v: any) => v.classList.contains("dolfo-stepper-steps")) as HTMLElement

            container.style.overflow = "hidden"

            setTimeout(() => container.style.removeProperty("overflow"), 400)
        }
    }

    getChildrenStepsWithSeparators = (): InternalStep[] => {
        const children: InternalStep[] = []

        React.Children.forEach(this.props.children, (child: any, i: number) => {
            if(i > 0) children.push("")

            children.push({ step: child, index: i })
        })

        return children
    }

    getChildrenSteps = (): Step[] => React.Children.map(this.props.children, (child: any) => child)

    render = (): JSX.Element => {
        const { props } = this,
        steps = this.getChildrenSteps(),
        stepsSeparated = this.getChildrenStepsWithSeparators(),
        currentStep = props.currentStep >= 0 ? props.currentStep : 0,
        marginLeft = (-currentStep * 100) + "%"

        return <div className={"dolfo-stepper" + (props.vertical ? " vertical" : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            <div className="dolfo-stepper-header">
                {
                    stepsSeparated.map((child, i) => {
                        if(_.isString(child)) return <div className="dolfo-step-separator" key={i}></div>

                        return <div className={"dolfo-stepper-step-title" + (currentStep === child.index ? " current" : "")} key={i}>
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
                    steps.map((step, i) => {
                        const style = i === 0 ? props.vertical ? step.props.style : { ...step.props.style, marginLeft } : null,
                        isCurrent = currentStep === i

                        return <div className={"dolfo-step" + (isCurrent ? " current" : "")} style={style} key={i}>
                            <div className={"dolfo-step-content" + (step.props.loading ? " loading" : "")} style={step.props.style}>
                                {step.props.loading && <div className="dolfo-step-loading">
                                    <LoadingIcon spinning style={{ fontSize: 50 }} />    
                                </div>}

                                {step.props.children}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export class Step extends React.PureComponent<StepProps>{
    render = (): JSX.Element => <></>
}