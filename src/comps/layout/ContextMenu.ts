import _ from "lodash"
import { createRoot } from "react-dom/client"

export interface ContextMenuOption{
    readonly label: string | JSX.Element
    readonly onClick: (e: any, clickedItem: HTMLElement) => void
    readonly disabled?: boolean
}

interface AdditionalMenuProps{
    readonly closeAfterClickItem: boolean
}

interface MenuItemElement extends HTMLDivElement{
    relativeButton: HTMLElement
}

export class ContextMenu{
    static renderMenu = (event: Event, options: ContextMenuOption[], additionalProps: AdditionalMenuProps = {
        closeAfterClickItem: true
    }): void => {
        const context = document.createElement("div") as MenuItemElement,
        observer = new MutationObserver(() => this.positionContext(context)),
        LISTENERS = {
            windowResizeOrScroll: () => ContextMenu.positionContext(context),
            windowClick: () => {
                context?.remove()

                window.removeEventListener("click", LISTENERS.windowClick)
                window.removeEventListener("scroll", LISTENERS.windowResizeOrScroll)
                window.removeEventListener("resize", LISTENERS.windowResizeOrScroll)
                observer.disconnect()
            }
        }

        document.body.click()

        window.addEventListener("click", LISTENERS.windowClick)
        window.addEventListener("scroll", LISTENERS.windowResizeOrScroll)
        window.addEventListener("resize", LISTENERS.windowResizeOrScroll)
        observer.observe(context, { childList: true })

        event.stopPropagation()

        context.classList.add("context-menu")
        context.relativeButton = event.target as HTMLElement

        options.forEach(item => {
            const htmlItem = document.createElement("div")

            htmlItem.classList.add("context-item")

            if(item.disabled)
                htmlItem.classList.add("disabled")

            htmlItem.addEventListener("click", e => {
                if(item.disabled)
                    return

                e.stopPropagation()

                item.onClick(e, htmlItem)

                if(additionalProps?.closeAfterClickItem)
                    document.body.click()
            })

            if(_.isString(item.label))
                htmlItem.innerText = item.label
            else
                createRoot(htmlItem).render(item.label)

            context.appendChild(htmlItem)
        })

        document.body.appendChild(context)

        ContextMenu.positionContext(context)   
    }

    private static positionContext = (context: MenuItemElement): void => {
        const menuPos = context.getBoundingClientRect(),
        position = context.relativeButton.getBoundingClientRect(),
        width = menuPos.width,
        height = menuPos.height,
        bodyRect = document.body.getBoundingClientRect(),
        bodyW = bodyRect.width,
        bodyH = bodyRect.height
    
        if(position.left + width > bodyW){
            context.style.left = (position.left - width + position.width) + "px"
            context.classList.add("overflow-right")
        }else
            context.style.left = position.left + "px"
        
        if(position.top + height > bodyH){
            context.style.top = (position.top - height + position.height) + "px"
            context.classList.add("overflow-bottom")
        }else
            context.style.top = position.top + "px"
    }
}

export const openContextMenu = ContextMenu.renderMenu