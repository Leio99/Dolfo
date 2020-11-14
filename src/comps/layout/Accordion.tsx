import React, { CSSProperties } from "react"
import { Icon } from "./Icon"

export interface IProps{
	readonly title: string | JSX.Element
	readonly opened?: boolean
	readonly wrapperStyle?: CSSProperties
}
export interface IState{
	readonly opened: boolean
}

export class Accordion extends React.PureComponent<IProps, IState>{
	constructor(props: IProps){
		super(props)
		
		this.state = {
			opened: props.opened || false
		}
    }
    
    componendDidUpdate = (prevProps: IProps) => {
        if(prevProps.opened !== this.props.opened){
            this.setState({
                opened: this.props.opened || false
            })
        }
    }
	
	toggleAccordion = (element: HTMLElement) => {
		element.style.maxHeight = !this.state.opened ? element.scrollHeight + "px" : "0"

		this.setState({ opened: !this.state.opened })
	}
	
	render = (): JSX.Element => {
		const props = this.props,
		{ opened } = this.state
		let element: HTMLElement
		
		return <div className={"dolfo-accordion" + (opened ? " opened" : "")} style={props.wrapperStyle}>
			<div className="dolfo-accordion-header" onClick={() => this.toggleAccordion(element)}>
				<Icon icon={{ type: "fa", key: "chevron-down" }} className="accordion-caret" />
				
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