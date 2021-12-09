import _ from "lodash"
import ReactDOM from "react-dom"

export interface MenuContextOption{
    readonly label: string | JSX.Element
    readonly onClick: (e: any, clickedItem: HTMLElement) => void
    readonly disabled?: boolean
}

interface AdditionalMenuProps{
    readonly closeAfterClickItem: boolean
}

interface MenuItemElement extends HTMLElement{
    readonly relativeButton: HTMLElement
}

export class MenuContext{
    static renderMenu = (event: Event, options: MenuContextOption[], additionalProps: AdditionalMenuProps = {
        closeAfterClickItem: true
    })  => {
        window.onclick = () => {
            const context = document.querySelectorAll(".context-menu") as NodeListOf<MenuItemElement>
    
            if(context && context.length)
                context.forEach(c => c.remove())
        }

        window.onresize = () => {
            const context = document.querySelectorAll(".context-menu") as NodeListOf<MenuItemElement>
    
            if(context && context.length)
                context.forEach(c => MenuContext.positionContext(c))
        }

        event.stopPropagation()

        document.body.click()

        const context = document.createElement("div") as any
        context.classList.add("context-menu")
        context.relativeButton = event.target

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

        MenuContext.positionContext(context)   
    }

    static positionContext = (context: MenuItemElement) => {
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