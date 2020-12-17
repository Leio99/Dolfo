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

export const areDifferentTooltips = (newTips: NodeListOf<Element>) => {
    if(!tooltips || !newTips || tooltips.length !== newTips.length) return true

    for(let i = 0; i < tooltips.length; i++){
        const current = tooltips[i],
        newTip = newTips[i],
        toolText = toolTexts[i]

        if(current !== newTip || toolText !== newTip.getAttribute("data-tooltip"))
            return true
    }

    return false
}

export const checkTooltips = () => {
    const elements = document.querySelectorAll("[data-tooltip]"),
    newTexts: string[] = []

    elements.forEach(tool => {
        const tooltip = document.createElement("div"),
        content = tool.getAttribute("data-tooltip")

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
        })

        tool.addEventListener("mouseleave", () => (tool as any).tooltip.remove())
    })

    tooltips = elements
    toolTexts = newTexts
}