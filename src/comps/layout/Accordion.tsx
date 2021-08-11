import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Constants } from "../shared/Constants"
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
	
	componentDidMount = (): void => {
		this.handleAccordions()

		window.addEventListener("resize", this.handleAccordions)
	}

	componentWillUnmount = (): void => window.removeEventListener("resize", this.handleAccordions)
    
    componentDidUpdate = (prevProps: IProps): void => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
				opened: this.props.opened || false
            }, this.handleAccordions)
		}
	}
	
	toggleAccordion = (): void => this.setState({ opened: !this.state.opened }, this.handleAccordions)

	handleAccordions = (): void => {
		const accordion = ReactDOM.findDOMNode(this) as HTMLElement,
		content = accordion.children[1] as HTMLElement,
		isOpened = accordion.classList.contains("opened")

		if(!isOpened){
			content.style.maxHeight = content.scrollHeight + "px"
			content.classList.add("closing")
			setTimeout(() => content.classList.remove("closing"))
		}

		setTimeout(() => content.style.maxHeight = isOpened ? content.scrollHeight + "px" : "0")

		setTimeout(() => {
			if(isOpened) 
				content.style.maxHeight = "100%"
		}, 200)
	}
	
	render = (): JSX.Element => {
		const { props } = this,
		{ opened } = this.state
		
		return <div className={"dolfo-accordion" + (opened ? " opened" : "") + (props.wrapperClassName ? (" " + props.wrapperClassName) : "") + (props.disabled ? " disabled" : "")} style={props.wrapperStyle}>
			<div className="dolfo-accordion-header" onClick={this.toggleAccordion} data-tooltip={opened ? Constants.ACCORDION_COLLAPSE : Constants.ACCORDION_EXPAND}>
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