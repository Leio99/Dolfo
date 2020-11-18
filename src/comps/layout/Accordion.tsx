import React, { CSSProperties } from "react"
import { Icon } from "./Icon"

export interface IProps{
	readonly title: string | JSX.Element
	readonly opened?: boolean
	readonly wrapperStyle?: CSSProperties
}
export interface IState{
	readonly opened: boolean
	readonly updated: boolean
}

export class Accordion extends React.PureComponent<IProps, IState>{
	constructor(props: IProps){
		super(props)
		
		this.state = {
			opened: props.opened || false,
			updated: props.opened || false
		}
    }
    
    componendDidUpdate = (prevProps: IProps) => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
				opened: this.props.opened || false,
				updated: true
            })
        }
    }
	
	toggleAccordion = (element: HTMLElement, updated = false) => {
		element.style.maxHeight = !this.state.opened || updated ? element.scrollHeight + "px" : "0"

		!updated && this.setState({
			opened: !this.state.opened,
			updated: false
		})
	}
	
	render = (): JSX.Element => {
		const props = this.props,
		{ opened, updated } = this.state
		let element: HTMLElement

		if(updated) setTimeout(() => this.toggleAccordion(element, true))
		
		return <div className={"dolfo-accordion" + (opened ? " opened" : "")} style={props.wrapperStyle}>
			<div className="dolfo-accordion-header" onClick={() => this.toggleAccordion(element)}>
				<Icon iconKey="chevron-down" className="accordion-caret" />
				
				<span className="accordion-title">{props.title}</span>
			</div>
			<div className="dolfo-accordion-content" ref={r => element = r}>
				<div className="dolfo-accordion-inner">
					{props.children}
				</div>
			</div>
		</div>
	}

}