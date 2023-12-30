import React from "react"
import { Apis, ResultCode, Usage, WhenToUse } from "./Layouts"
import { Pagination } from "../layout/Pagination"

export class PaginationPage extends React.Component{
    render = () => <>
        <WhenToUse>When you want to rener pagination buttons.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<Pagination pageSize={50} dataSize={500} />}
            code={'<Pagination pageSize={50} dataSize={500} />'}
        />

        <Apis data={[
            {
                name: "pageSize",
                desc: "Determines the size of each page.",
                type: "number",
                required: true
            },
            {
                name: "dataSize",
                desc: "Determines the total size of datasource.",
                type: "number",
                required: true
            },
            {
                name: "startFromPage",
                desc: "Determines the page where the pagination starts.",
                type: "number",
                required: false,
                default: "1"
            },
            {
                name: "onChangePage",
                desc: "Function triggered when the page changes.",
                type: "Function",
                required: false,
                fnParams: "The selected page (number)."
            }
        ]} />
    </>
}