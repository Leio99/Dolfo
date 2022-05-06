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

export abstract class BaseResultsManager<P = {}, S = {}> extends BaseExportableManager<ResultsManagerProps & P, S & IState>{
    abstract render: () => JSX.Element

    constructor(props: P & ResultsManagerProps, state?: S){
        super(props)

        this.state = {
            ...state,
            filter: {},
            activeFilterKey: "",
            activeFilter: ""
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
        ajdustData = this.props.data.map(d => {
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
}