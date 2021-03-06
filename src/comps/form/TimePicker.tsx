import React from "react"
import { InputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import { zeroBefore } from "../shared/utility"

export interface IProps extends InputProps{
    readonly defaultValue?: string
    readonly onKeyUpHour?: (e: any) => void
    readonly onKeyUpMinute?: (e: any) => void
    readonly onKeyDownHour?: (e: any) => void
    readonly onKeyDownMinute?: (e: any) => void
    readonly onKeyPressHour?: (e: any) => void
    readonly onKeyPressMinute?: (e: any) => void
}
export interface IState{
    readonly value: string
    readonly showTime: boolean
}

class TimePicker extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            value: props.defaultValue || (zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes())),
            showTime: false
        }
    }

    componentDidUpdate = (prevProps: IProps) => {
        if(prevProps.defaultValue !== this.props.defaultValue){
            this.setState({
                value: this.props.defaultValue || (zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()))
            })
        }
    }

    changeTime = () => this.props.onChange && this.props.onChange(this.state.value)

    changeHour = (e: any) => {
        let value = parseInt(e.target.value),
        time = this.state.value

        if(!isNaN(value) && value >= 0 && value <= 23){
            time = zeroBefore(value) + ":" + time.split(":")[1]
        }

        this.setState({ value: time }, this.changeTime)
    }

    changeMinute = (e: any) => {
        let value = parseInt(e.target.value),
        time = this.state.value

        if(!isNaN(value) && value >= 0 && value <= 59){
            time = time.split(":")[0] + ":" + zeroBefore(value)
        }

        this.setState({ value: time }, this.changeTime)
    }

    increaseHour = () => {
        let hour = parseInt(this.state.value.split(":")[0]) + 1

        if(hour > 23) hour = 0

        this.changeHour({ target: { value: hour }})
    }

    decreaseHour = () => {
        let hour = parseInt(this.state.value.split(":")[0]) - 1

        if(hour < 0) hour = 23

        this.changeHour({ target: { value: hour }})
    }

    increaseMinute = () => {
        let minute = parseInt(this.state.value.split(":")[1]) + 1

        if(minute > 59) minute = 0

        this.changeMinute({ target: { value: minute }})
    }

    decreaseMinute = () => {
        let minute = parseInt(this.state.value.split(":")[1]) - 1

        if(minute < 0) minute = 59

        this.changeMinute({ target: { value: minute }})
    }

    showTime = () => this.setState({ showTime: true })

    hideTime = () => this.setState({ showTime: false })

    handleClickOutside = this.hideTime

    keyDownHour = (e: any) => {
        if(e.key === 'ArrowUp')
            this.increaseHour()
        else if(e.key === 'ArrowDown')
            this.decreaseHour()
        
        this.props.onKeyDownHour && this.props.onKeyDownHour(e)
    }

    keyDownMinute = (e: any) => {
        if(e.key === 'ArrowUp')
            this.increaseMinute()
        else if(e.key === 'ArrowDown')
            this.decreaseMinute()

        this.props.onKeyDownMinute && this.props.onKeyDownMinute(e)
    }

    render = (): JSX.Element => {
        const props = this.props,
        { value, showTime } = this.state,
        icon = props.icon || {
            iconKey: "clock"
        },
        hour = value.split(":")[0],
        minute = value.split(":")[1]

        return <InputWrapper icon={icon} label={props.label} onFocus={this.showTime} focusBool={showTime} disabled={props.disabled} style={props.wrapperStyle} required={props.required} value={value} className={props.className} onBlur={this.hideTime}>
            <input
                type="text"
                className="dolfo-input-time"
                value={hour}
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
                onChange={this.changeMinute}
                onKeyDown={this.keyDownMinute}
                onKeyPress={props.onKeyPressMinute}
                onKeyUp={props.onKeyUpMinute}
            />

            <div className={"dolfo-time-container" + (showTime ? " show" : "")}>
                <div className="dolfo-picker-table">
                    <div className="dolfo-picker-row">
                        <div className="dolfo-picker-cell" onClick={this.increaseHour} data-tooltip={Constants.INCREASE_TEXT}>
                            <Icon iconKey="caret-up" />
                        </div>
                        <div className="dolfo-picker-cell-e"></div>
                        <div className="dolfo-picker-cell" onClick={this.increaseMinute} data-tooltip={Constants.INCREASE_TEXT}>
                            <Icon iconKey="caret-up" />
                        </div>
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
                        <div className="dolfo-picker-cell" onClick={this.decreaseHour} data-tooltip={Constants.DECREASE_TEXT}>
                            <Icon iconKey="caret-down" />
                        </div>
                        <div className="dolfo-picker-cell-e"></div>
                        <div className="dolfo-picker-cell" onClick={this.decreaseMinute} data-tooltip={Constants.DECREASE_TEXT}>
                            <Icon iconKey="caret-down" />
                        </div>
                    </div>
                </div>
            </div>
        </InputWrapper>
    }
}

export default onClickOutside(TimePicker)
