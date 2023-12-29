import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import { Icon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps{
    readonly start: number
    readonly end: number
    readonly currentPage?: number
    readonly showNextPrevArrow?: boolean
    readonly showFirstLastPage?: boolean
    readonly onChangePage?: (page: number) => void
    readonly style?: CSSProperties
    readonly className?: string
}

interface IState{
    readonly page: number
}

export class Pagination extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            page: 1
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.currentPage !== this.props.currentPage || this.props.currentPage !== this.state.page)
            this.setState({ page: this.props.currentPage })
    }

    changePage = (page: number): void => {
        if(page === this.state.page)
            return
        
        this.setState({ page })
        this.props.onChangePage && this.props.onChangePage(page)
    }

    getFilteredButtons = (): number[] => {
        const { start, end } = this.props,
        correctStart = start > end ? end : start,
        correctEnd = end < start ? start : end,
        keys: number[] = []

        for(let i = correctStart; i <= correctEnd; i++)
            keys.push(i)

        return keys
    }

    goToFirstPage = (): void => this.changePage(this.props.start)

    goToLastPage = (): void => this.changePage(this.props.end)

    goToNextPage = (): void => this.changePage(this.state.page + 1)

    goToPrevPage = (): void => this.changePage(this.state.page - 1)

    render = (): React.ReactNode => {
        const { props, state } = this,
        { page } = state,
        filteredButtons = this.getFilteredButtons()

        return <div className={"dolfo-pagination" + (props.className ? " " + props.className : "")} style={props.style}>
            {props.showFirstLastPage && page !== props.start && <Tooltip tooltip={Constants.PAGINATION_FIRST_PAGE}>
                <div className="dolfo-pagination-btn" onClick={this.goToFirstPage}>
                    <Icon iconKey="chevron-double-left" type="far" />
                </div>
            </Tooltip>}
            {props.showNextPrevArrow && page !== props.start && <Tooltip tooltip={Constants.PAGINATION_PREV_PAGE}>
                <div className="dolfo-pagination-btn" onClick={this.goToPrevPage}>
                    <Icon iconKey="chevron-left" type="far" />
                </div>
            </Tooltip>}

            {
                filteredButtons.map(val => <div className={"dolfo-pagination-btn" + (page === val ? " current" : "")} onClick={() => this.changePage(val)}>
                    {val}
                </div>)
            }

            {props.showNextPrevArrow && page !== props.end && <Tooltip tooltip={Constants.PAGINATION_NEXT_PAGE}>
                <div className="dolfo-pagination-btn" onClick={this.goToNextPage}>
                    <Icon iconKey="chevron-right" type="far" />
                </div>
            </Tooltip>}
            {props.showFirstLastPage && page !== props.end && <Tooltip tooltip={Constants.PAGINATION_LAST_PAGE}>
                <div className="dolfo-pagination-btn" onClick={this.goToLastPage}>
                    <Icon iconKey="chevron-double-right" type="far" />
                </div>
            </Tooltip>}
        </div>
    }
}