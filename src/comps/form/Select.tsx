import _ from "lodash"
import React, { createRef } from "react"
import { createRoot } from "react-dom/client"
import onClickOutside from "react-onclickoutside"
import { CloseIcon, Icon, LoadingIcon } from "../layout/Icon"
import { Tooltip } from "../layout/Tooltip"
import { getConstant } from "../shared/Constants"
import { EventManager, addToRegister, unregisterAll } from "../shared/models/EventManager"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { blurInput, isElementInViewport, sumParentZIndex } from "../shared/utility"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

export interface SelectProps extends ExtendedInputProps, React.PropsWithChildren{
    /** Defines the default value of the select
     * @type any
     */
    readonly defaultValue?: any
    /** Allows multiple selection
     * @type boolean 
     */
    readonly multiple?: boolean
    /** Determines if the user can search for an option
     * @type boolean
     */
    readonly canSearch?: boolean
    /** Determines if the select is loading
     * @type boolean
     */
    readonly loading?: boolean
    /** Defines a parent container for the select, in order to property attach the options to the body
     * @type string (CSS selector)
     */
    readonly parentContainerScroller?: string
}

interface IState{
    readonly value: any
    readonly openSelect: boolean
    readonly options: Option[]
    readonly searchValue: string
    readonly currentSelection: number
}

class Select extends React.PureComponent<SelectProps, IState>{
    private rootContent = document.createElement("div")
    private root = createRoot(this.rootContent)
    private wrapperRef = createRef<InputWrapper>()
    private events: EventManager[] = []

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

    componentDidMount = (): void => {
        addToRegister(this.events, new EventManager("resize", this.positionOptions))
        addToRegister(this.events, new EventManager("scroll", this.positionOptions).addOptions(true))
    }

    componentDidUpdate = (prevProps: React.PropsWithChildren<SelectProps>, prevState: IState): void => {
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

        if(this.state.openSelect !== prevState.openSelect){
            if(this.state.openSelect)
                this.showOptions()
            else
                this.hideOptions()
        }

        if(!_.isEqual(this.state.value, prevState.value))
            this.showOptions()
    }

    componentWillUnmount = (): void => {
        setTimeout(() => this.root.unmount())
        unregisterAll(this.events)
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

        blurInput()
    }

    getOptions = (): Option[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    decodeValue = (value: any): any => {
        if(this.props.multiple){
            const list = this.state.value.map((v: any) => {
                const opt = this.state.options?.find(option => _.isEqual(v, option.props.value)),
                optLabel = opt?.props.label,
                stringToCheck = opt && _.isString(optLabel) ? optLabel : opt?.props.getLabelString ? opt?.props.getLabelString() : getConstant("STRING_NOT_DEFINED_OPTION")

                return stringToCheck
            }).filter((v: any) => v)

            return list.join(", ")
        }

        return this.state.options?.find(option => _.isEqual(value, option.props.value))?.props.label
    }

    handleClickOutside = (args: any) => {
        if(this.state.openSelect && this.rootContent.contains(args.target))
            return
        
        this.onBlur()
    }

    changeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({
        searchValue: e.target.value,
        options: this.getOptions()?.filter(opt => {
            const stringToCheck = _.isString(opt.props.label) ? opt.props.label : opt.props.getLabelString ? opt.props.getLabelString() : getConstant("STRING_NOT_DEFINED_OPTION")

            return stringToCheck?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
        })
    }, this.showOptions)

    resetSearch = (): void => this.changeSearch({ target: { value: "" }} as React.ChangeEvent<HTMLInputElement>)

    handleKeyDown = (e: React.KeyboardEvent): void => {        
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

            blurInput()
        }else if(e.key.charCodeAt(0) === 84)
            this.onBlur()

        newIndex > -1 && this.setState({ currentSelection: newIndex }, this.showOptions)
    }

