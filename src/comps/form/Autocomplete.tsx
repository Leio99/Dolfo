import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { LoadingIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

interface IProps<E> extends ExtendedInputProps{
    readonly defaultValue?: E
}

interface IState<E, K>{
    readonly loading: boolean
    readonly list: E[]
    readonly selectedItem: E
    readonly selectedKey: K
    readonly filter: string
    readonly focused: boolean
    readonly showOptions: boolean
    readonly focusedIndex: number
}

export abstract class Autocomplete<E, K, P = any> extends React.Component<IProps<E> & P, IState<E, K>>{
    private readonly TIMING = 500
    private typing: _.DebouncedFunc<() => void>

    constructor(props: IProps<E> & P){
        super(props)

        this.state = {
            loading: false,
            list: [],
            selectedItem: null,
            selectedKey: null,
            filter: "",
            focused: false,
            showOptions: false,
            focusedIndex: -1
        }

        this.typing = _.debounce(() => {
            const { filter } = this.state

            if(!filter?.trim())
                return

            this.toggleLoading()

            Promise.resolve(this.getSource(filter)).then(list => {
                this.setState({ list, showOptions: true })

                if(list.length === 1)
                    this.selectOption(list[0])
            }).finally(() => setTimeout(() => this.toggleLoading()))
        }, this.TIMING)
    }

    abstract getSource: (filter: string) => Promise<E[]> | E[]

    abstract getDescription: (item: E) => string

    abstract getKey: (item: E) => K

    getSingle: (key: E) => Promise<E> | E

    componentDidMount = (): void => {
        window.addEventListener("click", this.clickOutside)

        if(this.props.defaultValue != null)
            this.fetchDefaultValue()
    }

    componentDidUpdate = (prevProps: IProps<E> & P): void => {
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.fetchDefaultValue()
    }

    componentWillUnmount = (): void => window.removeEventListener("click", this.clickOutside)

    clickOutside = (e: MouseEvent): void => {
        const element = e.target as Node,
        node = ReactDOM.findDOMNode(this)

        if(!node.contains(element)){
            this.onBlur()

            if(!this.state.selectedItem)
                this.reset()
        }
    }

    fetchDefaultValue = (): void => {
        if(!this.getSingle)
            return console.error("Errore: metodo getSingle non implementato!")

        this.toggleLoading()

        Promise.resolve(this.getSingle(this.props.defaultValue)).then(r => this.selectOption(r)).finally(() => setTimeout(() => this.toggleLoading()))
    }

    toggleLoading = (): void => this.setState({ loading: !this.state.loading })

    onBlur = (): void => this.setState({ focused: false, showOptions: false, focusedIndex: null })

    onFocus = (): void => this.setState({ focused: true })

    selectOption = (item: E): void => {
        this.setState({
            selectedKey: this.getKey(item),
            selectedItem: item,
            showOptions: false,
            focused: false,
            filter: this.getDescription(item)
        })

        this.props.onChange && this.props.onChange(item)
    }

    onChange = (e: any): void => this.setState({ filter: e.target.value })

    onKeyUp = (e: any): void => {
        this.props.onKeyUp && this.props.onKeyUp(e)

        if(Constants.AUTOCOMPLETE_EXLUDE_KEYS.includes(e.key))
            return

        const { selectedItem } = this.state

        if(selectedItem){
            this.setState({
                selectedItem: null,
                selectedKey: null
            })
        }

        this.typing()
    }

    onKeyDown = (e: any): void => {
        this.props.onKeyDown && this.props.onKeyDown(e)

        if(Constants.AUTOCOMPLETE_EXLUDE_KEYS.includes(e.key) && e.key !== "Enter" && e.key !== "ArrowUp" && e.key !== "ArrowDown")
            return

        const { focusedIndex, list, showOptions } = this.state

        if(e.key === "Enter" && focusedIndex !== null && focusedIndex >= 0){
            e.preventDefault()
            this.selectOption(list.find((_, i) => i === focusedIndex))
            this.setState({ focusedIndex: -1 })
        }else if(e.key === "ArrowUp" && showOptions){
            let newIndex: number

            if(focusedIndex === 0) newIndex = list.length - 1
            else if(focusedIndex === -1) newIndex = 0
            else newIndex = focusedIndex - 1

            this.setState({ focusedIndex: newIndex })
            
            e.preventDefault()
        }else if(e.key === "ArrowDown" && showOptions){
            let newIndex: number

            if(focusedIndex === list.length - 1 || focusedIndex === -1) newIndex = 0
            else newIndex = focusedIndex + 1

            this.setState({ focusedIndex: newIndex })
            
            e.preventDefault()
        }
    }

    reset = (input?: HTMLInputElement) => {
        this.setState({
            focused: false,
            showOptions: false,
            selectedItem: null,
            selectedKey: null,
            filter: ""
        }, () => {
            if(input){
                input.blur()
                setTimeout(() => input.focus())
            }
        })
    }

    render = (): JSX.Element => {
        const { loading, list, filter, focused, showOptions, selectedKey, focusedIndex } = this.state,
        { props } = this,
        icon = props.icon || { iconKey: "keyboard", type: "far" }
        let input: HTMLInputElement

        return <InputWrapper icon={icon} label={props.label} forceFocus={() => input.focus()} focusBool={focused} isFocusable disabled={props.disabled} resetFunction={() => this.reset(input)} style={props.wrapperStyle} required={props.required} className={"dolfo-select-wrapper" + (props.className ? " " + props.className : "")} value={filter} selectedOption={selectedKey}>
            <input
                type="text"
                autoFocus={props.autoFocus}
                onChange={this.onChange}
                disabled={props.disabled}
                value={filter}
                ref={r => input = r}
                required={props.required}
                onKeyDown={this.onKeyDown}
                onKeyPress={props.onKeyPress}
                onKeyUp={this.onKeyUp}
                onPaste={props.onPaste}
                onFocus={this.onFocus}
                autoComplete="new-password"
            />

            {
                loading && focused ? <div className="dolfo-select-options show dolfo-autocomplete-text">
                    <LoadingIcon spinning /> {Constants.LOADING_TEXT}
                </div> : showOptions && focused && list.length > 0 ? <div className="dolfo-select-options show">
                    {
                        list.map((option, i) => {
                            const key = this.getKey(option)
                            return <Option selected={selectedKey === key} label={this.getDescription(option)} onChange={() => this.selectOption(option)} value={key} focused={focusedIndex === i} />
                        })
                    }
                </div> : focused && <div className="dolfo-select-options show dolfo-autocomplete-text">
                    {Constants.TABLE_NO_RESULTS}
                </div>
            }
        </InputWrapper>
    }
}