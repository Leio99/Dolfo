import _ from "lodash"
import React, { createRef } from "react"
import { createRoot } from "react-dom/client"
import { LoadingIcon } from "../layout/Icon"
import { showError } from "../layout/NotificationMsg"
import { getConstant } from "../shared/Constants"
import { EventManager, addToRegister, unregisterAll } from "../shared/models/EventManager"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { blurInput, sumParentZIndex } from "../shared/utility"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

export interface AutocompleteProps<E> extends ExtendedInputProps{
    /** Defines the default value of the autocomplete
     * @type the passed type in generics
     */
    readonly defaultValue?: E
    /** If the search retrieves only one element, it will be selected automatically
     * @type boolean
     */
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

export abstract class Autocomplete<E, K, P = unknown> extends React.Component<AutocompleteProps<E> & P, IState<E, K>>{
    private readonly TIMING = 500
    private typing: _.DebouncedFunc<() => void>
    private rootContent = document.createElement("div")
    private root = createRoot(this.rootContent)
    private wrapperRef = createRef<InputWrapper>()
    private events: EventManager[] = []

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

    /** Method to retrieve the data for the autocomplete
     * @param filter string
     * @returns Promise or Array (according to the passed type)
     */
    abstract getSource: (filter: string) => Promise<E[]> | E[]

    /** Method to retrieve the description of a single element, shown during the selection
     * @param item The current item
     * @returns string
     */
    abstract getDescription: (item: E) => string

    /** Method to retrieve the unique key of a single element, used during the selection (usually the primary key)
     * @param item The current item
     * @returns the type of the key passed as a type
     */
    abstract getKey: (item: E) => K

    /** Method called when clicking the single element, used to retrieve any additional information, if needed
     * @param key The primary key of the item
     * @returns Promise or Object (according to the passed type)
     * @required If the autocomplete is passed a default value
     */
    getSingle: (key: E) => Promise<E> | E

    componentDidMount = (): void => {
        addToRegister(this.events, new EventManager("click", this.clickOutside))
        addToRegister(this.events, new EventManager("resize", this.positionOptions))
        addToRegister(this.events, new EventManager("scroll", this.positionOptions).addOptions(true))

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
        
        unregisterAll(this.events)
    }

    clickOutside = (e: MouseEvent): void => {
        if(!this.wrapperRef.current)
            return
        
        const element = e.target as Node,
        node = this.wrapperRef.current.getRef()

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

    onChange = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ filter: e.target.value })

    onKeyUp = (e: React.KeyboardEvent): void => {
        this.props.onKeyUp && this.props.onKeyUp(e)

        if(getConstant("AUTOCOMPLETE_EXLUDE_KEYS").includes(e.key))
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

    onKeyDown = (e: React.KeyboardEvent): void => {
        this.props.onKeyDown && this.props.onKeyDown(e)

        if(e.key.charCodeAt(0) === 84)
            this.onBlur()
        
        if(getConstant("AUTOCOMPLETE_EXLUDE_KEYS").includes(e.key) && e.key !== "Enter" && e.key !== "ArrowUp" && e.key !== "ArrowDown")
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
            <LoadingIcon spinning /> {getConstant("LOADING_TEXT")}
        </div> : showOptions && focused && list.length > 0 ? <div className="dolfo-select-options floating-popup show">
            {
                list.map((option, i) => {
                    const key = this.getKey(option)
                    return <Option selected={selectedKey === key} key={key.toString()} label={this.getDescription(option)} onChange={() => this.selectOption(option)} value={key} focused={focusedIndex === i} />
                })
            }
        </div> : focused && <div className="dolfo-select-options show dolfo-autocomplete-text floating-popup">
            {getConstant("TABLE_NO_RESULTS")}
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

        const node = this.wrapperRef.current.getRef(),
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

    render = (): React.ReactNode => {
        const { filter, focused, selectedKey } = this.state,
        { props } = this,
        icon = props.icon || { iconKey: "keyboard", type: "far" }
        let input: HTMLInputElement

        return <InputWrapper icon={icon} label={props.label} forceFocus={() => input.focus()} focusBool={focused} isFocusable disabled={props.disabled} resetFunction={() => this.reset(input)} style={props.wrapperStyle} required={props.required} className={"dolfo-select-wrapper" + (props.className ? " " + props.className : "")} value={filter} selectedOption={selectedKey} ref={this.wrapperRef}>
            <input
                type="text"
                autoFocus={props.autoFocus}
                onChange={this.onChange}
                disabled={props.disabled}
                value={filter}
                ref={r => input = r}
                required={props.required}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onPaste={props.onPaste}
                onFocus={this.onFocus}
                autoComplete="new-password"
            />
        </InputWrapper>
    }
}