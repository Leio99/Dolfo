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

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.children !== this.props.children)
            this.setState({ children: this.getChildrenTabs() })
    }

    getChildrenTabs = () => React.Children.map(this.props.children, (child: any) => child)

    changeSelection = (index: number, element: HTMLElement) => {
        const isVertical = this.props.vertical

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
        isVertical = props.vertical,
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