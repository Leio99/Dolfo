import React from "react"
import { Constants } from "../shared/Constants"
import { SearchIcon } from "./Icon"

interface IProps<T = any>{
    readonly data: T[]
    readonly renderItem: (item: T) => string | JSX.Element
    readonly loading?: boolean
    readonly placeHolder?: string
    readonly onChangeFilter?: (value: string) => void
    readonly onClickItem?: (item: T) => void
    readonly onClose?: () => void
    readonly visible?: boolean
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

    changeFilter = (e: any): void => {
        const filter = e.target.value

        this.setState({ filter }, () => this.props.onChangeFilter && this.props.onChangeFilter(filter))
    }

    onClose = () => {
        this.setState({ visible: false })

        if(this.props.onClose)
            this.props.onClose()
    }

    handleKeyDown = (e: any) => {
        const { data, onClickItem } = this.props,
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

            if(onClickItem)
                onClickItem(option)
            
            e.preventDefault()
        }
    }

    render = (): JSX.Element => {
        const { props, state } = this,
        { visible, filter } = state

        return <div className={"dolfo-spotlight" + (visible ? " show" : "")}>
            <div className="dolfo-spotlight-overlay" onClick={this.onClose}></div>

            <div className="dolfo-spotlight-inner">
                <div className="dolfo-spotlight-filter">
                    <div className="dolfo-spotlight-icon">
                        <SearchIcon large />    
                    </div>       
                    <div className="dolfo-spotlight-input">
                        <input type="text" placeholder={props.placeHolder || Constants.FILTER_TEXT} onChange={this.changeFilter} value={filter} onKeyDown={this.handleKeyDown} />
                    </div>         
                </div>

                <div className="dolfo-spotlight-data">
                    {
                        props.data && props.data.length ? <>
                        
                        </> : <div className="dolfo-spotlight-nodata">{Constants.TABLE_NO_RESULTS}</div>
                    }    
                </div>
            </div>
        </div>
    }
}