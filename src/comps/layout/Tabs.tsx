import React, { CSSProperties } from "react"
import _ from "lodash"
import ReactDOM from "react-dom"

interface TabsProps {
    readonly style?: CSSProperties
    readonly className?: string
    readonly vertical?: boolean
    readonly tabStyle?: boolean
    readonly onChangeTab?: (index: number) => void
}

interface IState {
    readonly children: Tab[]
    readonly currentTab: number
}

interface TabProps{
    readonly title: string | JSX.Element
    readonly isDefault?: boolean
    readonly style?: CSSProperties
    readonly disabled?: boolean
}

export class Tabs extends React.PureComponent<TabsProps, IState>{
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

        this.setState({
            currentTab: findCurrent >= 0 ? findCurrent : 0
        }, this.handleBar)
    }

    componentDidMount = (): void => {
        this.loadTabs()
        window.addEventListener("resize", this.handleBar)
        window.addEventListener("load", this.handleBar)
    }

    componentWillUnmount = (): void => window.removeEventListener("resize", this.handleBar)

    componentDidUpdate = (prevProps: React.PropsWithChildren<TabsProps>): void => {
        this.handleBar()
        
        if(!_.isEqual(prevProps.children, this.props.children)){
            this.setState({ children: this.getChildrenTabs() }, () => {
                const prevFiltered = this.getChildrenTabs(prevProps).filter((v: Tab) => !!v),
                prevDefault = prevFiltered.indexOf(prevFiltered.find((child: Tab) => child?.props?.isDefault)),
                newChildren = this.getChildrenTabs().filter((v: Tab) => !!v),
                newDefault = newChildren.indexOf(newChildren.find((child: Tab) => child?.props?.isDefault))

                if(prevDefault !== newDefault)
                    this.loadTabs()
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
        if(this.props.tabStyle && !this.props.vertical) return

        const { vertical } = this.props,
        tab = ReactDOM.findDOMNode(this) as HTMLElement,
        header = tab.querySelector(".dolfo-tabs-links"),
        titles = header.querySelectorAll(".dolfo-tab-title"),
        bar = header.querySelector(".dolfo-tabs-underline") as HTMLElement,
        current = Array.from(titles).find(t => t.classList.contains("current")) as HTMLElement

        if(vertical){
            bar.style.marginTop = current.offsetTop + "px"
            bar.style.height = current.clientHeight + "px"
        }else{
            bar.style.marginLeft = current.offsetLeft + "px"
            bar.style.width = current.clientWidth + "px"
        }
    }

    checkKey = (e: any, index: number): void => {
        if(e.key.charCodeAt(0) === 32 || e.key === "Enter"){
            e.preventDefault()
            this.changeSelection(index)
        }
    }

    preventSpaceKey = (e: any): void => e.key.charCodeAt(0) === 32 && e.preventDefault()

    render = (): JSX.Element => {
        const { props } = this,
        { children, currentTab } = this.state,
        isVertical = props.vertical

        return <div className={"dolfo-tabs" + (props.tabStyle ? " tab-layout" : "") + (props.className ? (" " + props.className) : "") + (isVertical ? " vertical" : "")} style={props.style}>
            <div className="dolfo-tabs-links">
                {(!props.tabStyle || props.vertical) && <div className="dolfo-tabs-underline"></div>}

                {
                    children.map((child, i) => {
                        const disabled = child.props.disabled

                        return <div className={"dolfo-tab-title" + (currentTab === i ? " current" : "") + (disabled ? " disabled" : "")} onClick={!disabled ? () => this.changeSelection(i) : null} tabIndex={!disabled ? 0 : null} onKeyUp={(e) => this.checkKey(e, i)} onKeyDown={this.preventSpaceKey}>
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
                            return <></>
                        
                        return <div className={"dolfo-tab-content" + (i === currentTab ? " current" : "")} style={style}>
                            {child.props.children}
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export class Tab extends React.PureComponent<TabProps>{
    render = (): JSX.Element => <></>
}