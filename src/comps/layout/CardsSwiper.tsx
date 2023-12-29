import React, { CSSProperties, createRef } from "react"
import { Icon } from "./Icon"

interface CardProps{
    readonly title?: string | React.ReactNode
    readonly className?: string
    readonly style?: CSSProperties
}

interface IProps extends Partial<IState>{
    readonly className?: string
    readonly style?: CSSProperties
}

interface IState{
    readonly current?: number
}

export class CardsSwiper extends React.Component<React.PropsWithChildren<IProps>, IState>{
	private ref = createRef<HTMLDivElement>()

    constructor(props: IProps){
        super(props)

        this.state = {
            current: props.current && props.current >= 0 ? props.current : 0
        }
    }

    calcolaSwipers = () => {
        const sw = this.ref.current, 
        cards = sw.querySelectorAll(".dolfo-swiper-card") as NodeListOf<HTMLElement>,
        current = sw.querySelector(".dolfo-swiper-card.current") as HTMLElement,
        cardsBefore = Array.from(cards).indexOf(current),
        nextBtn = sw.querySelector(".btn-next") as HTMLElement,
        prevBtn = sw.querySelector(".btn-prev") as HTMLElement,
        height = Array.from(cards).reduce((a, b) => {
            b.setAttribute("style", "")

            if(b.scrollHeight > a)
                return b.scrollHeight
            
            return a
        }, 0)
        
        sw.style.height = height + "px"
        cards.forEach(c => c.style.height = height + "px")
        
        let start = 10 * cardsBefore,
        end = 10,
        max = 2,
        min = 0
        
        for(let i = 0; i < cardsBefore; i++){
            cards[i].style.left = -start + "px"
            cards[i].style.right = start + "px"
            cards[i].style.zIndex = i.toString()
            cards[i].style.transform = `scale(0.${9 - (cardsBefore - i - 1)}`
        
            start -= 10

            if(cardsBefore - min > 3)
                cards[i].style.opacity = "0"

            min++
        }
        
        for(let i = cardsBefore + 1; i < cards.length; i++){
            cards[i].style.right = -end + "px"
            cards[i].style.left = end + "px"
            cards[i].style.zIndex = (cards.length - i).toString()
            cards[i].style.transform = `scale(0.${9 - (i - 1 - cardsBefore)}`
        
            end += 10

            if(max < 0)
                cards[i].style.opacity = "0"

            max--
        }

        const maxZIndex = Math.max(...Array.from(cards).map(a => +a.style.zIndex))
        
        current.style.zIndex = (maxZIndex + 1).toString()
        nextBtn.style.zIndex = (maxZIndex + 2).toString()
        prevBtn.style.zIndex = (maxZIndex + 2).toString()
    }

    componentDidMount = () => {
        this.calcolaSwipers()

        window.addEventListener("resize", this.calcolaSwipers)
    }

    componentWillUnmount = () => window.removeEventListener("resize", this.calcolaSwipers)

    goNext = () => {
        const { current } = this.state

        this.setState({ current: current === this.getCards().length - 1 ? 0 : current + 1}, this.calcolaSwipers)
    }

    goPrev = () => {
        const { current } = this.state
        
        this.setState({ current: current === 0 ? this.getCards().length - 1 : current - 1}, this.calcolaSwipers)
    }

    getCards = () => React.Children.toArray(this.props.children).filter((c: any) => c.type === SwiperCard) as unknown as SwiperCard[]

    render = () => {
        const cards = this.getCards(),
        { current } = this.state,
        { className, style } = this.props

        return <div className={"dolfo-card-swiper" + (className ? " " + className : "")} style={style} ref={this.ref}>
            <div className="btn-prev" onClick={this.goPrev}>
                <Icon iconKey="chevron-left" type="far" />
            </div>
            <div className="btn-next" onClick={this.goNext}>
                <Icon iconKey="chevron-right" type="far" />
            </div>

            {
                cards.map((c, i) => <div className={"dolfo-swiper-card" + (current === i ? " current" : "") + (c.props.className ? " " + c.props.className : "")} style={c.props.style} key={i}>
                    {c.props.title && <h4>{c.props.title}</h4>}
                    {c.props.children}
                </div>)
            }
        </div>
    }
}

export class SwiperCard extends React.Component<React.PropsWithChildren<CardProps>>{}