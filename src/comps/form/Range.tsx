import _ from "lodash"
import React from "react"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"
import { isDarkTheme } from "../shared/utility"

export interface RangeProps extends BaseInputProps{
    /** The minimum selectable value
     * @type number
     * @required
     */
    readonly min: number
    /** The maximum selectable value
     * @type number
     * @required
     */
    readonly max: number
    /** The number of steps to be executed when sliding
     * @type number
     * @required
     */
    readonly steps: number
    /** If true, shows the step under the input
     * @type boolean
     */
    readonly showSteps?: boolean
    /** The default value of the input
     * @type number
     */
    readonly value?: number
    /** If true, the onChange event will be fired only when the user releases the input control
     * @type boolean
     */
    readonly changeAfterRelease?: boolean
}

interface IState{
    readonly value: number
    readonly color: string
}

export class Range extends React.Component<RangeProps, IState>{
    private observer: MutationObserver

    constructor(props: RangeProps){
        super(props)

        this.state = {
            value: props.value != null && props.value >= props.min && props.value <= props.max && props.min ? props.value : 0,
            color: isDarkTheme() ? "var(--darkhover)" : "var(--lightgrey)"
        }
    }

    componentDidMount = (): void => {
        this.observer = new MutationObserver(() => this.setState({
            color: isDarkTheme() ? "var(--darkhover)" : "var(--lightgrey)"
        }))

        this.observer.observe(document.querySelector("html"), { attributes: true })
    }

    componentDidUpdate = (prevProps: RangeProps): void => {
        if(prevProps.value !== this.props.value && this.props.value != null && this.props.value >= this.props.min && this.props.value <= this.props.max)
            this.setState({ value: this.props.value })
    }

    componentWillUnmount = (): void => this.observer.disconnect()

    onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value),
        { changeAfterRelease, disabled, onChange } = this.props

        if(disabled)
            return

        if(value >= this.props.min && value <= this.props.max){
            this.setState({ value })

            if(!changeAfterRelease && onChange)
                this.propagateChange()
        }
    }

    propagateChange = (): void => this.props.onChange(this.state.value)
    
    render = (): React.ReactNode => {
        const { value, color } = this.state,
        { changeAfterRelease, label, max, min, steps, required, style, disabled, className, showSteps, onChange } = this.props,
        range = _.range(min, max, steps).concat(max),
        bValue = (value - min) / (max - min) * 100

        return <div className={"dolfo-input-range dolfo-form-input" + (disabled ? " disabled" : "") + (className ? " " + className : "")} style={style}>
            {label && <label className="dolfo-input-label">
                {label}
                {required ? <Tooltip tooltip={getConstant("REQUIRED_FIELD")}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip> : <span className="dolfo-input-required"></span>} 
            </label>}
            <input type="range" min={min} max={max} step={steps} value={value} onChange={this.onChange} disabled={disabled} onMouseUp={e => {
                if (changeAfterRelease && onChange && !disabled && e.nativeEvent.button === 0)
                    this.propagateChange()
            }} style={{
                background: `linear-gradient(to right, var(--selectionblue) 0%, var(--selectionblue) ${bValue}%, ${color} ${bValue}%, ${color} 100%)`
            }} />
            {showSteps && <div className="dolfo-input-range-steps">
                {range.map(step => <strong key={step}>
                    <span>{step}</span>
                </strong>)}
            </div>}
        </div>
    }
}