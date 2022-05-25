import React from "react"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { Tooltip } from "../layout/Tooltip"
import { blurInput, isElementInViewport, sumParentZIndex, zeroBefore } from "../shared/utility"
import { createRoot } from "react-dom/client"
import _ from "lodash"

export interface TimePickerProps extends ExtendedInputProps{
    readonly defaultValue?: string
    readonly onKeyUpHour?: (e: any) => void
    readonly onKeyUpMinute?: (e: any) => void
    readonly onKeyDownHour?: (e: any) => void
    readonly onKeyDownMinute?: (e: any) => void
    readonly onKeyPressHour?: (e: any) => void
    readonly onKeyPressMinute?: (e: any) => void
}

interface IState{
    readonly value: string
    readonly showTime: boolean
}

class TimePicker extends React.PureComponent<TimePickerProps, IState>{
    private rootContent = document.createElement("div")
    private root = createRoot(this.rootContent)
    private observer: ResizeObserver
    
    constructor(props: TimePickerProps){
        super(props)

        this.state = {
            value: props.defaultValue || (zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes())),
            showTime: false
        }
    }

    componentDidMount = (): void => {
        this.observer = new ResizeObserver(this.positionPicker)
        this.observer.observe(this.rootContent)
        window.addEventListener("scroll", this.positionPicker, true)
    }

    componentDidUpdate = (prevProps: TimePickerProps, prevState: IState) : void=> {
        if(prevProps.defaultValue !== this.props.defaultValue){
            this.setState({
                value: this.props.defaultValue || (zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()))
            })
        }

        if(this.state.showTime !== prevState.showTime){
            if(this.state.showTime)
                this.showPicker()
            else
                this.hidePicker()
        }

        if(!_.isEqual(this.state.value, prevState.value))
            this.showPicker()
    }

    componentWillUnmount = (): void => {
        setTimeout(() => this.root.unmount())
        window.removeEventListener("scroll", this.positionPicker, true)
        this.observer.disconnect()
    }

    changeTime = (): void => !this.props.disabled && this.props.onChange && this.props.onChange(this.state.value)

    changeHour = (e: any): void => {
        const value = parseInt(e.target.value)
        let time = this.state.value

        if(!isNaN(value) && value >= 0 && value <= 23)
            time = zeroBefore(value) + ":" + time.split(":")[1]

        this.setState({ value: time }, this.changeTime)
    }

    changeMinute = (e: any): void => {
        const value = parseInt(e.target.value)
        let time = this.state.value

        if(!isNaN(value) && value >= 0 && value <= 59)
            time = time.split(":")[0] + ":" + zeroBefore(value)

        this.setState({ value: time }, this.changeTime)
    }

    increaseHour = (): void => {
        let hour = parseInt(this.state.value.split(":")[0]) + 1

        if(hour > 23) hour = 0

        this.changeHour({ target: { value: hour }})
    }

    decreaseHour = (): void => {
        let hour = parseInt(this.state.value.split(":")[0]) - 1

        if(hour < 0) hour = 23

        this.changeHour({ target: { value: hour }})
    }

    increaseMinute = (): void => {
        let minute = parseInt(this.state.value.split(":")[1]) + 1

        if(minute > 59) minute = 0

        this.changeMinute({ target: { value: minute }})
    }

    decreaseMinute = (): void => {
        let minute = parseInt(this.state.value.split(":")[1]) - 1

        if(minute < 0) minute = 59

        this.changeMinute({ target: { value: minute }})
    }

    showTime = (): void => this.setState({ showTime: true })

    hideTime = (): void => this.setState({ showTime: false }, blurInput)

    handleClickOutside = (args: any) => {
        if(this.state.showTime && this.rootContent.contains(args.target))
            return
        
        this.hideTime()
    }

    keyDownHour = (e: any): void => {
        if(e.key === 'ArrowUp')
            this.increaseHour()
        else if(e.key === 'ArrowDown')
            this.decreaseHour()
        
        this.props.onKeyDownHour && this.props.onKeyDownHour(e)
    }

    keyDownMinute = (e: any): void => {
        if(e.key === 'ArrowUp')
            this.increaseMinute()
        else if(e.key === 'ArrowDown')
            this.decreaseMinute()

        this.props.onKeyDownMinute && this.props.onKeyDownMinute(e)
    }

    showPicker = (): void => {
        const { showTime, value } = this.state,
        hour = value.split(":")[0],
        minute = value.split(":")[1],
        content = <div className={"dolfo-time-container" + (showTime ? " show" : "")}>
            <div className="dolfo-picker-table">
                <div className="dolfo-picker-row">
                    <Tooltip tooltip={Constants.INCREASE_TEXT}>
                        <div className="dolfo-picker-cell" onClick={this.increaseHour}>
                            <Icon iconKey="caret-up" />
                        </div>
                    </Tooltip>
                    <div className="dolfo-picker-cell-e"></div>
                    <Tooltip tooltip={Constants.INCREASE_TEXT}>
                        <div className="dolfo-picker-cell" onClick={this.increaseMinute}>
                            <Icon iconKey="caret-up" />
                        </div>
                    </Tooltip>
                </div>
                <div className="dolfo-picker-row">
                    <div className="dolfo-picker-cell">
                        <div className="time-display">{hour}</div>
                    </div>
                    <div className="dolfo-picker-cell">:</div>
                    <div className="dolfo-picker-cell">
                        <div className="time-display">{minute}</div>
                    </div>
                </div>
                <div className="dolfo-picker-row">
                    <Tooltip tooltip={Constants.DECREASE_TEXT} placeTooltip="bottom">
                        <div className="dolfo-picker-cell" onClick={this.decreaseHour}>
                            <Icon iconKey="caret-down" />
                        </div>
                    </Tooltip>
                    <div className="dolfo-picker-cell-e"></div>
                    <Tooltip tooltip={Constants.DECREASE_TEXT} placeTooltip="bottom">
                        <div className="dolfo-picker-cell" onClick={this.decreaseMinute}>
                            <Icon iconKey="caret-down" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>

        if(!showTime)
            return

        this.root.render(content)
        setTimeout(this.positionPicker)

        if(!document.body.contains(this.rootContent))
            document.body.appendChild(this.rootContent)
    }

    hidePicker = (): void => this.rootContent.remove()

    positionPicker = (): void => {
        if(!this.state.showTime || !document.body.contains(this.rootContent))
            return

        const node = InputWrapper.findWrapper(this),
        timepicker = this.rootContent.childNodes[0] as HTMLElement,
        { top, left, height } = node.getBoundingClientRect(),
        calendarTime = node.closest(".dolfo-calendar-container")

        if(!timepicker)
            return

        timepicker.style.zIndex = sumParentZIndex(node) + 1 + ""
        timepicker.style.left = left + "px"
        timepicker.style.top = top + height + document.documentElement.scrollTop + 5 + "px"

        if(!isElementInViewport(timepicker)){
            timepicker.style.top = top - timepicker.offsetHeight + document.documentElement.scrollTop - 5 + "px"

            if(!isElementInViewport(node))
                timepicker.classList.remove("show")
            else if(!timepicker.classList.contains("show")){
                timepicker.classList.add("show")
            }
        }else if(!timepicker.classList.contains("show") && isElementInViewport(node) && !calendarTime)
            timepicker.classList.add("show")
    }

    handleTabKey = (e: KeyboardEvent): void => e.key.charCodeAt(0) === 84 && this.hideTime()

    render = (): JSX.Element => {
        const { props } = this,
        { value, showTime } = this.state,
        icon = props.icon || {
            iconKey: "clock",
            type: "far"
        },
        hour = value.split(":")[0],
        minute = value.split(":")[1]

        return <InputWrapper icon={icon} label={props.label} onFocus={this.showTime} focusBool={showTime} disabled={props.disabled} style={props.wrapperStyle} required={props.required} value={value} className={props.className} onKeyDown={this.handleTabKey}>
            <input
                type="text"
                className="dolfo-input-time"
                value={hour}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                onChange={this.changeHour}
                onKeyDown={this.keyDownHour}
                onKeyPress={props.onKeyPressHour}
                onKeyUp={props.onKeyUpHour}
            />

            <input
                type="text"
                className="dolfo-input-time"
                value={minute}
                disabled={props.disabled}
                onChange={this.changeMinute}
                onKeyDown={this.keyDownMinute}
                onKeyPress={props.onKeyPressMinute}
                onKeyUp={props.onKeyUpMinute}
            />
        </InputWrapper>
    }
}

export default onClickOutside(TimePicker)