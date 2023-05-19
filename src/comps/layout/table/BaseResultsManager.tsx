import { CSSProperties } from "react"
import { IDataColumn } from "../../shared/models/IColumn"
import { BaseExportableManager, BaseResultsData } from "./BaseExportableManager"
import _ from "lodash"

export interface ResultsManagerProps extends BaseResultsData{
    readonly className?: string
    readonly exportable?: boolean
    readonly exportFormat?: ("csv")[]
    readonly style?: CSSProperties
}

interface IState{
    readonly filter: { [x: string]: string }
    readonly activeFilterKey: string
    readonly activeFilter: string
    readonly order: { [x: keyof IDataColumn]: "asc" | "desc" }[]
}

export abstract class BaseResultsManager<P = {}, S = {}> extends BaseExportableManager<ResultsManagerProps & P, S & IState>{
    abstract render: () => JSX.Element

    constructor(props: P & ResultsManagerProps, state?: S){
        super(props)

        this.state = {
            ...state,
            filter: {},
            activeFilterKey: "",
            activeFilter: "",
            order: []
        }
    }

    changeFilter = (key: string, value: string): void => {
        const filter: IState["filter"] = {
            ...this.state.filter,
            [key]: value
        }

        this.setState({
            filter,
            activeFilterKey: key
        } as IState & S)
    }

    changeActiveFiler = (key: string): void => this.setState({ activeFilter: key } as IState & S)

    blurSearch = (): void => this.setState({ activeFilter: "" } as IState & S)

    getFilteredData = (): IDataColumn[] => {
        const { filter, activeFilterKey } = this.state,
        data = this.getOrderedData(),
        ajdustData = data.map(d => {
            let temp = {...d}

            this.props.columns.forEach(c => temp[c.field] = this.getColumnDataType(c, d))

            return temp
        })

        if(activeFilterKey?.indexOf(".") >= 0){
            const pieces = activeFilterKey.split(".")

            return ajdustData.filter(d => {
                let ret = d

                pieces.forEach(p => ret = ret[p])

                return ret.toLowerCase().indexOf(filter[activeFilterKey].toLowerCase()) >= 0
            })
        }

        return activeFilterKey === "" ? ajdustData : ajdustData.filter(d => d[activeFilterKey].toLowerCase().indexOf(filter[activeFilterKey].toLowerCase()) >= 0)
    }

    toggleOrder = (key: string) => {
        const { order } = this.state

        if(order.some(o => Object.keys(o).includes(key))){
            const type = order.find(o => Object.keys(o).includes(key)),
            index = order.indexOf(type)

            if(type[key] === "desc")
                this.setState({ order: order.filter((_, i) => i !== index) } as IState & S)
            else{
                this.setState({
                    order: order.map((o, i) => {
                        if(i === index)
                            return { [key]: "desc" }

                        return o
                    }) 
                } as IState & S)
            }
        }else
            this.setState({ order: order.concat({ [key]: "asc" }) } as IState & S)
    }

    orderHasKey = (key: string) => this.state.order.some(o => Object.keys(o).includes(key))

    getOrderKeyType = (key: string) => {
        const { order } = this.state,
        type = order.find(o => Object.keys(o).includes(key)),
        onlyKey = Object.keys(type)[0]

        return type[onlyKey]
    }

    getOrderedData = (): IDataColumn[] => {
        const { order } = this.state,
        { columns, data } = this.props
        
        if(!order.length)
            return data

        const ret = _.orderBy<IDataColumn>(data, order.map(o => Object.keys(o)[0]).map(col => {
            return (item: IDataColumn) => {
                const column = columns.find(c => (!c.orderKey && c.field === col) || c.orderKey === col)
                
                let actualItem = item[column.orderKey || column.field]

                if(column.orderKey?.indexOf(".") >= 0)
                    column.orderKey.split(".").forEach(piece => actualItem = (actualItem || item)[piece])
                
                if(column.type === "date")
                    return new Date(actualItem)
                if(column.type === "time"){
                    const tempDate = new Date(actualItem),
                    timeDate = new Date(null, null, null, tempDate.getHours(), tempDate.getMinutes())

                    return timeDate
                }
                if(column.type === "boolean")
                    return Boolean(actualItem)
                if(!isNaN(Number(actualItem)))
                    return Number(actualItem)

                return actualItem
            }
        }), order.map(o => Object.values(o)[0]))

        return ret
    }
}