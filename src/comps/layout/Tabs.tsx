import React, { CSSProperties } from "react"
import { Tab } from "./Tab"

export interface IProps {
    readonly style?: CSSProperties
    readonly className?: string
    readonly vertical?: boolean
}
export interface IState {
    readonly children: Tab[]
    readonly currentTab: number
}

export class Tabs extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        const children = this.getChildrenTabs() as Tab[],
        findCurrent = children.indexOf(children.find(child => child.props?.isDefault))

        this.state = {
            children,
            currentTab: findCurrent >= 0 ? findCurrent : 0
        }
    }

    componentDidMount = () => {
        this.handleBar()
        window.addEventListener("load", this.handleBar)
        window.addEventListener("resize", this.handleBar)
    }

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.children !== this.props.children)
            this.setState({ children: this.getChildrenTabs() })
    }

    getChildrenTabs = () => React.Children.map(this.props.children, (child: any) => child).filter(t => !!t)

    changeSelection = (index: number) => {
        this.setState({
            currentTab: index
        }, this.handleBar)
    }

    handleBar = () => {
        const tabs = document.querySelectorAll(".dolfo-tabs")

        tabs.forEach(tab => {
            const header = tab.querySelector(".dolfo-tabs-links"),
            isVertical = tab.classList.contains("vertical")

            const titles = header.querySelectorAll(".dolfo-tab-title"),
            bar = header.querySelector(".dolfo-tabs-underline") as HTMLElement,
            current = Array.from(titles).find(t => t.classList.contains("current")) as HTMLElement

            if(isVertical){
                bar.style.marginTop = current.offsetTop + "px"
                bar.style.height = current.clientHeight + "px"
            }else{
                bar.style.marginLeft = current.offsetLeft + "px"
                bar.style.width = current.clientWidth + "px"
            }
        })
    }

    checkKey = (e: any, index: number) => {
        if(e.key.charCodeAt(0) === 32 || e.key.charCodeAt(0) === 69){
            e.preventDefault()
            this.changeSelection(index)
        }
    }

    preventSpaceKey = (e: any) => e.key.charCodeAt(0) === 32 && e.preventDefault()

    render = (): JSX.Element => {
        const props = this.props,
        { children, currentTab } = this.state,
        isVertical = props.vertical

        return <div className={"dolfo-tabs" + (props.className ? (" " + props.className) : "") + (isVertical ? " vertical" : "")} style={props.style}>
            <div className="dolfo-tabs-links">
                <div className="dolfo-tabs-underline"></div>

                {
                    children.map((child, i) => {
                        const disabled = child.props.disabled

                        return <div className={"dolfo-tab-title" + (currentTab === i ? " current" : "") + (disabled ? " disabled" : "")} onClick={!disabled ? () => this.changeSelection(i) : null} tabIndex={!disabled ? 0 : null} onKeyUp={(e) => this.checkKey(e, i)} onKeyDown={this.preventSpaceKey}>
                            {child.props.title}
                        </div>
                    })
                }
            </div>

            <div className="dolfo-tabs-list">
                {
                    children.map((child, i) => {
                        const marginLeft = -(100 * currentTab) + "%",
                        style = i === 0 && !isVertical ? { ...child.props.style, marginLeft } : child.props.style

                        if(child.props.disabled)
                            return <Tab title={child.props.title} />
                        
                        return <Tab {...child.props} selected={i === currentTab} style={style} />
                    })
                }
            </div>
        </div>
    }
}
