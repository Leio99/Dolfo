import React, { CSSProperties } from "react"
import { Icon } from "./Icon"

interface IProps extends React.PropsWithChildren{
    /** Additional className for the slideshow
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the slideshow
     * @type string
     */
    readonly className?: string
    /** Defines if the slideshows should be automatic
     * @type boolean
     */
    readonly automatic?: boolean
}

interface SlideProps extends React.PropsWithChildren{
    /** Defines if the slide is selected by default
     * @type boolean
     */
    readonly selected?: boolean
    /** Defines an image background for the slide
     * @type string
     */
    readonly imageUrl?: string
    /** Additional className for the slide
     * @type CSSProperties
     */
    readonly style?: CSSProperties
    /** Additional className for the slide
     * @type string
     */
    readonly className?: string
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

    render = (): React.ReactNode => {
        const { props } = this,
        { slides, currentSlide } = this.state,
        marginLeft = (-currentSlide * 100) + "%"

        return <div className={"dolfo-slideshow" + (props.className ? " " + props.className : "")} style={props.style} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
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

                        return <div className={"dolfo-slide" + (slide.props.className ? " " + slide.props.className : "")} style={style} key={i}>
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

export class Slide extends React.PureComponent<SlideProps>{}