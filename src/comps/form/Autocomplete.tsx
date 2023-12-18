import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { LoadingIcon } from "../layout/Icon"
import { showError } from "../layout/NotificationMsg"
import { Constants } from "../shared/Constants"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { blurInput, sumParentZIndex } from "../shared/utility"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

export interface AutocompleteProps<E> extends ExtendedInputProps{
    readonly defaultValue?: E
    readonly selectOptionIfOnlyOne?: boolean
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

export abstract class Autocomplete<E, K, P = any> extends React.Component<AutocompleteProps<E> & P, IState<E, K>>{
    private readonly TIMING = 500
    private typing: _.DebouncedFunc<() => void>
    private rootContent = document.createElement("div")
    private root = createRoot(this.rootContent)
    private observer: ResizeObserver

    constructor(props: AutocompleteProps<E> & P){
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
                this.setState({ list, showOptions: true }, this.showOptions)

                if(list.length === 1 && props.selectOptionIfOnlyOne){
                    this.selectOption(list[0])
                    this.hideOptions()
                }
            }).catch(showError).finally(() => setTimeout(() => this.toggleLoading()))
        }, this.TIMING)
    }

    abstract getSource: (filter: string) => Promise<E[]> | E[]

    abstract getDescription: (item: E) => string

    abstract getKey: (item: E) => K

    getSingle: (key: E) => Promise<E> | E

    componentDidMount = (): void => {
        window.addEventListener("click", this.clickOutside)
        this.observer = new ResizeObserver(this.positionOptions)
        this.observer.observe(this.rootContent)
        window.addEventListener("scroll", this.positionOptions, true)

        if(this.props.defaultValue != null)
            this.fetchDefaultValue()
    }

    componentDidUpdate = (prevProps: AutocompleteProps<E> & P, prevState: IState<E, K>): void => {
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.fetchDefaultValue()

        if(!_.isEqual(this.state.selectedItem, prevState.selectedItem) || this.state.loading !== prevState.loading || (this.state.focusedIndex !== prevState.focusedIndex && this.state.focusedIndex > -1))
            this.showOptions()

        if(this.props.disabled !== prevProps.disabled)
            this.onBlur()
    }

    componentWillUnmount = (): void => {
        setTimeout(() => this.root.unmount())
        window.removeEventListener("click", this.clickOutside)
        window.removeEventListener("scroll", this.positionOptions, true)
        this.observer.disconnect()
    }

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

    onBlur = (): void => this.setState({ focused: false, showOptions: false, focusedIndex: null }, this.hideOptions)

    onFocus = (): void => this.setState({ focused: true }, this.showOptions)

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

        if(e.key.charCodeAt(0) === 84)
            this.onBlur()
        
        if(Constants.AUTOCOMPLETE_EXLUDE_KEYS.includes(e.key) && e.key !== "Enter" && e.key !== "ArrowUp" && e.key !== "ArrowDown")
            return

        const { focusedIndex, list, showOptions, selectedItem } = this.state

        if(e.key === "Enter" && focusedIndex !== null && focusedIndex >= 0){
            e.preventDefault()
            this.selectOption(list.find((_, i) => i === focusedIndex))
            this.setState({ focusedIndex: -1 }, () => {
                this.hideOptions()
                blurInput()
            })

            return
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
        }else if(e.key === "Enter" && !selectedItem)
            e.preventDefault()

        this.showOptions()
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

    showOptions = (): void => {
        const { loading, focused, showOptions, list, selectedKey, focusedIndex } = this.state,
        content = loading && focused ? <div className="dolfo-select-options show dolfo-autocomplete-text floating-popup">
            <LoadingIcon spinning /> {Constants.LOADING_TEXT}
        </div> : showOptions && focused && list.length > 0 ? <div className="dolfo-select-options floating-popup show">
            {
                list.map((option, i) => {
                    const key = this.getKey(option)
                    return <Option selected={selectedKey === key} key={key.toString()} label={this.getDescription(option)} onChange={() => this.selectOption(option)} value={key} focused={focusedIndex === i} />
                })
            }
        </div> : focused && <div className="dolfo-select-options show dolfo-autocomplete-text floating-popup">
            {Constants.TABLE_NO_RESULTS}
        </div>

        if(!showOptions && !focused)
            return

        this.root.render(content)
        setTimeout(this.positionOptions)

        if(!document.body.contains(this.rootContent))
            document.body.appendChild(this.rootContent)
    }

    hideOptions = (): void => this.rootContent.remove()

    positionOptions = (): void => {
        if((!this.state.showOptions && !this.state.focused) || !document.body.contains(this.rootContent))
            return

        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        options = this.rootContent.childNodes[0] as HTMLElement,
        { top, left, height, width } = node.getBoundingClientRect(),
        wrapper = node.querySelector(".dolfo-input-wrapper"),
        { disabled } = this.props

        if(!options || disabled)
            return

        options.style.zIndex = sumParentZIndex(node) + 1 + ""
        options.style.left = left + "px"
        options.style.top = top + height + document.documentElement.scrollTop - 5 + "px"
        options.style.width = width + "px"

        options.classList.toggle("invalid", wrapper.classList.contains("invalid"))
    }

    render = (): JSX.Element => {
        const { filter, focused, selectedKey } = this.state,
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
        </InputWrapper>
    }
}