import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { EventManager, addToRegister, unregisterAll } from "../shared/models/EventManager"

export interface ContextMenuOption{
    /** The label of the option
     * @type ReactNode
     * @required
     */
    readonly label: React.ReactNode
    /** Function triggered when clicking the option
     * @type Function
     * @param e MouseEvent
     * @param clickedItem HTMLElement
     * @required
     */
    readonly onClick: (e: MouseEvent, clickedItem: HTMLElement) => void
    /** Defines if the option is disabled
     * @type boolean
     */
    readonly disabled?: boolean
}

interface ContextMenuElement extends HTMLDivElement{
    relativeElement: HTMLElement
}

interface IProps extends React.PropsWithChildren{
    /** Defines the options of the menu
     * @type ContextMenuOption[]
     * @required
     */
    readonly options: ContextMenuOption[]
    /** If true, the menu will close when selecting an option
     * @type boolean
     */
    readonly closeAfterClickItem?: boolean
    /** If true, the menu will open when right clicking the element
     * @type boolean
     */
    readonly openWithRightClick?: boolean
}

export class ContextMenu extends React.Component<IProps>{
    private elementRef: ContextMenuElement
    private observer: MutationObserver
    private events: EventManager[] = []
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

                addToRegister(this.events, new EventManager("click", (e: MouseEvent) => {
                    if (item.disabled)
                        return

                    e.stopPropagation()

                    item.onClick(e, htmlItem)

                    if (closeAfterClickItem || closeAfterClickItem == null)
                        document.body.click()
                }, htmlItem))
    
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

        addToRegister(this.events, new EventManager(event, this.LISTENERS.nodeClick, node))
        addToRegister(this.events, new EventManager("click", this.LISTENERS.windowClick))
        addToRegister(this.events, new EventManager("scroll", this.LISTENERS.windowResizeOrScroll))
        addToRegister(this.events, new EventManager("resize", this.LISTENERS.windowResizeOrScroll))

        this.observer.observe(context, { childList: true })

        context.classList.add("context-menu")
        context.relativeElement = node

        this.positionContext(context)

        this.elementRef = context
    }

    componentWillUnmount = (): void => {
        this.LISTENERS.windowClick()
        unregisterAll(this.events)
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

    render = (): React.ReactNode => !React.isValidElement(this.props.children) ? React.createElement("span", null, this.props.children) : this.props.children
}