import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { TooltipPlacement } from "./Tooltip"

interface IProps{
    readonly content: string | JSX.Element
    readonly position?: TooltipPlacement
    readonly openOnOver?: boolean
    readonly style?: CSSProperties
    readonly className?: string
}

interface PopoverElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

export class Popover extends React.Component<IProps>{
    private onPopoverOrNode = false

    componentDidMount = () => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { content, openOnOver, style, className } = this.props,
        popover = document.createElement("div"),
        event = openOnOver ? "mouseenter" : "click"

        popover.classList.add("dolfo-popover")

        if(className)
            className.split(" ").forEach(c => popover.classList.add(c))
        if(style){
            Object.keys(style).forEach((k: any) => {
                popover.style[k] = (style as any)[k] as any
            })
        }

        (popover as PopoverElement).relativeElement = node

        node.addEventListener(event, () => {
            ReactDOM.render(<>{content}</>, popover)

            document.body.appendChild(popover)

            this.positionPopover(popover as PopoverElement)
        })

        popover.addEventListener("mouseenter", () => this.onPopoverOrNode = true)

        popover.addEventListener("mouseleave", () => this.onPopoverOrNode = false)

        node.addEventListener("mouseenter", () => this.onPopoverOrNode = true)

        node.addEventListener("mouseleave", () => this.onPopoverOrNode = false)

        window.addEventListener(openOnOver ? "mousemove" : event, () => !this.onPopoverOrNode && popover.remove())
    }

    private positionPopover = (popover: PopoverElement) => {
        const popoverPos = popover.getBoundingClientRect(),
        { position } = this.props,
        { relativeElement } = popover,
        nodePos = relativeElement.getBoundingClientRect()

        if(position !== "left")
            popover.classList.add("pos-" + position)

        if(position === "right"){
            popover.style.left = nodePos.left + nodePos.width + "px"
            popover.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }else if(position === "bottom"){
            popover.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            popover.style.top = nodePos.top + nodePos.height + "px"
        }else if(position === "top"){
            popover.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            popover.style.top = nodePos.top - popoverPos.height + "px"
        }else{
            popover.style.left = nodePos.left + 10 - popoverPos.width + "px"
            popover.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }
    }

    render = () => this.props.children

    public static forceRemoveAll = () => {
        const popovers = document.querySelectorAll(".dolfo-popover")

        popovers.forEach(p => p.remove())
    }
}