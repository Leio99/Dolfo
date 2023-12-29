import React, { createRef } from "react"
import { ICalendarDay } from "../shared/models/ICalendarDay"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import TimePicker from "./TimePicker"
import _ from "lodash"
import { Tooltip } from "../layout/Tooltip"
import { blurInput, zeroBefore, isValidDate, getCalendar, decodeMonth, sumParentZIndex, isElementInViewport } from "../shared/utility"
import { createRoot } from "react-dom/client"

type DateFormats = "dd-mm-YYYY" | "d-m-YYYY" | "mm-dd-YYYY" | "m-d-YYYY" | "YYYY-mm-dd" | "YYYY-m-d"

export interface DatePickerProps extends ExtendedInputProps{
    readonly placeHolder?: string
    readonly defaultValue?: Date
    readonly dateFormat?: DateFormats
    readonly selectTime?: boolean
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

class DatePicker extends React.PureComponent<DatePickerProps, IState>{
    private rootContent = document.createElement("div")
    private root = createRoot(this.rootContent)
    private wrapperRef = createRef<InputWrapper>()
    
    constructor(props: DatePickerProps) {
        super(props)

        this.state = this.composeDateFromDefault(props.defaultValue)
    }

    componentDidMount = (): void => {
        window.addEventListener("resize", this.positionPicker, true)
        window.addEventListener("scroll", this.positionPicker, true)
    }

    componentDidUpdate = (prevProps: DatePickerProps, prevState: IState): void => {
        if(!_.isEqual(prevProps.defaultValue, this.props.defaultValue))
            this.setState(this.composeDateFromDefault(this.props.defaultValue))

        if(this.state.showCalendar !== prevState.showCalendar){
            if(this.state.showCalendar)
                this.showPicker()
            else
                this.hidePicker()
        }

        if(!_.isEqual(this.state.date, prevState.date))
            this.showPicker()
    }

