import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { LoadingIcon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import { Option } from "./Option"

interface IProps<K> extends ExtendedInputProps{
    readonly defaultValue?: K
}

interface IState<E, K>{
    readonly loading: boolean
    readonly list: E[]
    readonly selectedItem: E
    readonly selectedKey: K
    readonly filter: string
    readonly focused: boolean
    readonly showOptions: boolean
}

export abstract class Autocomplete<E, K, P = any> extends React.Component<IProps<K> & P, IState<E, K>>{
    private readonly TIMING = 500
    private typing: NodeJS.Timeout

    constructor(props: IProps<K> & P){
        super(props)

        this.state = {
            loading: false,
            list: [],
            selectedItem: null,
            selectedKey: null,
            filter: "",
            focused: false,
            showOptions: false
        }
    }

    abstract getSource: (filter: string) => Promise<E[]> | E[]

    abstract getDescription: (item: E) => string

    abstract getKey: (item: E) => K

    abstract getSingle: (key: K) => Promise<E> | E

    componentDidMount = (): void => {
        window.addEventListener("click", this.clickOutside)

        if(this.props.defaultValue != null)
            this.fetchDefaultValue()
    }

    componentDidUpdate = (prevProps: IProps<K> & P): void => {
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
        this.toggleLoading()
        Promise.resolve(this.getSingle(this.props.defaultValue)).then(r => this.selectOption(r)).finally(this.toggleLoading)
    }

    toggleLoading = (): void => this.setState({ loading: !this.state.loading })

    onBlur = (): void => this.setState({ focused: false, showOptions: false })

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

        clearTimeout(this.typing)

        if(this.state.selectedItem){
            this.setState({
                selectedItem: null,
                selectedKey: null
            })
        }

        this.typing = setTimeout(() => {
            if(!this.state.filter?.trim())
                return

            const dataSource = this.getSource(this.state.filter)

            if(_.isArray(dataSource))
                this.setState({ list: dataSource })
            else{
                this.toggleLoading()

                dataSource.then(list => this.setState({ list, showOptions: true })).finally(this.toggleLoading)
            }
        }, this.TIMING)
    }

    onKeyDown = (e: any): void => {
        this.props.onKeyDown && this.props.onKeyDown(e)

        clearTimeout(this.typing)
    }

    reset = () => {
        this.setState({
            focused: false,
            showOptions: false,
            selectedItem: null,
            selectedKey: null,
            filter: ""
        })
    }

    render = (): JSX.Element => {
        const { loading, list, filter, focused, showOptions, selectedKey } = this.state,
        { props } = this,
        icon = props.icon || { iconKey: "keyboard", type: "far" }
        let input: HTMLInputElement

        return <InputWrapper icon={icon} label={props.label} forceFocus={() => input.focus()} focusBool={focused} isFocusable disabled={props.disabled} resetFunction={this.reset} style={props.wrapperStyle} required={props.required} className={props.className} value={filter} selectedOption={selectedKey}>
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
            />

            {
                loading ? <div className="dolfo-select-options show dolfo-autocomplete-text">
                    <LoadingIcon spinning /> {Constants.LOADING_TEXT}
                </div> : showOptions && list.length > 0 ? <div className="dolfo-select-options show">
                    {
                        list.map(option => {
                            const key = this.getKey(option)
                            return <Option selected={selectedKey === key} label={this.getDescription(option)} onChange={() => this.selectOption(option)} value={key} />
                        })
                    }
                </div> : focused && <div className="dolfo-select-options show dolfo-autocomplete-text">
                    {Constants.TABLE_NO_RESULTS}
                </div>
            }
        </InputWrapper>
    }
}