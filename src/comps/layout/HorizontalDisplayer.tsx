import React, { CSSProperties, createRef } from "react"
import { EventManager } from "../shared/models/EventManager"

interface DisplayItemProps{
    /** The title of the displayer item
     * @type ReactNode
     */
    readonly title?: React.ReactNode
    /** Defines an image url for the displayer item backround
     * @type string
     */
    readonly imageUrl?: string
    /** Defines additional infos for the displayer item
     * @type ReactNode
     */
    readonly infos?: React.ReactNode
    /** Additional className for the displayer item
     * @type string
     */
    readonly className?: string
    /** Additional style for the displayer item
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Function triggered when clicking the item
     * @type Function
     */
    readonly onClick?: () => void
}

interface IProps{
    /** Additional className for the displayer
     * @type string
     */
    readonly className?: string
    /** Additional style for the displayer
     * @type CSSProperties
     */
    readonly style?: CSSProperties
}

export class HorizontalDisplayItem extends React.Component<React.PropsWithChildren<DisplayItemProps>>{}

export class HorizontalDisplayer extends React.Component<React.PropsWithChildren<IProps>>{
    private readonly MOVE_SIZE = 250
    private ref = createRef<HTMLDivElement>()
    private event: EventManager

    componentDidMount = () => this.event = new EventManager("resize", this.reset).register()

    componentWillUnmount = (): void => this.event.unregister()

    getChildren = (): HorizontalDisplayItem[] => React.Children.toArray(this.props.children).filter((c: any) => c.type === HorizontalDisplayItem) as unknown as HorizontalDisplayItem[]

    reset = (): void => {
        const node = this.ref.current,
        inner = node.querySelector(".dolfo-h-display-inner") as HTMLElement

        inner.style.marginLeft = "0"
    }

    movePrevious = (): void => {
        const node = this.ref.current,
        inner = node.querySelector(".dolfo-h-display-inner") as HTMLElement,
        margin = Number(inner.style.marginLeft.replace("px", ""))

        if(margin > -this.MOVE_SIZE)
            inner.style.marginLeft = "0"
        else
            inner.style.marginLeft = (margin + this.MOVE_SIZE) + "px"
    }

    moveNext = (): void => {
        const node = this.ref.current,
        inner = node.querySelector(".dolfo-h-display-inner") as HTMLElement,
        margin = Number(inner.style.marginLeft.replace("px", "")),
        paddingRight = Number(getComputedStyle(inner).paddingRight.replace("px", "")),
        diff = inner.scrollWidth - node.clientWidth

        if(Math.abs(margin) + this.MOVE_SIZE > diff){
            if(diff > 0)
                inner.style.marginLeft = -(diff + paddingRight) + "px"
        }else
            inner.style.marginLeft = (margin - this.MOVE_SIZE) + "px"
    }

    render = (): React.ReactNode => {
        const children = this.getChildren(),
        { className, style } = this.props

        return <div className={"dolfo-h-display" + (className ? " " + className : "")} style={style} ref={this.ref}>
            <div className="dolfo-h-display-prev-btn" onClick={this.movePrevious}>
                <i className="fal fa-fw fa-chevron-left"></i>
            </div>
            <div className="dolfo-h-display-next-btn" onClick={this.moveNext}>
                <i className="fal fa-fw fa-chevron-right"></i>
            </div>
            <div className="dolfo-h-display-inner">
                {
                    children.map((c, i) => {
                        return <div className={"dolfo-h-display-item" + (c.props.className ? " " + c.props.className : "")} key={i} style={c.props.imageUrl ? {
                            backgroundImage: `url(${c.props.imageUrl})`,
                            ...c.props.style
                        } : null} onClick={c.props.onClick}>
                            {c.props.children}
                            {c.props.title && <div className="dolfo-h-display-title">
                                <strong>{c.props.title}</strong>
                                {c.props.infos && <p>{c.props.infos}</p>}    
                            </div>}
                        </div>
                    })
                }
            </div>
        </div>
    }
}