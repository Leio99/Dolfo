import React from "react"
import { InputProps } from "../../models/InputProps"
import { Icon } from "../layout/Icon"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"
import onClickOutside from "react-onclickoutside"

export interface IProps extends InputProps{
    readonly defaultValue?: any
    readonly multiple?: boolean
}
export interface IState{
    readonly value: any
    readonly openSelect: boolean
    readonly options: Option[]
}

class Select extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        let value = props.defaultValue || (props.multiple ? [] : (this.props.children as Option[])[0].props.value)

        this.state = {
            value,
            openSelect: false,
            options: this.getOptions()
        }
    }

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.children !== this.props.children){
            let value = this.state.value,
            hasValues = false,
            options = this.getOptions()

            if(!this.props.multiple){
                let find = options.find(opt => opt.props.value === value)

                if(find) hasValues = true
            }else{
                options.forEach(opt => {
                    value.forEach((v: any) => {
                        if(v === opt.props.value) hasValues = true
                    })
                })
            }

            this.setState({
                options,
                value: hasValues ? value : (this.props.multiple ? [] : (this.props.children as Option[])[0].props.value)
            })

            value !== this.state.value && this.props.onChange && this.props.onChange(value)
        }
    }

    changeOption = (value: any) => {
        this.setState({
            value,
            openSelect: false
        })

        this.props.onChange && this.props.onChange(value)
    }

    changeMultiple = (value: any, index: number) => {
        let newList = [...this.state.value]

        if(this.state.value.includes(value))
            newList = this.state.value.filter((v: any) => v !== value)
        else
            newList.splice(index, 0, value)

        this.setState({ value: newList })

        this.props.onChange && this.props.onChange(newList)
    }

    onFocus = () => this.setState({ openSelect: true })

    onBlur = () => this.setState({ openSelect: false })

    getOptions = () => React.Children.map(this.props.children, (child: any) => child)

    decodeValue = (value: any) => {
        if(this.props.multiple){
            let list = this.state.value.map((v: any) => {
                return this.state.options.find(option => option.props.value === v)?.props.label
            }).filter((v: any) => v)

            return list.join(", ")
        }

        return this.state.options.find(option => option.props.value === value)?.props.label
    }

    handleClickOutside = () => this.onBlur()

    render = (): JSX.Element => {
        const props = this.props,
        { value, openSelect, options } = this.state,
        icon = props.icon || {
            type: "fa",
            key: "hand-pointer"
        }

        return <InputWrapper icon={icon} label={props.label} onFocus={this.onFocus} focusBool={openSelect} isFocusable disabled={props.disabled}>
            <Icon icon={{ type: "far", key: "chevron-down"}} className="select-caret" />

            <div className="dolfo-input-select">
                <input
                    type="text"
                    value={value}
                    required={props.required}
                    tabIndex={-1}
                    readOnly={props.readonly}
                />

                <span>{this.decodeValue(value)}</span>
            </div>

            {
                props.multiple ? <div className={"dolfo-select-options" + (openSelect ? " show" : "") + (props.multiple ? " multiple" : "")} style={props.style}>
                    {
                        options.map((option, i) => {
                            return <Option {...option.props} selected={value.includes(option.props.value)} onChange={(val) => this.changeMultiple(val, i)} multiple />
                        })
                    }
                </div> : <div className={"dolfo-select-options" + (openSelect ? " show" : "")} style={props.style}>
                    {
                        options.map(option => {
                            return <Option {...option.props} selected={option.props.value === value} onChange={this.changeOption} />
                        })
                    }
                </div>
            }
        </InputWrapper>
    }
}

export default onClickOutside(Select)