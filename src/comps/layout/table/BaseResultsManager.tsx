import { CSSProperties } from "react"
import { IDataColumn } from "../../shared/models/IColumn"
import { BaseExportableManager, BaseResultsData } from "./BaseExportableManager"

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
}

export abstract class BaseResultsManager<P = {}> extends BaseExportableManager<ResultsManagerProps & P, IState>{
    abstract render: () => JSX.Element

    constructor(props: ResultsManagerProps & P){
        super(props)

        this.state = {
            filter: {},
            activeFilterKey: "",
            activeFilter: ""
        }
    }

    changeFilter = (key: string, value: string): void => {
        const filter = {
            ...this.state.filter,
            [key]: value
        }

        this.setState({
            filter,
            activeFilterKey: key
        })
    }

    changeActiveFiler = (key: string): void => this.setState({ activeFilter: key })

    blurSearch = (): void => this.setState({ activeFilter: "" })

    getFilteredData = (): IDataColumn[] => {
        const { filter, activeFilterKey } = this.state,
        ajdustData = this.props.data.map(d => {
            let temp = {...d}

            this.props.columns.forEach(c => temp[c.field] = this.getColumnDataType(c, d))

            return temp
        })

        return activeFilterKey === "" ? ajdustData : ajdustData.filter(d => d[activeFilterKey].toLowerCase().indexOf(filter[activeFilterKey].toLowerCase()) >= 0)
    }
}