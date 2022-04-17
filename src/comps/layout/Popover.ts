import _ from "lodash"
import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { TooltipPlacement } from "./Tooltip"

interface IProps{
    readonly content: string | JSX.Element
    readonly position?: TooltipPlacement | "left-top" | "right-top"
    readonly openOnOver?: boolean
    readonly style?: CSSProperties
    readonly className?: string
}

interface PopoverElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

export class Popover extends React.Component<IProps>{
    private onPopoverOrNode = false

    componentDidMount = (): void => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { content, openOnOver, style, className } = this.props,
        popover = document.createElement("div") as PopoverElement,
        event = openOnOver ? "mouseenter" : "click",
        inner = document.createElement("div")

        inner.classList.add("dolfo-popover-inner")
        popover.classList.add("dolfo-popover")

        popover.appendChild(inner)

        if(className)
            className.split(" ").forEach(c => popover.classList.add(c))
        if(style){
            Object.keys(style).forEach((k: any) => {
                const kk: any = _.kebabCase(k)
                inner.style[kk] = (style as any)[k] as any
            })
        }

        popover.relativeElement = node

        createRoot(inner).render(content)

        node.addEventListener(event, () => {
            document.body.appendChild(popover)

            this.positionPopover(popover)

            new MutationObserver(() => this.positionPopover(popover)).observe(popover, { childList: true })
        })

        popover.addEventListener("mouseenter", () => this.onPopoverOrNode = true)

        popover.addEventListener("mouseleave", () => this.onPopoverOrNode = false)

        node.addEventListener("mouseenter", () => this.onPopoverOrNode = true)

        node.addEventListener("mouseleave", () => this.onPopoverOrNode = false)

        window.addEventListener(openOnOver ? "mousemove" : event, () => !this.onPopoverOrNode && popover.remove())

        window.addEventListener("resize", () => this.positionPopover(popover))

        window.addEventListener("scroll", () => this.positionPopover(popover), true)
    }

    private positionPopover = (popover: PopoverElement): void => {
        const popoverPos = popover.getBoundingClientRect(),
        { position } = this.props,
        { relativeElement } = popover,
        nodePos = relativeElement.getBoundingClientRect()

        if(position !== "left")
            popover.classList.add("pos-" + position)

        if(position === "right"){
            popover.style.left = nodePos.left + nodePos.width + "px"
            popover.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }else if(position === "right-top"){
            popover.style.left = nodePos.left + nodePos.width + "px"
            popover.style.top = nodePos.top + "px"
        }else if(position === "bottom"){
            popover.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            popover.style.top = nodePos.top + nodePos.height + "px"
        }else if(position === "top"){
            popover.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            popover.style.top = nodePos.top - popoverPos.height + "px"
        }else if(position === "left-top"){
            popover.style.left = nodePos.left + 10 - popoverPos.width + "px"
            popover.style.top = nodePos.top + "px"
        }else{
            popover.style.left = nodePos.left + 10 - popoverPos.width + "px"
            popover.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }
    }

    render = () => _.isString(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children

    static forceRemoveAll = (): void => {
        const popovers = document.querySelectorAll(".dolfo-popover")

        popovers.forEach(p => p.remove())
    }
}