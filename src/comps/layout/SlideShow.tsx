import React, { CSSProperties } from "react"
import { Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    readonly style?: CSSProperties
    readonly automatic?: boolean
}

interface SlideProps extends React.PropsWithChildren{
    readonly selected?: boolean
    readonly imageUrl?: string
    readonly style?: CSSProperties
}

interface IState{
    readonly slides: Slide[]
    readonly currentSlide: number
    readonly isHover?: boolean
}

export class SlideShow extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        const slides = this.getSlides(),
        currentSlide = slides.find(s => s.props.selected)

        this.state = {
            slides,
            currentSlide: !currentSlide ? 0 : slides.indexOf(currentSlide),
            isHover: false
        }
    }

    componentDidMount = (): void => {
        this.props.automatic && setInterval(() => {
            if(!this.state.isHover)
                this.nextSlide()
        }, 2500)
    }

    toggleHover = (): void => this.setState({ isHover: !this.state.isHover })

    compontentDidUpdate = (prevProps: any): void => {
        if(prevProps.children !== this.props.children)
            this.setState({ slides: this.getSlides() })
    }

    getSlides = (): Slide[] => React.Children.map(this.props.children, (child: any) => child)

    nextSlide = (): void => {
        const length = this.state.slides.length
        let newCurrent = this.state.currentSlide + 1

        if(newCurrent >= length)
            newCurrent = 0

        this.setState({ currentSlide: newCurrent })
    }

    prevSlide = (): void => {
        const length = this.state.slides.length
        let newCurrent = this.state.currentSlide - 1

        if(newCurrent < 0) newCurrent = length - 1

        this.setState({ currentSlide: newCurrent })
    }

    changeSlide = (currentSlide: number): void => this.setState({ currentSlide })

    render = (): JSX.Element => {
        const { props } = this,
        { slides, currentSlide } = this.state,
        marginLeft = (-currentSlide * 100) + "%"

        return <div className="dolfo-slideshow" style={props.style} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <div className="dolfo-prev-slide" onClick={this.prevSlide}>
                <Icon type="fal" iconKey="chevron-left" />
            </div>
            <div className="dolfo-next-slide" onClick={this.nextSlide}>
                <Icon type="fal" iconKey="chevron-right" />
            </div>

            <div className="dolfo-slides">
                {
                    slides.map((slide, i) => {
                        const style = i === 0 ? { ...slide.props.style, marginLeft } : ({ ...slide.props.style } || {})

                        if(slide.props.imageUrl)
                            style.backgroundImage = `url('${slide.props.imageUrl}')`

                        return <div className="dolfo-slide" style={style} key={i}>
                            {slide.props.children}
                        </div>
                    })
                }
            </div>

            <div className="dolfo-slides-dots">
                {
                    slides.map((_, i) => {
                        return <div className={"slide-dot" + (currentSlide === i ? " selected" : "")} onClick={() => this.changeSlide(i)} key={i}></div>
                    })
                }
            </div>
        </div>
    }
}

export class Slide extends React.PureComponent<SlideProps>{
    render = (): JSX.Element => <></>
}