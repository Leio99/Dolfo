import React, { CSSProperties } from "react"
import { Icon } from "./Icon"

interface IProps{
	readonly title: string | JSX.Element
	readonly opened?: boolean
	readonly wrapperStyle?: CSSProperties
	readonly style?: CSSProperties
	readonly className?: string
	readonly wrapperClassName?: string
	readonly disabled?: boolean
}

interface IState{
	readonly opened: boolean
}

export class Accordion extends React.PureComponent<IProps, IState>{
	constructor(props: IProps){
		super(props)
		
		this.state = {
			opened: props.opened || false
		}
	}
	
	componentDidMount = () => {
		this.handleAccordions()

		window.addEventListener("resize", this.handleAccordions)
	}
    
    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
				opened: this.props.opened || false
            }, this.handleAccordions)
		}
	}
	
	toggleAccordion = () => this.setState({ opened: !this.state.opened }, this.handleAccordions)

	handleAccordions = () => {
		const accordions = document.querySelectorAll(".dolfo-accordion"),
		resizeAccordion = (acc: HTMLElement) => {
			const content = acc.children[1] as HTMLElement,
			isOpened = acc.classList.contains("opened")

			content.style.maxHeight = isOpened ? content.scrollHeight + "px" : "0"
		}
		
		accordions.forEach(acc => {
			const parentAccordion = acc.closest(".dolfo-accordion")

			resizeAccordion(acc as HTMLElement)

			if(parentAccordion)
				setTimeout(() => resizeAccordion(parentAccordion as HTMLElement), 200)
		})
	}
	
	render = (): JSX.Element => {
		const props = this.props,
		{ opened } = this.state
		
		return <div className={"dolfo-accordion" + (opened ? " opened" : "") + (props.wrapperClassName ? (" " + props.wrapperClassName) : "") + (props.disabled ? " disabled" : "")} style={props.wrapperStyle}>
			<div className="dolfo-accordion-header" onClick={this.toggleAccordion}>
				<Icon iconKey="chevron-down" className="accordion-caret" />
				
				<span className="accordion-title">{props.title}</span>
			</div>
			<div className={"dolfo-accordion-content" + (props.className ? (" " + props.className) : "")} style={props.style}>
				<div className="dolfo-accordion-inner">
					{props.children}
				</div>
			</div>
		</div>
	}

}