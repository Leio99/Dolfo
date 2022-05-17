import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"

export interface ContextMenuOption{
    readonly label: string | JSX.Element
    readonly onClick: (e: any, clickedItem: HTMLElement) => void
    readonly disabled?: boolean
}

interface ContextMenuElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

interface IProps extends React.PropsWithChildren<unknown>{
    readonly options: ContextMenuOption[]
    readonly closeAfterClickItem?: boolean
    readonly openWithRightClick?: boolean
}

export class ContextMenu extends React.Component<IProps>{
    private elementRef: ContextMenuElement
    private observer: MutationObserver
    private readonly LISTENERS = {
        windowResizeOrScroll: () => this.positionContext(this.elementRef),
        windowClick: () => this.elementRef?.remove(),
        nodeClick: (e: Event) => {
            const { options, closeAfterClickItem } = this.props

            document.body.click()
            e.stopPropagation()
            e.preventDefault()

            this.elementRef.innerHTML = ""

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
    
                    if(closeAfterClickItem || closeAfterClickItem == null)
                        document.body.click()
                })
    
                if(_.isString(item.label))
                    htmlItem.innerText = item.label
                else
                    createRoot(htmlItem).render(item.label)
    
                this.elementRef.appendChild(htmlItem)
            })

            document.body.appendChild(this.elementRef)
        }
    }

    componentDidMount = (): void => {
        const { openWithRightClick } = this.props,
        context = document.createElement("div") as ContextMenuElement,
        node = ReactDOM.findDOMNode(this) as HTMLElement,
        event = openWithRightClick ? "contextmenu" : "click"

        this.observer = new MutationObserver(() => this.positionContext(context))

        document.body.click()

        node.addEventListener(event, this.LISTENERS.nodeClick)
        window.addEventListener("click", this.LISTENERS.windowClick)
        window.addEventListener("scroll", this.LISTENERS.windowResizeOrScroll)
        window.addEventListener("resize", this.LISTENERS.windowResizeOrScroll)
        this.observer.observe(context, { childList: true })

        context.classList.add("context-menu")
        context.relativeElement = node

        this.positionContext(context)

        this.elementRef = context
    }

    componentWillUnmount = (): void => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement,
        event = this.props.openWithRightClick ? "contextmenu" : "click"

        this.LISTENERS.windowClick()
        node.removeEventListener(event, this.LISTENERS.nodeClick)
        window.removeEventListener("click", this.LISTENERS.windowClick)
        window.removeEventListener("scroll", this.LISTENERS.windowResizeOrScroll)
        window.removeEventListener("resize", this.LISTENERS.windowResizeOrScroll)
        this.observer.disconnect()
    }

    positionContext = (context: ContextMenuElement): void => {
        const menuPos = context.getBoundingClientRect(),
        position = context.relativeElement.getBoundingClientRect(),
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

    render = () => !React.isValidElement(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children
}