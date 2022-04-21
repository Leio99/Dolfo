import React from "react"
import { TextInput } from "../form/TextInput"
import { Constants } from "../shared/Constants"
import { LoadingIcon } from "./Icon"

interface IProps{
    readonly data: any[]
    readonly renderItem: (item: any) => string | JSX.Element
    readonly loading?: boolean
    readonly visible?: boolean
    readonly onChangeFilter?: (value: string) => void
    readonly onClickItem?: (item: any) => void
    readonly onClose?: () => void
}

interface IState{
    readonly filter: string
    readonly visible: boolean
    readonly focusedIndex: number
}

export class Spotlight extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            filter: "",
            visible: this.props.visible || false,
            focusedIndex: -1
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.visible !== this.props.visible)
            this.setState({ visible: this.props.visible })
    }

    changeFilter = (filter: string): void => {
        this.setState({ filter })

        if(this.props.onChangeFilter)
            this.props.onChangeFilter(filter)
    }

    onClose = () => {
        this.setState({ visible: false, filter: "", focusedIndex: -1 })

        if(this.props.onClose)
            this.props.onClose()
        if(this.props.onChangeFilter)
            this.props.onChangeFilter("")
    }

    handleKeyDown = (e: any) => {
        const { data } = this.props,
        { focusedIndex } = this.state
        let newIndex: number

        if(!data || !data.length)
            return

        if(e.key === "ArrowUp"){
            if(focusedIndex === 0) newIndex = data.length - 1
            else if(focusedIndex === -1) newIndex = 0
            else newIndex = focusedIndex - 1
            
            e.preventDefault()
        }else if(e.key === "ArrowDown"){
            if(focusedIndex === data.length - 1 || focusedIndex === -1) newIndex = 0
            else newIndex = focusedIndex + 1
            
            e.preventDefault()
        }else if(e.key === "Enter"){
            const option = data[focusedIndex] || data[0]

            this.clickItem(option)
            
            e.preventDefault()
        }

        if(newIndex != null)
            this.setState({ focusedIndex: newIndex })
    }

    clickItem = (item: any) => {
        this.onClose()

        if(this.props.onClickItem)
            this.props.onClickItem(item)
    }

    render = (): JSX.Element => {
        const { props, state } = this,
        { visible, focusedIndex, filter } = state

        return <div className={"dolfo-spotlight" + (visible ? " show" : "") + (props.loading ? " loading" : "")}>
            <div className="dolfo-spotlight-overlay" onClick={this.onClose}></div>

            <div className="dolfo-spotlight-inner">
                <div className="dolfo-spotlight-filter">  
                    <div className="dolfo-spotlight-input">
                        <TextInput onChange={this.changeFilter} value={filter} onKeyDown={this.handleKeyDown} icon={{ iconKey: "search" }} disabled={props.loading} placeHolder={Constants.FILTER_TEXT} />
                    </div>         
                </div>

                <div className="dolfo-spotlight-data">
                    {
                        props.loading ? <div className="dolfo-spotlight-loading">
                            <LoadingIcon spinning /> {Constants.LOADING_TEXT}
                        </div> : props.data && props.data.length ? props.data.map((d, i) => <div className={"dolfo-spotlight-item" + (focusedIndex === i ? " focused" : "")} onClick={() => this.clickItem(d)} key={i}>
                            {props.renderItem(d)}
                        </div>): <div className="dolfo-spotlight-nodata">{Constants.TABLE_NO_RESULTS}</div>
                    }    
                </div>
            </div>
        </div>
    }
}