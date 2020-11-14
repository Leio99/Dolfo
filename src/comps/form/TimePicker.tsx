import React from "react"
import { zeroBefore } from "../../commons/utility"
import { InputProps } from "../../models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"

export interface IProps extends InputProps{
    readonly defaultValue?: string
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

    handleClickOutside = () => this.hideTime()

    render = (): JSX.Element => {
        const props = this.props,
        { value, showTime } = this.state,
        icon = props.icon || {
            type: "fa",
            key: "clock"
        },
        hour = value.split(":")[0],
        minute = value.split(":")[1]

        return <InputWrapper icon={icon} label={props.label} onFocus={this.showTime} focusBool={showTime} disabled={props.disabled}>
            <input
                type="text"
                className="dolfo-input-time"
                value={hour}
                onChange={this.changeHour}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                onKeyPress={props.onKeyPress ? props.onKeyPress : null}
                onKeyUp={props.onKeyUp ? props.onKeyUp : null}
            />

            <input
                type="text"
                className="dolfo-input-time"
                value={minute}
                onChange={this.changeMinute}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                onKeyPress={props.onKeyPress ? props.onKeyPress : null}
                onKeyUp={props.onKeyUp ? props.onKeyUp : null}
            />

            <div className={"dolfo-time-container" + (showTime ? " show" : "")}>
                <table>
                    <tbody>
                        <tr>
                            <td onClick={this.increaseHour}>
                                <i className="fa fa-caret-up fa-fw"></i>
                            </td>
                            <td></td>
                            <td onClick={this.increaseMinute}>
                                <i className="fa fa-caret-up fa-fw"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="time-display">{hour}</div>
                            </td>
                            <td>:</td>
                            <td>
                                <div className="time-display">{minute}</div>
                            </td>
                        </tr>
                        <tr>
                            <td onClick={this.decreaseHour}>
                                <i className="fa fa-caret-down fa-fw"></i>
                            </td>
                            <td></td>
                            <td onClick={this.decreaseMinute}>
                                <i className="fa fa-caret-down fa-fw"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </InputWrapper>
    }
}

export default onClickOutside(TimePicker)