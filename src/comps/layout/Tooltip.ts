import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { EventManager, addToRegister, unregisterAll } from "../shared/models/EventManager"
import { isElementInViewport } from "../shared/utility"

export type TooltipPlacement = "top" | "left" | "bottom" | "right"

interface TooltipElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

interface IProps extends React.PropsWithChildren{
    /** The title of the tooltip
     * @type ReactNode
     * @required
     */
    readonly tooltip: React.ReactNode
    /** Defines the position of the tooltip
     * @type TooltipPlacement
     * @default "top"
     */
    readonly placeTooltip?: TooltipPlacement
}

export class Tooltip extends React.Component<IProps>{
    private onTooltipOrNode = false
    private element: TooltipElement
    private observer: MutationObserver
    private events: EventManager[] = []
    private readonly LISTENERS = {
        nodeClickOrLeave: () => {
            this.onTooltipOrNode = false
            this.element.remove()
        },
        nodeMouseEnter: () =>  {
            this.onTooltipOrNode = true
            
            if(this.props.tooltip)
                document.body.appendChild(this.element)

            this.positionTooltip(this.element)

            this.observer.observe(this.element, { childList: true })
        },
        windowResizeOrScroll: () => this.positionTooltip(this.element),
        windowMouseOut: () => !this.onTooltipOrNode && this.element.remove(),
        windowClick: () => this.element?.remove()
    }

    renderTooltip = (): void => {  
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { tooltip, placeTooltip } = this.props,
        tooltipEl = document.createElement("div") as TooltipElement

        tooltipEl.classList.add("dolfo-tooltip")
        
        if(placeTooltip)
            tooltipEl.classList.add(_.capitalize(placeTooltip))

        tooltipEl.relativeElement = node

        createRoot(tooltipEl).render(tooltip)

        addToRegister(this.events, new EventManager("mouseenter", this.LISTENERS.nodeMouseEnter, node))
        addToRegister(this.events, new EventManager("mouseleave", this.LISTENERS.nodeClickOrLeave, node))
        addToRegister(this.events, new EventManager("click", this.LISTENERS.nodeClickOrLeave, node))
        addToRegister(this.events, new EventManager("mouseout", this.LISTENERS.windowMouseOut))
        addToRegister(this.events, new EventManager("resize", this.LISTENERS.windowResizeOrScroll))
        addToRegister(this.events, new EventManager("scroll", this.LISTENERS.windowResizeOrScroll))
        addToRegister(this.events, new EventManager("click", this.LISTENERS.windowClick).addOptions(true))

        this.element = tooltipEl

        if(!this.observer)
            this.observer = new MutationObserver(() => this.positionTooltip(this.element))   
    }

    componentDidMount = this.renderTooltip

    componentWillUnmount = (): void => {
        this.LISTENERS.windowClick()
        this.observer.disconnect()
        unregisterAll(this.events)
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(!_.isEqual(prevProps.tooltip, this.props.tooltip)){
            this.element.remove()
            this.renderTooltip()
        }
    }

    private positionTooltip = (tooltip: TooltipElement, tries: TooltipPlacement[] = [], place?: TooltipPlacement): void => {
        if(!document.body.contains(tooltip))
            return
        
        const copy = tooltip.cloneNode(true) as TooltipElement,
        { placeTooltip } = this.props,
        placement = place || placeTooltip || "top"

        copy.relativeElement = tooltip.relativeElement
        copy.style.animation = "showTooltip 0s forwards"
        copy.style.visibility = "hidden"
        document.body.appendChild(copy)

        const tooltipPos = copy.getBoundingClientRect(),
        { relativeElement } = copy,
        nodePos = relativeElement.getBoundingClientRect()

        copy.setAttribute("class", "dolfo-tooltip " + _.capitalize(placement))

        if(placement === "right"){
            copy.style.left = nodePos.left + 5 + nodePos.width + "px"
            copy.style.top = nodePos.top - (tooltipPos.height / 2) + (nodePos.height / 2) + "px"
        }else if(placement === "bottom"){
            copy.style.left = nodePos.left - (tooltipPos.width / 2) + (nodePos.width / 2) + "px"
            copy.style.top = nodePos.top + 5 + nodePos.height + "px"
        }else if(placement === "left"){
            copy.style.left = nodePos.left - 5 - tooltipPos.width + "px"
            copy.style.top = nodePos.top - (tooltipPos.height / 2) + (nodePos.height / 2) + "px"
        }else{
            copy.style.left = nodePos.left - (tooltipPos.width / 2) + (nodePos.width / 2) + "px"
            copy.style.top = nodePos.top - 5 - tooltipPos.height + "px"
        }

        if(!isElementInViewport(copy) && tries.length < 4){
            const dirs: TooltipPlacement[] = ["top", "left", "right", "bottom"],
            exclude = dirs.filter(d => !tries.includes(d) && d !== placement)
            tries.push(placement)
            this.positionTooltip(tooltip, tries, exclude[0])
        }else{
            tooltip.style.left = copy.style.left
            tooltip.style.top = copy.style.top
            tooltip.setAttribute("class", copy.getAttribute("class"))
        }

        copy.remove()
    }

    render = (): React.ReactNode => !React.isValidElement(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children
}