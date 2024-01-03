import _ from "lodash"
import React from "react"
import { getConstant } from "../shared/Constants"
import Button from "./Button"
import { ContextMenu } from "./ContextMenu"
import { Icon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps{
    /** Defines the page size
     * @type number
     * @required
     */
    readonly pageSize: number
    /** Defines the total of the datasource length
     * @type number
     * @required
     */
    readonly dataSize: number
    /** Defines the default page to start from
     * @type number
     */
    readonly startFromPage?: number
    /** Function triggered when changing the page
     * @type Function
     * @param page number
     */
    readonly onChangePage?: (page: number) => void
}

interface IState{
    readonly page: number
}

export class Pagination extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        const pages = Math.ceil(props.dataSize / props.pageSize)

        this.state = {
            page: props.startFromPage != null && props.startFromPage > 0 && props.startFromPage <= pages ? props.startFromPage : 1
        }
    }

    changePage = (page: number) => this.setState({ page }, () => this.props.onChangePage && this.props.onChangePage(page))

    render = (): React.ReactNode => {
        const { pageSize, dataSize } = this.props,
        { page } = this.state,
        pages = Math.ceil(dataSize / pageSize),
        remain = pages - page,
        next = remain > 3 ? 3 : remain,
        prev = page > 3 ? 3 : page > 1 ? page - 1 : 0

        return <div className="dolfo-pagination">
            {page > 1 && <Tooltip tooltip={getConstant("PAGINATION_FIRST_PAGE")}>
                <Button circleBtn btnColor="white" onClick={() => this.changePage(1)}>
                    <Icon iconKey="angle-double-left" type="far" />
                </Button>
            </Tooltip>}
            {
                page > 4 && <ContextMenu options={_.range(1, page - 3).map(n => ({
                    onClick: () => this.changePage(n),
                    label: getConstant("PAGINATION_PAGE") + " " + n
                }))}>
                    <Tooltip tooltip={getConstant("PAGINATION_PAGES")}>
                        <Button circleBtn btnColor="white">
                            <Icon iconKey="ellipsis-h" type="far" />
                        </Button>
                    </Tooltip>
                </ContextMenu>
            }

            {
                prev > 0 && _.range(page - prev, page).map(n => <Button key={n} circleBtn btnColor="white" onClick={() => this.changePage(n)}>
                    {n}
                </Button>)
            }

            <Button circleBtn btnColor="blue">
                {page}
            </Button>

            {
                next > 0 && _.range(page + 1, page + next + 1).map(n => <Button key={n} circleBtn btnColor="white" onClick={() => this.changePage(n)}>
                    {n}
                </Button>)
            }

            {pages - page > 3 && <ContextMenu options={_.range(pages - (pages - page - 4), pages + 1).map(n => ({
                onClick: () => this.changePage(n),
                label: getConstant("PAGINATION_PAGE") + " " + n
            }))}>
                <Tooltip tooltip={getConstant("PAGINATION_PAGES")}>
                    <Button circleBtn btnColor="white">
                        <Icon iconKey="ellipsis-h" type="far" />
                    </Button>
                </Tooltip>
            </ContextMenu>}

            {page < pages && <Tooltip tooltip={getConstant("PAGINATION_LAST_PAGE")}>
                <Button circleBtn btnColor="white" onClick={() => this.changePage(pages)}>
                    <Icon iconKey="angle-double-right" type="far" />
                </Button>
            </Tooltip>}
        </div>
    }
}