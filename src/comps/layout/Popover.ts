import _ from "lodash"
import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { TooltipPlacement } from "./Tooltip"

interface IProps extends React.PropsWithChildren{
    /** The content of the popover
     * @type ReactNode
     * @required
     */
    readonly content: React.ReactNode
    /** The position of the popover
     * @type TooltipPlacement
     * @default "left"
     */
    readonly position?: TooltipPlacement
    /** If true, the popover will show when hovering the element
     * @type boolean
     */
    readonly openOnOver?: boolean
    /** Additional className for the popover
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the popover
     * @type string
     */
    readonly className?: string
}

interface PopoverElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

export class Popover extends React.Component<IProps>{
    private onPopoverOrNode = false
    private observer: MutationObserver
    private elementRef: PopoverElement
    private readonly LISTENERS = {
        popoverOrNodeMouseEnter: () => this.onPopoverOrNode = true,
        popoverOrNodeMouseLeave: () => this.onPopoverOrNode = false,
        windowResizeOrScroll: () => this.positionPopover(this.elementRef),
        customEvent: (e: MouseEvent) => {
            const target = e.target as HTMLElement,
            popups = Array.from(document.querySelectorAll(".floating-popup"))

            if((popups.length && popups.some(p => p.contains(target))) || (e.target && (e.target as HTMLButtonElement).form && this.elementRef.contains(e.target as Node)))
                return

            if(!this.onPopoverOrNode && document.body.contains(this.elementRef))
                this.elementRef.remove()
        }
    }

    componentDidMount = (): void => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { content, openOnOver, style, className } = this.props,
        popover = document.createElement("div") as PopoverElement,
        event = openOnOver ? "mouseenter" : "click"

        popover.classList.add("dolfo-popover")

        if(className)
            className.split(" ").forEach(c => popover.classList.add(c))
        if(style){
            Object.keys(style).forEach((k: any) => {
                const kk: any = _.kebabCase(k)
                popover.style[kk] = (style as any)[k] as any
            })
        }

        popover.relativeElement = node

        createRoot(popover).render(content)

        this.observer = new MutationObserver(() => this.positionPopover(popover))

        node.addEventListener(event, () => {
            document.body.appendChild(popover)

            this.positionPopover(popover)

            this.observer.observe(popover, { childList: true })
        })

        popover.addEventListener("mouseenter", this.LISTENERS.popoverOrNodeMouseEnter)

        popover.addEventListener("mouseleave", this.LISTENERS.popoverOrNodeMouseLeave)

        node.addEventListener("mouseenter", this.LISTENERS.popoverOrNodeMouseEnter)

        node.addEventListener("mouseleave", this.LISTENERS.popoverOrNodeMouseLeave)

        window.addEventListener(openOnOver ? "mousemove" : event, this.LISTENERS.customEvent)

        window.addEventListener("resize", this.LISTENERS.windowResizeOrScroll)

        window.addEventListener("scroll", this.LISTENERS.windowResizeOrScroll, true)

        this.elementRef = popover
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

    componentWillUnmount = () => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { openOnOver } = this.props,
        event = openOnOver ? "mouseenter" : "click"

        this.LISTENERS.customEvent(new MouseEvent(""))

        this.observer.disconnect()

        this.elementRef.removeEventListener("mouseenter", this.LISTENERS.popoverOrNodeMouseEnter)

        this.elementRef.removeEventListener("mouseleave", this.LISTENERS.popoverOrNodeMouseLeave)

        node.removeEventListener("mouseenter", this.LISTENERS.popoverOrNodeMouseEnter)

        node.removeEventListener("mouseleave", this.LISTENERS.popoverOrNodeMouseLeave)

        window.removeEventListener(openOnOver ? "mousemove" : event, this.LISTENERS.customEvent)

        window.removeEventListener("resize", this.LISTENERS.windowResizeOrScroll)

        window.removeEventListener("scroll", this.LISTENERS.windowResizeOrScroll, true)
    }

    render = () => React.isValidElement(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children

    static forceRemoveAll = (): void => {
        const popovers = document.querySelectorAll(".dolfo-popover")

        popovers.forEach(p => p.remove())
    }
}