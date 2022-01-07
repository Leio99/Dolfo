import _ from "lodash"
import ReactDOM from "react-dom"

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
    })  => {
        window.onclick = () => {
            const contexts = document.querySelectorAll(".context-menu") as NodeListOf<MenuItemElement>
    
            if(contexts && contexts.length)
                contexts.forEach(c => c.remove())
        }

        window.onresize = () => {
            const contexts = document.querySelectorAll(".context-menu") as NodeListOf<MenuItemElement>
    
            if(contexts && contexts.length)
                contexts.forEach(c => ContextMenu.positionContext(c))
        }

        document.querySelectorAll('*').forEach(elem => {
            elem.addEventListener('scroll', () => {
                const contexts = document.querySelectorAll(".context-menu") as NodeListOf<MenuItemElement>
    
                if(contexts && contexts.length)
                    contexts.forEach(c => ContextMenu.positionContext(c))
            })
        })

        event.stopPropagation()

        document.body.click()

        const context = document.createElement("div") as MenuItemElement
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
                ReactDOM.render(item.label, htmlItem)

            context.appendChild(htmlItem)
        })

        document.body.appendChild(context)

        ContextMenu.positionContext(context)   
    }

    private static positionContext = (context: MenuItemElement) => {
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