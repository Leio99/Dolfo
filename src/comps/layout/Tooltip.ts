import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"

export type TooltipPlacement = "top" | "left" | "bottom" | "right"

interface TooltipElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

interface IProps{
    readonly tooltip: string | JSX.Element
    readonly placeTooltip?: TooltipPlacement
}

export class Tooltip extends React.Component<IProps>{
    private onTooltipOrNode = false
    private element: TooltipElement

    renderTooltip = (): void => {        
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        { tooltip, placeTooltip } = this.props,
        tooltipEl = document.createElement("div") as TooltipElement

        tooltipEl.classList.add("dolfo-tooltip")
        
        if(placeTooltip)
            tooltipEl.classList.add(_.capitalize(placeTooltip))

        tooltipEl.relativeElement = node

        createRoot(tooltipEl).render(tooltip)

        node.addEventListener("mouseenter", () => {
            this.onTooltipOrNode = true
            
            
            if(this.props.tooltip)
                document.body.appendChild(tooltipEl)

            this.positionTooltip(tooltipEl)

            new MutationObserver(() => this.positionTooltip(tooltipEl)).observe(tooltipEl, { childList: true })
        })

        node.addEventListener("mouseenter", () => this.onTooltipOrNode = true)

        node.addEventListener("mouseleave", () => {
            this.onTooltipOrNode = false
            tooltipEl.remove()
        })

        window.addEventListener("mouseout", () => !this.onTooltipOrNode && tooltipEl.remove())

        window.addEventListener("resize", () => this.positionTooltip(tooltipEl))

        window.addEventListener("scroll", () => this.positionTooltip(tooltipEl), true)
        window.addEventListener("click", () => this.element?.remove(), true)

        this.element = tooltipEl
    }

    componentDidMount = this.renderTooltip

    componentWillUnmount = (): void => this.element?.remove()

    componentDidUpdate = (prevProps: IProps): void => {
        if(!_.isEqual(prevProps.tooltip, this.props.tooltip))
            this.renderTooltip()
    }

    private positionTooltip = (tooltip: TooltipElement, tries: TooltipPlacement[] = [], place?: TooltipPlacement): void => {
        const copy = tooltip.cloneNode(true) as TooltipElement,
        { placeTooltip } = this.props,
        placement = place || placeTooltip || "top"

        copy.relativeElement = tooltip.relativeElement
        copy.style.animation = "showTooltip 0s forwards"
        copy.style.visibility = "hidden"
        document.body.appendChild(copy)

        const popoverPos = copy.getBoundingClientRect(),
        { relativeElement } = copy,
        nodePos = relativeElement.getBoundingClientRect()

        copy.classList.add(_.capitalize(placement))
        tries.forEach(t => copy.classList.remove(_.capitalize(t)))

        tooltip.setAttribute("class", copy.getAttribute("class"))

        if(placement === "right"){
            copy.style.left = nodePos.left + 5 + nodePos.width + "px"
            copy.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }else if(placement === "bottom"){
            copy.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            copy.style.top = nodePos.top + 5 + nodePos.height + "px"
        }else if(placement === "left"){
            copy.style.left = nodePos.left - 5 - popoverPos.width + "px"
            copy.style.top = nodePos.top - (popoverPos.height / 2) + (nodePos.height / 2) + "px"
        }else{
            copy.style.left = nodePos.left - (popoverPos.width / 2) + (nodePos.width / 2) + "px"
            copy.style.top = nodePos.top - 5 - popoverPos.height + "px"
        }

        if(!this.isElementInViewport(copy) && tries.length < 4){
            const dirs: TooltipPlacement[] = ["top", "left", "right", "bottom"],
            exclude = dirs.filter(d => !tries.includes(d) && d !== placement)
            tries.push(placement)
            this.positionTooltip(tooltip, tries, exclude[0])
        }else{
            tooltip.style.left = copy.style.left
            tooltip.style.top = copy.style.top
        }

        copy.remove()
    }
    
    isElementInViewport = (el: Element): boolean => {
        const rect = el.getBoundingClientRect()

        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    }

    render = () => !React.isValidElement(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children
}