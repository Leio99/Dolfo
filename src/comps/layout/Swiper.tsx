import React, { CSSProperties } from "react"
import { Constants } from "../shared/Constants"
import Button from "./Button"
import { Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    readonly opened?: boolean
}

interface SwipeProps extends React.PropsWithChildren{
    readonly style?: CSSProperties
    readonly className?: string
    readonly onGoBack?: () => void
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

    render = (): React.ReactNode => {
        const swipes = this.getSwipes(),
        { opened } = this.state
        
        if(swipes.length !== 2) return <span>{Constants.SWIPE_ERROR_ONLY_ONE}</span>

        return <div className="dolfo-swiper-container">
            {
                swipes.map((s, i) => {
                    return <div className={"dolfo-swipe" + (i === 1 ? (" detail-swipe" + (opened ? " opened" : "")) : "") + (s.props.className ? (" " + s.props.className) : "")} style={s.props.style} key={i}>
                        {i === 1 && <div className="dolfo-swipe-header">
                            <Button type="text" btnColor="grey" onClick={s.props.onGoBack}>
                                <Icon iconKey="chevron-left" /> {Constants.BACK_TEXT}
                            </Button>  
                        </div>}
                        {s.props.children}
                    </div>
                })
            }
        </div>
    }
}

export class Swipe extends React.PureComponent<SwipeProps>{}