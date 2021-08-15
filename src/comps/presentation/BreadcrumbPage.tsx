import React from "react"
import { BreadCrumb, BreadCrumbItem } from "../layout/BreadCrumb"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class BreadcrumbPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a navigation breadcrumb.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple breadcrumb"
            result={<BreadCrumb>
                <BreadCrumbItem>Home</BreadCrumbItem>
                <BreadCrumbItem>Sub page</BreadCrumbItem>
            </BreadCrumb>}
            code={'<BreadCrumb>\n\t<BreadCrumbItem>Home</BreadCrumbItem>\n\t<BreadCrumbItem>Sub page</BreadCrumbItem>\n</BreadCrumb>'}
        />

        <ResultCode
            title="Clickable items"
            result={<BreadCrumb>
                <BreadCrumbItem onClick={() => alert("Go back home")}>Home</BreadCrumbItem>
                <BreadCrumbItem>Sub page</BreadCrumbItem>
            </BreadCrumb>}
            code={'<BreadCrumb>\n\t<BreadCrumbItem onClick={() => alert("Go back home")}>Home</BreadCrumbItem>\n\t<BreadCrumbItem>Sub page</BreadCrumbItem>\n</BreadCrumb>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The breadcrumb items.",
                type: "BreadCrumbItem",
                required: true,
                onDoubleClick: () => goToApiBlock("#bcItemProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "style",
                desc: "Additional breadcrumb style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional breadcrumb className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="bcItemProps" title="BreadCrumbItem properties" data={[
            {
                name: "onClick",
                desc: "Function triggered when the user clicks on the item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}