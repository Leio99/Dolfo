import React, { CSSProperties } from "react"
import { Icon } from "./Icon";
import { Slide } from "./Slide";

export interface IProps{
    readonly style?: CSSProperties
    readonly automatic?: boolean
}
export interface IState{
    readonly slides: Slide[]
    readonly currentSlide: number
    readonly isHover?: boolean
}

export class SlideShow extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        let slides = this.getSlides(),
        currentSlide = slides.find(s => s.props.selected) || 0

        this.state = {
            slides,
            currentSlide,
            isHover: false
        }
    }

    componentDidMount = () => {
        this.props.automatic && setInterval(() => {
            if(!this.state.isHover) this.nextSlide()
        }, 2500)
    }

    toggleHover = () => this.setState({ isHover: !this.state.isHover })

    compontentDidUpdate = (prevProps: any) => {
        if(prevProps.children !== this.props.children){
            this.setState({
                slides: this.getSlides()
            })
        }
    }

    getSlides = () => React.Children.map(this.props.children, (child: any) => child)

    nextSlide = () => {
        let length = this.state.slides.length,
        newCurrent = this.state.currentSlide + 1

        if(newCurrent >= length) newCurrent = 0

        this.setState({ currentSlide: newCurrent })
    }

    prevSlide = () => {
        let length = this.state.slides.length,
        newCurrent = this.state.currentSlide - 1

        if(newCurrent < 0) newCurrent = length - 1

        this.setState({ currentSlide: newCurrent })
    }

    changeSlide = (currentSlide: number) => this.setState({ currentSlide })

    render = (): JSX.Element => {
        const props = this.props,
        { slides, currentSlide } = this.state,
        marginLeft = (-currentSlide * 100) + "%"

        return <div className="dolfo-slideshow" style={props.style} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <div className="dolfo-prev-slide" onClick={this.prevSlide}>
                <Icon icon={{ type: "far", key: "chevron-left" }} />
            </div>
            <div className="dolfo-next-slide" onClick={this.nextSlide}>
                <Icon icon={{ type: "far", key: "chevron-right" }} />
            </div>

            <div className="dolfo-slides">
                {
                    slides.map((slide, i) => {
                        let style: CSSProperties = i === 0 ? { marginLeft } : {}

                        if(slide.props.imageUrl)
                            style.backgroundImage = slide.props.imageUrl ? `url('${slide.props.imageUrl}')` : ""

                        return <Slide {...slide.props} style={style} />
                    })
                }
            </div>

            <div className="dolfo-slides-dots">
                {
                    slides.map((_, i) => {
                        return <div className={"slide-dot" + (currentSlide === i ? " selected" : "")} onClick={() => this.changeSlide(i)}></div>
                    })
                }
            </div>
        </div>
    }
}