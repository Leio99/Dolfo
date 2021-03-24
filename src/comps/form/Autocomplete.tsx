import React, { CSSProperties } from "react"
import { CloseIcon, SearchIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

export interface IProps<T>{
    readonly onChange?: (value: T) => void
    readonly disabled?: boolean
    readonly wrapperStyle?: CSSProperties
    readonly required?: boolean
    readonly className?: string
    readonly icon?: JSX.Element
    readonly label?: string
}
export interface IState<T, K>{
    readonly data: T[]
    readonly openSelect: boolean
    readonly searchKeys: string
    readonly currentSelection: T
    readonly selectedKey: K
    readonly timeout: NodeJS.Timeout
}

export abstract class Autocomplete<T, K> extends React.Component<IProps<T>, IState<T, K>>{
    constructor(props: IProps<T>){
        super(props)

        this.state = {
            data: [],
            searchKeys: "",
            openSelect: false,
            currentSelection: null,
            selectedKey: null,
            timeout: null
        }
    }

    abstract getDes = (item: T): string => {
        return null
    }

    abstract getKey = (item: T): K => {
        return null
    }

    abstract search = (input: string): Promise<T[]> => {
        return null
    }

    reset = () => {
        this.setState({
            searchKeys: "",
            data: [],
            currentSelection: null
        })

        this.props.onChange && this.props.onChange(null)
    }

    changeSearch = (e: any) => {
        const searchKeys = e.target.value

        clearTimeout(this.state.timeout)

        this.setState({
            searchKeys,
            data: [],
            timeout: setTimeout(() => {
                if(searchKeys)
                    this.search(searchKeys).then(data => this.setState({ data })).finally(this.resetTimeout)
                else
                    this.resetTimeout()
            }, 300)
        })
    }

    resetTimeout = () => this.setState({ timeout: null })

    onFocus = (ref: HTMLInputElement) => this.setState({ openSelect: true }, () => ref?.focus({ preventScroll: true }))

    onBlur = () => this.setState({ openSelect: false })

    handleClickOutside = this.onBlur

    selectOption = (item: T) => {
        this.setState({
            currentSelection: item,
            selectedKey: this.getKey(item),
            openSelect: false,
            searchKeys: this.getDes(item)
        })

        this.props.onChange && this.props.onChange(item)
    }

    handleKeyDown = (e: KeyboardEvent) => {        
        const { data, selectedKey } = this.state,
        currentIndex = selectedKey === null ? -1 : data.indexOf(data.find(o => this.getKey(o) === selectedKey))
        let newIndex = -1

        if(e.key === "ArrowUp"){
            if(currentIndex === 0) newIndex = data.length - 1
            else if(currentIndex === -1) newIndex = 0
            else newIndex = currentIndex - 1
            
            e.preventDefault()
        }else if(e.key === "ArrowDown"){
            if(currentIndex === data.length - 1 || currentIndex === -1) newIndex = 0
            else newIndex = currentIndex + 1
            
            e.preventDefault()
        }else if(e.key === "Enter" && data.length){
            const option = data[currentIndex] || data[0]

            this.selectOption(option)
            
            e.preventDefault()
        }

        newIndex > -1 && this.setState({
            selectedKey: this.getKey(data[newIndex]),
            currentSelection: data[newIndex]
        })
    }

    render = () => {
        const { searchKeys, openSelect, currentSelection, data, selectedKey, timeout } = this.state,
        props = this.props,
        value = currentSelection ? this.getDes(currentSelection) : "",
        icon = props.icon || <SearchIcon className="dolfo-select-search-icon" />

        let input: HTMLInputElement

        return <InputWrapper icon={null} label={props.label} onFocus={() => this.onFocus(input)} focusBool={openSelect} isFocusable disabled={props.disabled} style={props.wrapperStyle} required={props.required} className={"dolfo-autocomplete" + (props.className ? " " + props.className : "")} onKeyDown={this.handleKeyDown} value={value} selectedOption={currentSelection}>
            <div className="dolfo-input-select">
                <input
                    type="text"
                    value={value}
                    required={props.required}
                    tabIndex={-1}
                    readOnly
                />

                <span>{value}</span>
            </div>

            <div className={"dolfo-select-options" + (openSelect ? " show" : "")}>
                <div className="dolfo-select-search-content">
                    {icon}
                    {searchKeys.length ? <CloseIcon className="reset-input" onClick={this.reset} tooltip={Constants.RESET_INPUT_TEXT} /> : null}

                    <input type="text" ref={r => input = r} value={searchKeys} onChange={this.changeSearch}className="dolfo-select-search-input" placeholder={Constants.SEARCH_PLACEHOLDER} />
                </div>

                {
                    data.length ? data.map(option => <Option label={this.getDes(option)} value={this.getKey(option)} onChange={() => this.selectOption(option)} selected={this.getKey(option) === selectedKey} />) : <div className="autocomplete-no-results">{timeout ? Constants.LOADING_TEXT : Constants.NO_RESULT_TEXT}</div>
                }
            </div>
        </InputWrapper>
    }
}
