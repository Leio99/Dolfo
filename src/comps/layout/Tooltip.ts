import { capitalizeFirstLetter } from "../../commons/utility"

export type TooltipPlacement = "top" | "left" | "bottom" | "right"

export interface TooltipProps{
    readonly tooltip?: string
    readonly placeTooltip?: TooltipPlacement
}

let tooltips: NodeListOf<Element>,
toolTexts: string[] = []

export const initializeTooltips = () => {
    document.addEventListener("mouseover", () => {
        const newTips = document.querySelectorAll("[data-tooltip]")

        if(areDifferentTooltips(newTips))
            checkTooltips()
    })

    document.addEventListener("click", () => document.querySelector(".dolfo-tooltip")?.remove())
}

const areDifferentTooltips = (newTips: NodeListOf<Element>) => {
    if(!tooltips || !newTips || tooltips.length !== newTips.length) return true

    for(let i = 0; i < tooltips.length; i++){
        const current = tooltips[i],
        newTip = newTips[i],
        toolText = toolTexts[i]

        if(current !== newTip || toolText !== newTip.getAttribute("data-tooltip"))
            return true
    }

    return false
},
checkTooltips = () => {
    const elements = document.querySelectorAll("[data-tooltip]"),
    newTexts: string[] = []

    elements.forEach(tool => {
        const tooltip = document.createElement("div"),
        content = tool.getAttribute("data-tooltip"),
        place = tool.getAttribute("data-place") || "top"

        newTexts.push(content);

        (tool as any).tooltip?.remove();
        (tool as any).tooltip = tooltip

        tooltip.classList.add("dolfo-tooltip")
        tooltip.innerHTML = content

        tool.addEventListener("mouseenter", () => {
            const bound = tool.getBoundingClientRect()
            
            tooltip.style.top = bound.top + "px"
            tooltip.style.left = (bound.left + (bound.width / 2)) + "px"

            document.body.appendChild((tool as any).tooltip)

            let checkPosition = true

            tooltip.classList.add(capitalizeFirstLetter(place))

            const copy = tooltip.cloneNode(true) as HTMLElement
            copy.style.animation = "showTooltip" + capitalizeFirstLetter(place) + " 0s forwards"
            copy.style.visibility = "hidden"
            document.body.appendChild(copy)

            if(isElementInViewport(copy))
                checkPosition = false

            copy.remove()

            const dirs = ["Top", "Right", "Left", "Bottom"]

            checkPosition && dirs.forEach(d => {
                const copy = tooltip.cloneNode(true) as HTMLElement
                copy.style.animation = "showTooltip" + d + " 0s forwards"
                copy.style.visibility = "hidden"
                document.body.appendChild(copy)

                if(isElementInViewport(copy)){
                    tooltip.setAttribute("class", "dolfo-tooltip")

                    tooltip.classList.add(d)
                }

                copy.remove()
            })
        })

        tool.addEventListener("mouseleave", () => (tool as any).tooltip.remove())
    })

    tooltips = elements
    toolTexts = newTexts
},
isElementInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect()

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}
