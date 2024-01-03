import _ from "lodash"
import React, { CSSProperties, createRef } from "react"
import { EventManager } from "../shared/models/EventManager"

interface TabsProps extends React.PropsWithChildren{
    /** Defines if the tabs are vertical
     * @type boolean
     */
    readonly vertical?: boolean
    /** Defines a tab style for the tabs
     * @type boolean
     */
    readonly tabStyle?: boolean
    /** Additional className for the tabs container
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the tabs container
     * @type string
     */
    readonly className?: string
    /** Function triggere when changing the tab
     * @type Function
     * @param index number
     */
    readonly onChangeTab?: (index: number) => void
}

interface TabProps extends React.PropsWithChildren{
    /** The title of the tab
     * @type ReactNode
     * @required
     */
    readonly title: React.ReactNode
    /** Defines if the tab is selected by default
     * @type boolean
     */
    readonly isDefault?: boolean
    /** Additional className for the tab
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the tab
     * @type string
     */
    readonly className?: string
    /** Defines if the tab is disabled
     * @type boolean
     */
    readonly disabled?: boolean
}

interface IState{
    readonly children: Tab[]
    readonly currentTab: number
}

export class Tabs extends React.PureComponent<TabsProps, IState>{
    private ref = createRef<HTMLDivElement>()
    private mounted = true
    private event: EventManager

    constructor(props: TabsProps) {
        super(props)

        this.state = {
            children: this.getChildrenTabs() as Tab[],
            currentTab: 0
        }
    }

    loadTabs = (): void => {
        const { children, currentTab } = this.state,
        findCurrent = currentTab || children.indexOf(children.find(child => child.props?.isDefault && !child.props?.disabled))

        this.setState({ currentTab: findCurrent >= 0 ? findCurrent : 0 }, this.handleBar)
    }

    componentDidMount = (): void => {
        this.loadTabs()
        this.event = new EventManager("resize", this.handleBar).activateOnRegister().register()
    }

    componentWillUnmount = (): void => {
        this.mounted = false
        this.event.unregister()
    }

    componentDidUpdate = (prevProps: React.PropsWithChildren<TabsProps>): void => {
        this.handleBar()
        
        if(!_.isEqual(prevProps.children, this.props.children)){
            this.setState({ children: this.getChildrenTabs() }, () => {
                const prevFiltered = this.getChildrenTabs(prevProps).filter((v: Tab) => !!v),
                prevDefault = prevFiltered.indexOf(prevFiltered.find((child: Tab) => child?.props?.isDefault)),
                newChildren = this.getChildrenTabs().filter((v: Tab) => !!v),
                newDefault = newChildren.indexOf(newChildren.find((child: Tab) => child?.props?.isDefault))

                if(prevDefault !== newDefault)
                    this.setState({ currentTab: newDefault }, this.loadTabs)
            })
        }
    }

    getChildrenTabs = (props = this.props): Tab[] => React.Children.map(props.children, (child: any) => child).filter(t => !!t)

    changeSelection = (index: number): void => {
        this.setState({
            currentTab: index
        }, this.handleBar)

        this.props.onChangeTab && this.props.onChangeTab(index)
    }

    handleBar = (): void => {
        if(!this.mounted)
            return
        
        if(this.props.tabStyle && !this.props.vertical) return

        const { vertical } = this.props,
        tab = this.ref.current,
        header = tab.querySelector(".dolfo-tabs-links"),
        titles = header.querySelectorAll(".dolfo-tab-title"),
        bar = header.querySelector(".dolfo-tabs-underline") as HTMLElement,
        current = Array.from(titles).find(t => t.classList.contains("current")) as HTMLElement || titles[0] as HTMLElement

        if(vertical){
            bar.style.marginTop = current.offsetTop + "px"
            bar.style.height = current.clientHeight + "px"
        }else{
            bar.style.marginLeft = current.offsetLeft + "px"
            bar.style.width = current.clientWidth + "px"
        }
    }

    checkKey = (e: React.KeyboardEvent, index: number): void => {
        if(e.key.charCodeAt(0) === 32 || e.key === "Enter"){
            e.preventDefault()
            this.changeSelection(index)
        }
    }

    preventSpaceKey = (e: React.KeyboardEvent): void => e.key.charCodeAt(0) === 32 && e.preventDefault()

    render = (): React.ReactNode => {
        const { props } = this,
        { children, currentTab } = this.state,
        isVertical = props.vertical

        return <div className={"dolfo-tabs" + (props.tabStyle && !isVertical ? " tab-layout" : "") + (props.className ? (" " + props.className) : "") + (isVertical ? " vertical" : "")} style={props.style} ref={this.ref}>
            <div className="dolfo-tabs-links">
                {(!props.tabStyle || props.vertical) && <div className="dolfo-tabs-underline"></div>}

                {
                    children.map((child, i) => {
                        const disabled = child.props.disabled

                        return <div className={"dolfo-tab-title" + (currentTab === i ? " current" : "") + (disabled ? " disabled" : "")} onClick={!disabled ? () => this.changeSelection(i) : null} tabIndex={!disabled ? 0 : null} onKeyUp={(e) => this.checkKey(e, i)} onKeyDown={this.preventSpaceKey} key={i}>
                            {child.props.title}
                        </div>
                    })
                }
            </div>

            <div className={"dolfo-tabs-list" + (currentTab === 0 && props.tabStyle ? " tl-angle" : "")}>
                {
                    children.map((child, i) => {
                        const marginLeft = -(100 * currentTab) + "%",
                        style = i === 0 && !isVertical ? { ...child.props.style, marginLeft } : child.props.style

                        if(child.props.disabled)
                            return <React.Fragment key={i} />
                        
                        return <div className={"dolfo-tab-content" + (i === currentTab ? " current" : "") + (child.props.className ? (" " + child.props.className) : "")} style={style} key={i}>
                            {child.props.children}
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export class Tab extends React.PureComponent<TabProps>{}