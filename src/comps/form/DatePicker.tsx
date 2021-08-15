import React from "react"
import { getCalendar, decodeMonth, zeroBefore, blurInput, isValidDate } from "../shared/utility"
import { ICalendarDay } from "../shared/models/ICalendarDay"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import TimePicker from "./TimePicker"
import _ from "lodash"

type DateFormats = "dd-mm-YYYY" | "d-m-YYYY" | "mm-dd-YYYY" | "m-d-YYYY" | "YYYY-mm-dd" | "YYYY-m-d"

interface IProps extends ExtendedInputProps{
    readonly defaultValue?: Date
    readonly dateFormat?: DateFormats
    readonly selectTime?: boolean
    readonly showOnTop?: boolean
}

interface IState {
    readonly date: string
    readonly selectingYear: boolean
    readonly selectingMonth: boolean
    readonly currentDecade: number
    readonly currentYear: number
    readonly currentMonth: number
    readonly currentDay: number
    readonly showCalendar: boolean
    readonly selectedMonth: number
    readonly selectedYear: number
    readonly currentHour: number
    readonly currentMinute: number
}

class DatePicker extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = this.composeDateFromDefault(props.defaultValue)
    }

    composeDateFromDefault = (defaultValue: Date): IState => {
        const date = defaultValue ? this.handleDate(defaultValue.getDate(), defaultValue.getMonth(), defaultValue.getFullYear()) : "",
        currentDay = defaultValue ? defaultValue.getDate() : new Date().getDate(),
        currentYear = defaultValue ? defaultValue.getFullYear() : new Date().getFullYear(),
        currentMonth = defaultValue ? defaultValue.getMonth() :  new Date().getMonth(),
        currentHour = defaultValue ? defaultValue.getHours() :  new Date().getHours(),
        currentMinute = defaultValue ? defaultValue.getMinutes() :  new Date().getMinutes(),
        currentDecade = parseInt(currentYear.toString().slice(0, -1) + "0"),
        newState = {
            date,
            showCalendar: false,
            selectingMonth: false,
            selectingYear: false,
            currentDecade,
            currentDay,
            currentYear: currentYear,
            currentMonth: currentMonth,
            selectedYear: currentYear,
            selectedMonth: currentMonth,
            currentHour,
            currentMinute
        }

        return newState
    }

    componentDidUpdate = (prevProps: IProps): void => {
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.setState(this.composeDateFromDefault(this.props.defaultValue))
    }

    nextMonth = (): void => {
        let newMonth,
        newYear = this.state.currentYear

        if (this.state.currentMonth === 11) {
            newMonth = 0
            newYear += 1
        }else
            newMonth = this.state.currentMonth + 1

        this.setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
    }

    prevMonth = (): void => {
        let newMonth,
        newYear = this.state.currentYear

        if (this.state.currentMonth === 0) {
            newMonth = 11
            newYear -= 1
        }else
            newMonth = this.state.currentMonth - 1

        this.setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
    }

    selectDay = (day: number, month: number = this.state.currentMonth, year: number = this.state.currentYear, blur = true, showCalendar = false): void => {
        const date = this.handleDate(day, month, year),
        sendDate = new Date()
        sendDate.setDate(day)
        sendDate.setMonth(month)
        sendDate.setFullYear(year)
        sendDate.setHours(this.props.selectTime ? this.state.currentHour : 0)
        sendDate.setMinutes(this.props.selectTime ? this.state.currentMinute : 0)
        sendDate.setSeconds(0)
        sendDate.setMilliseconds(0)

        this.setState({
            showCalendar,
            date,
            selectedMonth: month,
            selectedYear: year,
            currentDay: day,
            currentMonth: month,
            currentYear: year
        })

        this.props.onChange && this.props.onChange(sendDate)

        blur && blurInput()
    }

    handleDate = (day: number, month: number, year: number): string => {
        const dateFormat = this.props.dateFormat

        switch(dateFormat){
            case "d-m-YYYY":
                return day + "-" + (month + 1) + "-" + year
            case "mm-dd-YYYY":
                return zeroBefore(month + 1) + "-" + zeroBefore(day) + "-" + year
            case "m-d-YYYY":
                return (month + 1) + "-" + day + "-" + year
            case "YYYY-mm-dd":
                return year + "-" + zeroBefore(month + 1) + "-" + zeroBefore(day)
            case "YYYY-m-d":
                return year + "-" + (month + 1) + "-" + day
            default:
                return zeroBefore(day) + "-" + zeroBefore(month + 1) + "-" + year
        }
    }

    showCalendar = (): void => this.setState({ showCalendar: true })

    hideCalendar = (): void => this.setState({ showCalendar: false })

    changeMonth = (): void => this.setState({ selectingMonth: true })

    changeYear = (): void => this.setState({ selectingYear: true })

    prevDecade = (): void => this.setState({ currentDecade: this.state.currentDecade - 10 })

    nextDecade = (): void => this.setState({ currentDecade: this.state.currentDecade + 10 })

    isCurrentDay = (day: ICalendarDay): boolean => {
        const { currentDay, selectedMonth, selectedYear } = this.state

        return day.day === currentDay && day.month === selectedMonth && day.year === selectedYear
    }

    isToday = (day: ICalendarDay): boolean => {
        const date = new Date()

        return day.day === date.getDate() && day.month === date.getMonth() && day.year === date.getFullYear()
    }

    selectMonth = (month: number): void => {
        this.setState({
            selectingMonth: false,
            currentMonth: month
        })
    }

    selectYear = (year: number): void => {
        this.setState({
            selectingYear: false,
            currentYear: year,
            currentDecade: parseInt(year.toString().slice(0, -1) + "0")
        })
    }

    resetDate = (): void => {
        const currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth(),
        currentHour = new Date().getHours(),
        currentMinute = new Date().getMinutes(),
        currentDecade = parseInt(currentYear.toString().slice(0, -1) + "0")

        this.setState({ 
            date: "",
            currentDecade,
            showCalendar: true,
            currentDay: null,
            currentYear: currentYear,
            currentMonth: currentMonth,
            selectedYear: currentYear,
            selectedMonth: currentMonth,
            currentHour,
            currentMinute
        })
        
        this.props.onChange && this.props.onChange(null)
    }

    chooseToday = (): void => this.selectDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear())

    handleClickOutside: () => void = this.hideCalendar

    handleTabKey = (e: KeyboardEvent): void => e.key.charCodeAt(0) === 84 && this.hideCalendar()

    tryChangeDate = (e: any): void => {
        const date = e.target.value.trim(),
        pieces = date.split("-"),
        day = parseInt(pieces[0]),
        month = parseInt(pieces[1]) - 1,
        year = this.props.selectTime ? parseInt(pieces[2].split(" ")[0]) : parseInt(pieces[2]),
        hour = this.props.selectTime ? parseInt(date.split(" ")[1].split(":")[0]) : 0,
        minute = this.props.selectTime ? parseInt(date.split(" ")[1].split(":")[1]) : 0

        if(isValidDate(day, month, year, hour, minute)){
            this.setState({
                currentHour: hour,
                currentMinute: minute
            }, () => this.selectDay(day, month, year, false))
        }
    }

    changeTime = (time: string): void => {
        const pieces = time.split(":"),
        currentHour = parseInt(pieces[0]),
        currentMinute = parseInt(pieces[1])

        this.setState({
            currentHour,
            currentMinute
        }, () => this.selectDay(this.state.currentDay, this.state.currentMonth, this.state.currentYear, false, true))
    }

    render = (): JSX.Element => {
        const { date, showCalendar, selectingMonth, selectingYear, currentYear, currentMonth, currentDecade, currentHour, currentMinute } = this.state,
        props = this.props,
        monthCalendar = getCalendar(currentMonth, currentYear),
        icon = props.icon || {
            type: "far",
            iconKey: "calendar-day"
        },
        showDate = props.selectTime && date ? (date + " " + zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)) : date

        return <InputWrapper style={props.wrapperStyle} onFocus={this.showCalendar} label={props.label} icon={icon} focusBool={showCalendar} value={date} resetFunction={this.resetDate} disabled={props.disabled} onKeyDown={this.handleTabKey} required={props.required} className={props.className}>
            <input
                type="text"
                value={showDate}
                autoFocus={props.autoFocus}
                required={props.required}
                onChange={this.tryChangeDate}
                onPaste={props.onPaste}
                onKeyDown={props.onKeyDown}
                onKeyPress={props.onKeyPress}
                onKeyUp={props.onKeyUp}
            />
            
            <div className={"dolfo-calendar-container" + (props.showOnTop ? " top" : "") + (showCalendar ? " show" : "") + (props.selectTime ? " time-picker" : "")}>
                {
                    !selectingMonth && !selectingYear && <div className="dolfo-calendar">
                        <div className="dolfo-calendar-row">
                            <div className="prev-month dolfo-calendar-cell-h" onClick={this.prevMonth} data-tooltip={Constants.PREV_TEXT}>
                                <Icon iconKey="chevron-left" />
                            </div>
                            <div className="select-month dolfo-calendar-cell-h" onClick={this.changeMonth} data-tooltip={Constants.CHANGE_MONTH}>
                                {decodeMonth(currentMonth)}
                            </div>
                            <div className="select-year dolfo-calendar-cell-h" onClick={this.changeYear} data-tooltip={Constants.CHANGE_YEAR}>
                                {currentYear}
                            </div>
                            <div className="next-month dolfo-calendar-cell-h" onClick={this.nextMonth} data-tooltip={Constants.NEXT_TEXT}>
                                <Icon iconKey="chevron-right" />
                            </div>
                        </div>

                        <div className="dolfo-calendar-row">
                            <div className="dolfo-calendar-cell-h">L</div>
                            <div className="dolfo-calendar-cell-h">M</div>
                            <div className="dolfo-calendar-cell-h">M</div>
                            <div className="dolfo-calendar-cell-h">G</div>
                            <div className="dolfo-calendar-cell-h">V</div>
                            <div className="dolfo-calendar-cell-h">S</div>
                            <div className="dolfo-calendar-cell-h">D</div>
                        </div>

                        {
                            monthCalendar.map(week => {
                                return <div className="dolfo-calendar-row">
                                    {
                                        week.map(day => {
                                            if (day.prevMonth >= 0) {
                                                return <div className="ext-day dolfo-calendar-cell" onClick={() => this.selectDay(day.day, day.prevMonth, day.prevYear)}>{day.day}</div>
                                            }

                                            if (day.nextMonth >= 0) {
                                                return <div className="ext-day dolfo-calendar-cell" onClick={() => this.selectDay(day.day, day.nextMonth, day.nextYear)}>{day.day}</div>
                                            }

                                            return <div className={"dolfo-calendar-cell" + (this.isCurrentDay(day) ? " selected" : this.isToday(day) ? " today" : "")} onClick={() => this.selectDay(day.day)}>{day.day}</div>
                                        })
                                    }
                                </div>
                            })
                        }

                        <div className="dolfo-calendar-row">
                            <div className="dolfo-calendar-cell select-today" onClick={this.chooseToday}>
                                Oggi
                            </div>
                        </div>

                        {
                            props.selectTime && <div className="dolfo-calendar-time-picker">
                                <TimePicker defaultValue={zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)} onChange={this.changeTime} />
                            </div>
                        }
                    </div>
                }

                {
                    selectingMonth && <div className="month-selection">
                        {
                            [[0,1,2],[3,4,5],[6,7,8],[9,10,11]].map(tris => {
                                return <div className="dolfo-calendar-row">
                                    {
                                        tris.map(month => {
                                            return <div className={"dolfo-calendar-cell select" + (currentMonth === month ? " selected" : "")} onClick={() => this.selectMonth(month)}>
                                                <span>{decodeMonth(month, true)}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                }

                {
                    selectingYear && <div className="year-selection">
                        <div className="dolfo-calendar-row">
                            <div className="prev-month dolfo-calendar-cell-h" onClick={this.prevDecade} data-tooltip={Constants.PREV_TEXT}>
                                <span><Icon iconKey="chevron-left" /></span>
                            </div>
                            <div className="dolfo-calendar-cell-h">
                                <span>{currentDecade}</span>
                            </div>
                            <div className="next-month dolfo-calendar-cell-h" onClick={this.nextDecade} data-tooltip={Constants.NEXT_TEXT}>
                                <span><Icon iconKey="chevron-right" /></span>
                            </div>
                        </div>

                        {
                            [[-1, 0, 1],[2,3,4],[5,6,7],[8,9,10]].map(tris => {
                                return <div className="dolfo-calendar-row">
                                    {
                                        tris.map(n => {
                                            const year = currentDecade + n

                                            return <div className={"dolfo-calendar-cell select" + (currentYear === year ? " selected" : "") + (n === -1 || n === 10 ? " ext-year" : "")} onClick={() => this.selectYear(currentDecade + n)}>
                                                <span>{year}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </InputWrapper>
    }
}

export default onClickOutside(DatePicker)