    componentWillUnmount = (): void => {
        setTimeout(() => this.root.unmount())
        window.removeEventListener("scroll", this.positionPicker, true)
        window.removeEventListener("resize", this.positionPicker, true)
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
        }, this.showPicker)
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
        }, this.showPicker)
    }

    selectDay = (day: number, month: number = this.state.currentMonth, year: number = this.state.currentYear, blur = true, showCalendar = false): void => {
        if(this.props.disabled) return
        
        const date = this.handleDate(day, month, year),
        sendDate = new Date()
        sendDate.setDate(day)
        sendDate.setMonth(month)
        sendDate.setFullYear(year)
        sendDate.setHours(this.props.selectTime ? this.state.currentHour : 0)
        sendDate.setMinutes(this.props.selectTime ? this.state.currentMinute : 0)
        sendDate.setSeconds(0, 0)

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

    hideCalendar = (): void => this.setState({ showCalendar: false }, blurInput)

    changeMonth = (): void => this.setState({ selectingMonth: true }, this.showPicker)

    changeYear = (): void => this.setState({ selectingYear: true }, this.showPicker)

    prevDecade = (): void => this.setState({ currentDecade: this.state.currentDecade - 10 }, this.showPicker)

    nextDecade = (): void => this.setState({ currentDecade: this.state.currentDecade + 10 }, this.showPicker)

    isCurrentDay = (day: ICalendarDay): boolean => {
        const { currentDay, selectedMonth, selectedYear } = this.state

        return day.day === currentDay && day.month === selectedMonth && day.year === selectedYear
    }

    isToday = (day: ICalendarDay): boolean => {
        const date = new Date()

        return day.day === date.getDate() && day.month === date.getMonth() && day.year === date.getFullYear()
    }

    selectMonth = (month: number): void => this.setState({
        selectingMonth: false,
        currentMonth: month
    }, this.showPicker)

    selectYear = (year: number): void => this.setState({
        selectingYear: false,
        currentYear: year,
        currentDecade: parseInt(year.toString().slice(0, -1) + "0")
    }, this.showPicker)

    resetDate = (): void => {
        if(this.props.disabled) return

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

    handleClickOutside = (args: any) => {
        if(this.state.showCalendar && this.rootContent.contains(args.target))
            return

        const timePicker = document.querySelector(".dolfo-time-container")

        if(timePicker && timePicker.contains(args.target))
            return
        
        this.hideCalendar()
    }

    handleTabKey = (e: React.KeyboardEvent): void => e.key.charCodeAt(0) === 84 && this.hideCalendar()

    tryChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

    handleKeyDown = (e: React.KeyboardEvent): void => {
        if(e.key.toLowerCase() === "d")
            this.chooseToday()

        this.props.onKeyDown && this.props.onKeyDown(e)
    }

    showPicker = (): void => {
        const { selectingMonth, selectingYear, currentMonth, showCalendar, currentYear, currentHour, currentMinute, currentDecade } = this.state,
        monthCalendar = getCalendar(currentMonth, currentYear),
        { selectTime } = this.props,
        content = <div className={"dolfo-calendar-container floating-popup" + (showCalendar ? " show" : "") + (selectTime ? " time-picker" : "")}>
            {
                !selectingMonth && !selectingYear && <div className="dolfo-calendar">
                    <div className="dolfo-calendar-row">
                        <Tooltip tooltip={Constants.PREV_TEXT}>
                            <div className="prev-month dolfo-calendar-cell-h" onClick={this.prevMonth}>
                                <Icon iconKey="chevron-left" />
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.CHANGE_MONTH}>
                            <div className="select-month dolfo-calendar-cell-h" onClick={this.changeMonth}>
                                {decodeMonth(currentMonth)}
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.CHANGE_YEAR}>
                            <div className="select-year dolfo-calendar-cell-h" onClick={this.changeYear}>
                                {currentYear}
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.NEXT_TEXT}>
                            <div className="next-month dolfo-calendar-cell-h" onClick={this.nextMonth}>
                                <Icon iconKey="chevron-right" />
                            </div>
                        </Tooltip>
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
                        monthCalendar.map((week, i) => {
                            return <div className="dolfo-calendar-row" key={i}>
                                {
                                    week.map(day => {
                                        if (day.prevMonth >= 0) {
                                            return <div className="ext-day dolfo-calendar-cell" onClick={() => this.selectDay(day.day, day.prevMonth, day.prevYear)} key={day.day}>{day.day}</div>
                                        }

                                        if (day.nextMonth >= 0) {
                                            return <div className="ext-day dolfo-calendar-cell" onClick={() => this.selectDay(day.day, day.nextMonth, day.nextYear)} key={day.day}>{day.day}</div>
                                        }

                                        return <div className={"dolfo-calendar-cell" + (this.isCurrentDay(day) ? " selected" : this.isToday(day) ? " today" : "")} onClick={() => this.selectDay(day.day)} key={day.day}>{day.day}</div>
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
                        selectTime && <div className="dolfo-calendar-time-picker">
                            <TimePicker defaultValue={zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)} onChange={this.changeTime} />
                        </div>
                    }
                </div>
            }

            {
                selectingMonth && <div className="month-selection">
                    {
                        [[0,1,2],[3,4,5],[6,7,8],[9,10,11]].map((tris, i) => {
                            return <div className="dolfo-calendar-row" key={i}>
                                {
                                    tris.map(month => {
                                        return <div className={"dolfo-calendar-cell select" + (currentMonth === month ? " selected" : "")} onClick={() => this.selectMonth(month)} key={month}>
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
                        <Tooltip tooltip={Constants.PREV_TEXT}>
                            <div className="prev-month dolfo-calendar-cell-h" onClick={this.prevDecade}>
                                <span><Icon iconKey="chevron-left" /></span>
                            </div>
                        </Tooltip>
                        <div className="dolfo-calendar-cell-h">
                            <span>{currentDecade}</span>
                        </div>
                        <Tooltip tooltip={Constants.NEXT_TEXT}>
                            <div className="next-month dolfo-calendar-cell-h" onClick={this.nextDecade}>
                                <span><Icon iconKey="chevron-right" /></span>
                            </div>
                        </Tooltip>
                    </div>

                    {
                        [[-1, 0, 1],[2,3,4],[5,6,7],[8,9,10]].map((tris, i) => {
                            return <div className="dolfo-calendar-row" key={i}>
                                {
                                    tris.map(n => {
                                        const year = currentDecade + n

                                        return <div className={"dolfo-calendar-cell select" + (currentYear === year ? " selected" : "") + (n === -1 || n === 10 ? " ext-year" : "")} onClick={() => this.selectYear(currentDecade + n)} key={n}>
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

        if(!showCalendar)
            return

        this.root.render(content)
        setTimeout(this.positionPicker)

        if(!document.body.contains(this.rootContent))
            document.body.appendChild(this.rootContent)
    }

    hidePicker = (): void => this.rootContent.remove()

    positionPicker = (): void => {
        if(!this.state.showCalendar || !document.body.contains(this.rootContent))
            return

        const node = this.wrapperRef.current.getRef(),
        datepicker = this.rootContent.childNodes[0] as HTMLElement,
        { top, left, height } = node.getBoundingClientRect(),
        timePicker = document.querySelector(".dolfo-time-container")

        if(!datepicker)
            return
        
        datepicker.style.left = left + "px"
        datepicker.style.zIndex = sumParentZIndex(node) + 1 + ""
        datepicker.style.top = top + height + document.documentElement.scrollTop + 5 + "px"

        if(!isElementInViewport(datepicker)){
            datepicker.style.top = top - datepicker.offsetHeight + document.documentElement.scrollTop - 5 + "px"

            if(!isElementInViewport(node)){
                datepicker.classList.remove("show")
                timePicker?.classList.remove("show")
            }else if(!datepicker.classList.contains("show") || (timePicker && !timePicker.classList.contains("show"))){
                datepicker.classList.add("show")
                timePicker?.classList.add("show")
            }
        }else if((!datepicker.classList.contains("show") || (timePicker && !timePicker.classList.contains("show"))) && isElementInViewport(node)){
            datepicker.classList.add("show")
            timePicker?.classList.add("show")
        }
    }

    render = (): React.ReactNode => {
        const { date, showCalendar, currentHour, currentMinute } = this.state,
        props = this.props,
        icon = props.icon || {
            type: "far",
            iconKey: "calendar-day"
        },
        showDate = props.selectTime && date ? (date + " " + zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)) : date

        return <InputWrapper style={props.wrapperStyle} onFocus={this.showCalendar} label={props.label} icon={icon} focusBool={showCalendar} value={date} resetFunction={this.resetDate} disabled={props.disabled} onKeyDown={this.handleTabKey} required={props.required} className={props.className} ref={this.wrapperRef}>
            <input
                type="text"
                value={showDate}
                placeholder={props.placeHolder}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                required={props.required}
                onChange={this.tryChangeDate}
                onPaste={props.onPaste}
                onKeyDown={this.handleKeyDown}
                onKeyPress={props.onKeyPress}
                onKeyUp={props.onKeyUp}
            />
        </InputWrapper>
    }
}

export default onClickOutside(DatePicker)