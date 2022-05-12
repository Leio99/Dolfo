import React from "react"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { CloseIcon, Icon, LoadingIcon, SearchIcon } from "../layout/Icon"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"
import onClickOutside from "react-onclickoutside"
import { Constants } from "../shared/Constants"
import _ from "lodash"
import { Tooltip } from "../layout/Tooltip"

export interface SelectProps extends ExtendedInputProps, React.PropsWithChildren<unknown>{
    readonly defaultValue?: any
    readonly multiple?: boolean
    readonly canSearch?: boolean
    readonly loading?: boolean
}

interface IState{
    readonly value: any
    readonly openSelect: boolean
    readonly options: Option[]
    readonly searchValue: string
    readonly currentSelection: number
}

class Select extends React.PureComponent<SelectProps, IState>{
    constructor(props: SelectProps){
        super(props)

        this.state = {
            value: props.defaultValue ?? (props.multiple ? [] : null),
            openSelect: false,
            options: this.getOptions(),
            searchValue: "",
            currentSelection: -1
        }
    }

    componentDidUpdate = (prevProps: React.PropsWithChildren<SelectProps>): void => {
        if(!_.isEqual(prevProps.children, this.props.children)){
            const value = this.state.value,
            options = this.getOptions()
            let hasValues = false

            if(!this.props.multiple)
                hasValues = options?.some(opt => _.isEqual(value, opt.props.value))
            else
                hasValues = options?.some(opt => value.some((v: any) => _.isEqual(v, opt.props.value)))

            this.setState({
                options,
                value: hasValues ? value : (this.props.multiple ? [] : this.props.defaultValue)
            })

            !_.isEqual(value, this.state.value) && this.props.onChange && this.props.onChange(value)
        }
        
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.setState({ value: this.props.defaultValue })
    }

    changeOption = (value: any): void => {
        if(_.isEqual(this.state.value, value) || this.props.disabled) return

        this.setState({
            value,
            openSelect: this.props.multiple ? true : false
        })

        this.resetSearch()

        this.props.onChange && this.props.onChange(value)
    }

    changeMultiple = (value: any): void => {
        if(this.props.disabled) return
        
        const options = this.getOptions().map(v => v.props.value)
        let newList: any[] = []

        if(this.state.value.includes(value))
            newList = this.state.value.filter((v: any) => !_.isEqual(v, value))
        else
            newList = options.filter(v => this.state.value.includes(v) || _.isEqual(v, value))

        this.setState({ value: newList })

        this.resetSearch()

        this.props.onChange && this.props.onChange(newList)
    }

    onFocus = (ref: HTMLInputElement): void => this.setState({ openSelect: true }, () => ref?.focus({ preventScroll: true }))

    onBlur = (): void => {
        this.setState({
            openSelect: false,
            currentSelection: -1
        })

        this.resetSearch()
    }

    getOptions = (): Option[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    decodeValue = (value: any): any => {
        if(this.props.multiple){
            const list = this.state.value.map((v: any) => this.state.options?.find(option => _.isEqual(v, option.props.value))?.props.label).filter((v: any) => v)

            return list.join(", ")
        }

        return this.state.options?.find(option => _.isEqual(value, option.props.value))?.props.label
    }

    handleClickOutside: () => void = this.onBlur

    changeSearch = (e: any): void => {
        this.setState({
            searchValue: e.target.value,
            options: this.getOptions()?.filter(opt => opt.props.label?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0)
        })
    }

    resetSearch = (): void => this.changeSearch({ target: { value: "" }})

    handleKeyDown = (e: KeyboardEvent): void => {        
        const options = this.state.options,
        currentSelection = this.state.currentSelection,
        currentIndex = currentSelection === -1 ? -1 : options.indexOf(options.find((_, i) => i === currentSelection))
        let newIndex = -1

        if(e.key === "ArrowUp"){
            if(currentIndex === 0) newIndex = options.length - 1
            else if(currentIndex === -1) newIndex = 0
            else newIndex = currentIndex - 1
            
            e.preventDefault()
        }else if(e.key === "ArrowDown"){
            if(currentIndex === options.length - 1 || currentIndex === -1) newIndex = 0
            else newIndex = currentIndex + 1
            
            e.preventDefault()
        }else if(e.key === "Enter" && options.length){
            const option = options[currentIndex] || options[0]

            if(this.props.multiple) this.changeMultiple(option.props.value)
            else this.changeOption(option.props.value)
            
            e.preventDefault()
        }

        newIndex > -1 && this.setState({ currentSelection: newIndex })
    }

    render = (): JSX.Element => {
        let input: HTMLInputElement
        const { props } = this,
        { value, openSelect, options, searchValue, currentSelection } = this.state,
        icon = props.icon || { iconKey: "hand-pointer", type: "far" },
        searchInput = <div className="dolfo-select-search-content">
            <SearchIcon className="dolfo-select-search-icon" />
            {searchValue.length ? <Tooltip tooltip={Constants.RESET_INPUT_TEXT}>
                <CloseIcon className="reset-input" onClick={this.resetSearch} />
            </Tooltip> : null}

            <input type="text" ref={r => input = r} value={searchValue} onChange={this.changeSearch} className="dolfo-select-search-input" placeholder={Constants.SEARCH_PLACEHOLDER} />
        </div>

        return <InputWrapper icon={icon} label={props.label} onFocus={() => this.onFocus(input)} focusBool={openSelect} isFocusable disabled={props.disabled || props.loading} onKeyDown={this.handleKeyDown} style={props.wrapperStyle} required={props.required} className={"dolfo-select-wrapper" + (props.className ? " " + props.className : "")} value={value} selectedOption={currentSelection}>
            <span className="select-icon">
                {props.loading ? <LoadingIcon spinning className="loading" /> : <Icon type="far" iconKey="chevron-down" />}
            </span>

            <div className="dolfo-input-select">
                <input
                    type="text"
                    value={value ?? ""}
                    disabled={props.disabled}
                    tabIndex={-1}
                    required={props.required}
                    autoFocus={props.autoFocus}
                    readOnly
                />

                <span>{this.decodeValue(value)}</span>

                {props.canSearch && searchInput}
            </div>

            {
                options && options.length ? (props.multiple ? <div className={"dolfo-select-options" + (openSelect ? " show" : "") + (props.multiple ? " multiple" : "")}>
                    {
                        options.map((option, i) => {
                            return <Option {...option.props} selected={value.includes(option.props.value)} focused={i === currentSelection} onChange={val => this.changeMultiple(val)} multiple key={i} />
                        })
                    }
                </div> : <div className={"dolfo-select-options" + (openSelect ? " show" : "")}>
                    {
                        options.map((option, i) => {
                            return <Option {...option.props} selected={_.isEqual(option.props.value, value)} focused={i === currentSelection} onChange={this.changeOption} key={i} />
                        })
                    }
                </div>) : null
            }
        </InputWrapper>
    }
}

export default onClickOutside(Select)