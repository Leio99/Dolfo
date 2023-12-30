import _ from "lodash"
import React, { CSSProperties, createRef } from "react"
import { BaseIconProps, Icon, LoadingIcon } from "./Icon"

type InternalStep = { readonly step: Step, readonly index: number } | string

interface IProps extends React.PropsWithChildren{
    /** Defines the current step
     * @type number
     * @required
     */
    readonly currentStep: number
    /** Defines if the stepper is vertical
     * @type boolean
     */
    readonly vertical?: boolean
    /** Additional className for the stepper
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the stepper
     * @type string
     */
    readonly className?: string
}

interface StepProps extends React.PropsWithChildren{
    /** Defines the title of the step
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Defines custom icon for the step
     * @type BaseIconProps
     */
    readonly icon?: BaseIconProps
    /** Defines if the step is loading
     * @type boolean
     */
    readonly loading?: boolean
    /** Additional className for the step
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the step
     * @type string
     */
    readonly className?: string
}

export class Stepper extends React.PureComponent<IProps>{
    private ref = createRef<HTMLDivElement>()

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.currentStep !== this.props.currentStep){
            const node = this.ref.current,
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

    render = (): React.ReactNode => {
        const { props } = this,
        steps = this.getChildrenSteps(),
        stepsSeparated = this.getChildrenStepsWithSeparators(),
        currentStep = props.currentStep >= 0 ? props.currentStep : 0,
        marginLeft = (-currentStep * 100) + "%"

        return <div className={"dolfo-stepper" + (props.vertical ? " vertical" : "") + (props.className ? (" " + props.className) : "")} style={props.style} ref={this.ref}>
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

                        return <div className={"dolfo-step" + (isCurrent ? " current" : "") + (step.props.className ? (" " + step.props.className) : "")} style={style} key={i}>
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

export class Step extends React.PureComponent<StepProps>{}