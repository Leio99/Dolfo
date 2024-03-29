import React, { CSSProperties, createRef } from "react"
import { getConstant } from "../shared/Constants"
import { EventManager } from "../shared/models/EventManager"
import { Icon } from "./Icon"
import { Tooltip } from "./Tooltip"

interface IProps extends React.PropsWithChildren{
	/** The title of the accordion
	 * @type ReactNode
	 * @required
	 */
	readonly title: React.ReactNode
	/** Defines if the accordion is opened by default
	 * @type boolean
	 */
	readonly opened?: boolean
	/** Additional style for the accordion wrapper
	 * @type CSSProperties
	 */
	readonly wrapperStyle?: CSSProperties
	/** Additional className for the accordion wrapper
	 * @type string
	 */
	readonly wrapperClassName?: string
	/** Additional style for the accordion content
	 * @type CSSProperties
	 */
	readonly style?: CSSProperties
	/** Additional className for the accordion content
	 * @type string
	 */
	readonly className?: string
	/** Defines if the accordion is disabled
	 * @type boolean
	 */
	readonly disabled?: boolean
	/** Function triggered when toggling the accordion
	 * @type Function
	 * @param opened boolean
	 */
	readonly onToggle?: (opened: boolean) => void
}

interface IState{
	readonly opened: boolean
}

export class Accordion extends React.PureComponent<IProps, IState>{
	private ref = createRef<HTMLDivElement>()
	private event: EventManager

	constructor(props: IProps){
		super(props)
		
		this.state = {
			opened: props.opened || false
		}
	}
	
	componentDidMount = (): void => {
		this.handleAccordions(true)
		this.event = new EventManager("resize", this.internalHandler).register()
	}

	componentWillUnmount = (): void => this.event.unregister()
    
  componentDidUpdate = (prevProps: IProps): void => {
		if(prevProps.opened !== this.props.opened)
			this.setState({ opened: this.props.opened || false }, this.handleAccordions)
	}
	
	toggleAccordion = (): void => this.setState({ opened: !this.state.opened }, () => {
		this.handleAccordions()
		
		this.props.onToggle && this.props.onToggle(this.state.opened)
	})

	handleAccordions = (load = false): void => {
		const accordion = this.ref.current,
		content = accordion.children[1] as HTMLElement,
		{ opened } = this.state,
		fn = () => content.style.maxHeight = opened ? content.scrollHeight + "px" : "0"

		if(!opened){
			content.style.maxHeight = content.scrollHeight + "px"
			content.classList.add("closing")
			setTimeout(() => content.classList.remove("closing"))
			accordion.style.overflow = "hidden"
		}

		load ? fn() : setTimeout(fn)

		setTimeout(() => {
			if(opened){
				content.style.maxHeight = "100%"
				accordion.style.overflow = "unset"
			}
		}, 200)
	}

	internalHandler = (): void => this.handleAccordions()
	
	render = (): React.ReactNode => {
		const { props } = this,
		{ opened } = this.state
		
		return <div className={"dolfo-accordion" + (opened ? " opened" : "") + (props.wrapperClassName ? (" " + props.wrapperClassName) : "") + (props.disabled ? " disabled" : "")} style={props.wrapperStyle} ref={this.ref}>
			<Tooltip tooltip={opened ? getConstant("COLLAPSE_TEXT") : getConstant("EXPAND_TEXT")}>
				<div className="dolfo-accordion-header" onClick={this.toggleAccordion}>
					<Icon iconKey="chevron-down" className="accordion-caret" />
					
					<span className="accordion-title">{props.title}</span>
				</div>
			</Tooltip>
			<div className={"dolfo-accordion-content" + (props.className ? (" " + props.className) : "")} style={props.style}>
				<div className="dolfo-accordion-inner">
					{props.children}
				</div>
			</div>
		</div>
	}
}