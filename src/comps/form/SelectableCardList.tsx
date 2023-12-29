import _ from "lodash"
import React, { CSSProperties } from "react"
import { Tooltip } from "../layout/Tooltip"
import { Constants } from "../shared/Constants"
import { BaseInputProps } from "../shared/models/InputProps"
import { CheckBox } from "./CheckBox"

export interface SelectableCardListProps extends BaseInputProps, React.PropsWithChildren{
    readonly multiple?: boolean
    readonly defaultValue?: any | any[]
    readonly showCheckbox?: boolean
    readonly fullSize?: boolean
}

interface SelectableCardProps{
    readonly value: any
    readonly title: string | React.ReactNode
    readonly desc?: string | React.ReactNode
    readonly disabled?: boolean
    readonly style?: CSSProperties
    readonly className?: string
}

interface IState{
    readonly mappedProps: SelectableCardProps[]
    readonly value: any | any[]
}

export class SelectableCardList extends React.PureComponent<SelectableCardListProps, IState>{
    constructor(props: SelectableCardListProps){
        super(props)

        this.state = {
            value: props.defaultValue ?? (props.multiple ? [] : null),
            mappedProps: this.mapProps()
        }
    }

    componentDidUpdate = (prevProps: React.PropsWithChildren<SelectableCardListProps>): void => {
        if(!_.isEqual(this.state.mappedProps, this.mapProps())){
            const value = this.state.value,
            options = this.getOptions()
            let hasValues = false

            if(!this.props.multiple)
                hasValues = options?.some(opt => _.isEqual(value, opt.props.value))
            else
                hasValues = options?.some(opt => value.some((v: any) => _.isEqual(v, opt.props.value)))

            this.setState({
                value: hasValues ? value : (this.props.multiple ? [] : this.props.defaultValue),
                mappedProps: this.mapProps()
            })

            !_.isEqual(value, this.state.value) && this.props.onChange && this.props.onChange(value)
        }
        
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.setState({ value: this.props.defaultValue })
    }

    changeOption = (value: any): void => {
        if(_.isEqual(this.state.value, value) || this.props.disabled) return

        this.setState({ value })

        this.props.onChange && this.props.onChange(value)
    }

    mapProps = (children = this.props.children): SelectableCardProps[] => this.getOptions(children).map(o => o.props)

    changeMultiple = (value: any): void => {
        if(this.props.disabled) return

        const options = this.getOptions().map(v => v.props.value)
        let newList: any[] = []

        if(this.state.value.includes(value))
            newList = this.state.value.filter((v: any) => !_.isEqual(v, value))
        else
            newList = options.filter(v => this.state.value.includes(v) || _.isEqual(v, value))

        this.setState({ value: newList })

        this.props.onChange && this.props.onChange(newList)
    }

    getOptions = (children = this.props.children): SelectableCard[] => React.Children.map(children, (child: any) => child).filter(o => !!o)

    render = (): React.ReactNode => {
        const { props } = this,
        { value } = this.state,
        options = this.getOptions()

        return <div className={"dolfo-selectable-list" + (props.disabled ? " disabled" : "") + (props.className ? (" " + props.className) : "") + (props.fullSize ? " fullsize" : "")} style={props.style}>
            <input value={value?.toString() ?? ""} required={props.required} onChange={() => {}} />
            {props.label && <label className="dolfo-selectable-list-label">
                {props.label}
                {props.required && <Tooltip tooltip={Constants.REQUIRED_FIELD}>
                    <span className="dolfo-input-required"> *</span>
                </Tooltip>}  
            </label>}
            
            {
                options.map((opt, i) => {
                    const selected = props.multiple ? value.includes(opt.props.value) : _.isEqual(value, opt.props.value),
                    onChange = props.multiple ? this.changeMultiple : this.changeOption,
                    addClass = (i - 1) % 3 === 0 && !props.fullSize ? " middle" : ""

                    return <div className={"dolfo-selectable-option" + (opt.props.disabled && !props.disabled ? " disabled" : "") + (opt.props.className ? (" " + opt.props.className) : "") + (selected ? " selected" : "") + addClass} style={opt.props.style} onClick={() => onChange(opt.props.value)} key={i}>
                        {props.showCheckbox && <CheckBox checked={selected} />}
                        <h5>{opt.props.title}</h5>
                        {opt.props.desc && <small>{opt.props.desc}</small>}
                    </div>
                })
            }
        </div>
    }
}

export class SelectableCard extends React.Component<SelectableCardProps>{}