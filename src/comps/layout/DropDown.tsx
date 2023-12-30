import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    /** The label of the dropdown
     * @type React.ReactNode
     * @required
     */
    readonly label: React.ReactNode
    /** If true, the dropdown won't close when clicking an option
     * @type boolean
     */
    readonly preventCloseOnClick?: boolean
    /** Defines if the dropdown is disabled
     * @type boolean
     */
    readonly disabled?: boolean
    /** Additional className for the dropdown
     * @type string
     */
    readonly className?: string
    /** Additional style for the dropdown
     * @type CSSProperties
     */
    readonly style?: CSSProperties
}

interface DropDownItemProps extends React.PropsWithChildren{
    /** Defines if the option is disabled
     * @type boolean
     */
    readonly disabled?: boolean
    /** Additional className for the option
     * @type string
     */
    readonly className?: string
    /** Additional style for the option
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Determines if the option is static and not clickable
     * @type boolean
     */
    readonly static?: boolean
    /** Function triggered when clicking the option
     * @type Function
     * @param e React.MouseEvent
     */
    readonly onClick?: (e: React.MouseEvent) => void
    /** Function triggered on mouse down on the option
     * @type Function
     * @param e React.MouseEvent
     */
    readonly onMouseDown?: (e: React.MouseEvent) => void
}

interface IState{
    readonly opened: boolean
}

export class DropDown extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: false
        }
    }

    componentDidMount = () => window.addEventListener("resize", this.resetNodeWidth)

    componentWillUnmount = () => window.removeEventListener("resize", this.resetNodeWidth)

    resetNodeWidth = () => {
        const node = ReactDOM.findDOMNode(this) as HTMLElement
        node.style.width = "auto"
    }

    close = () => this.setState({ opened: false })
    
    open = () => {
        if(this.props.disabled)
            return

        this.setState({ opened: true }, () => {
            const node = ReactDOM.findDOMNode(this) as HTMLElement,
            items = node.querySelectorAll(".dropdown-items-container .dolfo-dropdown-item")
            let maxWidth = 0

            items.forEach(i => {
                const span = document.createElement("span"),
                label = node.querySelector(".dolfo-dropdown-label"),
                pL = window.getComputedStyle(label, null).getPropertyValue("padding-left"),
                pR = window.getComputedStyle(label, null).getPropertyValue("padding-right")

                span.innerHTML = i.innerHTML
                span.style.position = "fixed"
                span.style.opacity = "0"
                span.style.pointerEvents = "none"
                span.style.paddingLeft = pL
                span.style.paddingRight = pR

                document.body.append(span)

                const width = span.clientWidth

                span.remove()

                if(width > maxWidth)
                    maxWidth = width
            })

            if(node.clientWidth <= maxWidth)
                node.style.width = maxWidth + "px"
            else
                node.style.width = "auto"
        })
    }

    getItems = (): DropDownItem[] => React.Children.map(this.props.children, (child: any) => child).filter(o => !!o)

    clickItem = (e: React.MouseEvent, item: DropDownItem, property: keyof DropDownItemProps = "onClick") => {
        if(item.props.disabled || item.props.static) return

        e.stopPropagation()

        if(item.props[property]){
            (item.props[property] as Function)(e)
            
            if(!this.props.preventCloseOnClick)
                this.close()
        }
    }

    render = (): React.ReactNode => {
        const { props } = this,
        { opened } = this.state,
        items = this.getItems()

        return <ul className={"dolfo-dropdown" + (props.disabled ? " disabled" : "") + (props.className ? " " + props.className : "")} onMouseEnter={this.open} onMouseLeave={this.close} style={props.style}>
            <li className="dolfo-dropdown-label">
                {props.label} <Icon iconKey="caret-down" className="dropdown-icon" />
            </li>

            {
                opened && <div className="dropdown-items-container">
                    {
                        items.map((i, k) => <div className={"dolfo-dropdown-item" + (i.props.static ? " static" : "") + (i.props.disabled ? " disabled" : "") + (i.props.className ? " " + i.props.className : "")} onClick={e => this.clickItem(e, i)} onMouseDown={e => this.clickItem(e, i, "onMouseDown")} style={i.props.style} key={k}>{i.props.children}</div>)
                    }
                </div>
            }
        </ul>
    }
}

export class DropDownItem extends React.Component<DropDownItemProps>{}