    showOptions = (): void => {
        const { options, openSelect, currentSelection, value } = this.state,
        { multiple } = this.props,
        content = options && options.length ? (multiple ? <div className={"dolfo-select-options multiple floating-popup" + (openSelect ? " show" : "")}>
            {
                options.map((option, i) => {
                    return <Option {...option.props} selected={value.includes(option.props.value)} focused={i === currentSelection} onChange={val => this.changeMultiple(val)} multiple key={i} />
                })
            }
        </div> : <div className={"dolfo-select-options floating-popup" + (openSelect ? " show" : "")}>
            {
                options.map((option, i) => {
                    return <Option {...option.props} selected={_.isEqual(option.props.value, value)} focused={i === currentSelection} onChange={this.changeOption} key={i} />
                })
            }
        </div>) : null

        if(!openSelect)
            return

        this.root.render(content)
        setTimeout(this.positionOptions)

        if(!document.body.contains(this.rootContent))
            document.body.appendChild(this.rootContent)
    }

    hideOptions = (): void => this.rootContent.remove()

    findParentScroller = (): HTMLElement => {
        const { parentContainerScroller } = this.props,
        node = this.wrapperRef.current.getRef()

        if(parentContainerScroller){
            let parent = node.parentElement,
            found: HTMLElement = null

            while(parent && !found){
                if(parent.matches(parentContainerScroller))
                    found = parent
                else
                    parent = parent.parentElement
            }

            if(found)
                return found
        }

        return document.documentElement
    }

    positionOptions = (): void => {
        if(!this.state.openSelect || !document.body.contains(this.rootContent))
            return

        const node = this.wrapperRef.current.getRef(),
        options = this.rootContent.childNodes[0] as HTMLElement,
        { top, left, height, width } = node.getBoundingClientRect(),
        parent = this.findParentScroller()

        if(!options)
            return

        options.style.zIndex = sumParentZIndex(node) + 1 + ""
        options.style.left = left + "px"
        options.style.top = top + height + parent.scrollTop - 3 + "px"
        options.style.width = width + "px"
        options.classList.remove("top")
        node.classList.remove("top")

        if(!isElementInViewport(options)){
            options.style.top = node.getBoundingClientRect().top + parent.scrollTop - options.offsetHeight + 3 + "px"
            options.classList.add("top")
            node.classList.add("top")

            if(!isElementInViewport(node))
                options.classList.remove("show")
            else if(!options.classList.contains("show"))
                options.classList.add("show")
        }else if(!options.classList.contains("show") && isElementInViewport(node))
            options.classList.add("show")
    }

    render = (): React.ReactNode => {
        let input: HTMLInputElement
        const { props } = this,
        { value, openSelect, searchValue, currentSelection } = this.state,
        icon = props.icon || { iconKey: "hand-pointer", type: "far" },
        searchInput = <div className="dolfo-select-search-content">
            {searchValue.length ? <Tooltip tooltip={getConstant("RESET_INPUT_TEXT")}>
                <CloseIcon className="reset-input" onClick={this.resetSearch} />
            </Tooltip> : null}

            <input type="text" ref={r => input = r} value={searchValue} onChange={this.changeSearch} className="dolfo-select-search-input" placeholder={getConstant("SEARCH_PLACEHOLDER")} />
        </div>

        return <InputWrapper icon={icon} label={props.label} onFocus={() => this.onFocus(input)} focusBool={openSelect} isFocusable disabled={props.disabled || props.loading} onKeyDown={this.handleKeyDown} style={props.wrapperStyle} required={props.required} className={"dolfo-select-wrapper" + (props.className ? " " + props.className : "")} value={value} selectedOption={currentSelection} ref={this.wrapperRef}>
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
                    onChange={() => {}}
                />

                <span className="input-value">{this.decodeValue(value)}</span>

                {props.canSearch && searchInput}
            </div>
        </InputWrapper>
    }
}

export default onClickOutside(Select)