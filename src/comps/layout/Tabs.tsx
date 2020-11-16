import React, { CSSProperties } from "react"
import { Tab } from "./Tab"

export interface IProps {
    readonly style?: CSSProperties
    readonly className?: string
    readonly direction?: "horizontal" | "vertical"
}
export interface IState {
    readonly children: Tab[]
    readonly currentTab: number
    readonly barMargin: number
    readonly barWidth: number
    readonly firstLoad: boolean
}

export class Tabs extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        let children = this.getChildrenTabs(),
        findCurrent = children.indexOf(children.find(child => child.props.isDefault))

        this.state = {
            children,
            currentTab: findCurrent >= 0 ? findCurrent : 0,
            barMargin: 0,
            barWidth: 0,
            firstLoad: true
        }
    }

	//click left: se il margin del primo link è 0, non va più indietro, se no va indietro di 50px (ma se il margine diventa negativo, margin = 0)
	//click right:
	
    // componentDidMount = () => {
    //     let tabLinks = document.getElementsByClassName("dolfo-tabs-links")

    //     window.addEventListener("resize", () => {
    //         Array.from(tabLinks).forEach(link => {
    //             let isOverflowing = link.clientWidth < link.scrollWidth,
    //             children = Array.from(link.childNodes),
    //             hasArrows = children.find((c: any) => c.classList.contains("dolfo-tab-link-prev"))

    //             if(isOverflowing && !hasArrows){
    //                 let linkPrev = document.createElement("div")
    //                 linkPrev.classList.add("dolfo-tab-link-prev")
    //                 linkPrev.textContent = "<"

    //                 let linkNext = document.createElement("div")
    //                 linkNext.classList.add("dolfo-tab-link-next")
    //                 linkNext.textContent = ">"

    //                 link.prepend(linkPrev)
    //                 link.append(linkNext)
    //             }else if(!isOverflowing && hasArrows){
    //                 hasArrows.remove()
    //                 children.find((c: any) => c.classList.contains("dolfo-tab-link-next")).remove()
    //             }
    //         })
    //     })
    // }

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.children !== this.props.children)
            this.setState({ children: this.getChildrenTabs() })
    }

    getChildrenTabs = () => React.Children.map(this.props.children, (child: any) => child)

    changeSelection = (index: number, element: HTMLElement) => {
        const isVertical = this.props.direction === "vertical"

        this.setState({
            currentTab: index,
            barWidth: isVertical ? element?.clientHeight : element?.clientWidth,
            barMargin: isVertical ? element?.offsetTop : element?.offsetLeft,
            firstLoad: false
        })
    }

    checkKey = (e: any, index: number, element: HTMLElement) => {
        if(e.keyCode === 32 || e.keyCode === 13)
            this.changeSelection(index, element)
    }

    render = (): JSX.Element => {
        const props = this.props,
        { children, currentTab, barMargin, barWidth, firstLoad } = this.state,
        isVertical = props.direction === "vertical",
        barStyle = isVertical ? { marginTop: barMargin, height: barWidth } : { marginLeft: barMargin, width: barWidth }

        return <div className={"dolfo-tabs" + (props.className ? (" " + props.className) : "") + (isVertical ? " vertical" : "")} style={props.style}>
            <div className="dolfo-tabs-links">
                <div className="dolfo-tabs-underline" style={barStyle}></div>

                {
                    children.map((child, i) => {
                        let el: HTMLElement

                        if(firstLoad && currentTab === i) setTimeout(() => this.changeSelection(i, el))

                        return <div className={"dolfo-tab-title" + (currentTab === i ? " current" : "")} onClick={() => this.changeSelection(i, el)} ref={r => el = r} tabIndex={0} onKeyUp={(e) => this.checkKey(e, i, el)}>
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

                        return <Tab {...child.props} selected={i === currentTab} style={style} />
                    })
                }
            </div>
        </div>
    }
}