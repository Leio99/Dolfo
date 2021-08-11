import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import Button from "./Button"
import { Icon } from "./Icon"

interface IProps{
    readonly opened?: boolean
}

export class Swiper extends React.PureComponent<IProps, IProps>{
    constructor(props: IProps){
        super(props)

        this.state = {
            opened: this.props.opened
        }
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.opened !== this.props.opened && this.props.opened !== this.state.opened)
            this.setState({ opened: this.props.opened })
    }

    getSwipes = (): Swipe[] => React.Children.map(this.props.children, (child: any) => child).filter(t => !!t)

    render = (): JSX.Element => {
        const swipes = this.getSwipes(),
        { opened } = this.state
        
        if(swipes.length !== 2) return <span>{Constants.SWIPE_ERROR_ONLY_ONE}</span>

        return <div className="dolfo-swiper-container">
            {
                swipes.map((s, i) => {
                    return <Swipe opened={opened} detail={i === 1} {...s.props} />
                })
            }
        </div>
    }
}

interface SwipeProps{
    readonly detail?: boolean
    readonly opened?: boolean
    readonly onGoBack?: () => void
    readonly style?: CSSProperties
    readonly className?: string
}

export class Swipe extends React.PureComponent<SwipeProps>{
    render = (): JSX.Element => {
        const { props } = this

        return <div className={"dolfo-swipe" + (props.detail ? (" detail-swipe" + (props.opened ? " opened" : "")) : "") + (props.className ? (" " + props.className) : "")} style={props.style}>
            {props.detail && <div className="dolfo-swipe-header">
                <Button textBtn btnColor="grey" onClick={props.onGoBack}>
                    <Icon iconKey="chevron-left" /> {Constants.BACK_TEXT}
                </Button>  
            </div>}
            {this.props.children}
        </div>
    }
}