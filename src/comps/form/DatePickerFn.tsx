import React, { useEffect, useRef, useState } from "react"
import { ICalendarDay } from "../shared/models/ICalendarDay"
import { ExtendedInputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"
import { Icon } from "../layout/Icon"
import { Constants } from "../shared/Constants"
import TimePicker from "./TimePicker"
import { Tooltip } from "../layout/Tooltip"
import { blurInput, zeroBefore, isValidDate, getCalendar, decodeMonth, sumParentZIndex, isElementInViewport } from "../shared/utility"
import { createRoot } from "react-dom/client"

type DateFormats = "dd-mm-YYYY" | "d-m-YYYY" | "mm-dd-YYYY" | "m-d-YYYY" | "YYYY-mm-dd" | "YYYY-m-d"

export interface DatePickerProps extends ExtendedInputProps{
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

export function DatePicker(props: DatePickerProps){
    const icon = props.icon || {
        type: "far",
        iconKey: "calendar-day"
    },
    composeDateFromDefault = (defaultValue: Date): IState => {
        const date = defaultValue ? handleDate(defaultValue.getDate(), defaultValue.getMonth(), defaultValue.getFullYear()) : "",
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
    },
    handleDate = (day: number, month: number, year: number): string => {
        const dateFormat = props.dateFormat

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
    },
    start = composeDateFromDefault(props.defaultValue),
    [state, changeState] = useState<IState>(start),
    setState = (obj: Partial<IState>, callback?: () => void) => {
        changeState({
            ...state,
            ...obj
        })

        callback && callback()
    },
    { date, currentHour, currentDay, currentMinute, showCalendar, currentMonth, currentYear, currentDecade, selectingMonth, selectingYear, selectedMonth, selectedYear } = state,
    showDate = props.selectTime && date ? (date + " " + zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)) : date,
    thisRef = useRef(),
    positionPicker = (): void => {
        if(!showCalendar || !document.body.contains(rootContent))
            return

        const node = InputWrapper.findWrapper(thisRef.current),
        datepicker = rootContent.childNodes[0] as HTMLElement,
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
    },
    doShowCalendar = () => setState({ showCalendar: true }),
    hideCalendar = (): void => {
        setState({ showCalendar: false })
        blurInput()
    },
    handleTabKey = (e: KeyboardEvent): void => e.key.charCodeAt(0) === 84 && hideCalendar(),
    resetDate = (): void => {
        if(props.disabled) return

        const currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth(),
        currentHour = new Date().getHours(),
        currentMinute = new Date().getMinutes(),
        currentDecade = parseInt(currentYear.toString().slice(0, -1) + "0")

        setState({ 
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
        
        props.onChange && props.onChange(null)
    },
    selectDay = (day: number, month: number = currentMonth, year: number = currentYear, blur = true, showCalendar = false): void => {
        if(props.disabled) return
        
        const date = handleDate(day, month, year),
        sendDate = new Date()
        sendDate.setDate(day)
        sendDate.setMonth(month)
        sendDate.setFullYear(year)
        sendDate.setHours(props.selectTime ? currentHour : 0)
        sendDate.setMinutes(props.selectTime ? currentMinute : 0)
        sendDate.setSeconds(0, 0)

        setState({
            showCalendar,
            date,
            selectedMonth: month,
            selectedYear: year,
            currentDay: day,
            currentMonth: month,
            currentYear: year
        })

        props.onChange && props.onChange(sendDate)

        blur && blurInput()
    },
    chooseToday = (): void => selectDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear()),
    handleKeyDown = (e: any): void => {
        if(e.key.toLowerCase() === "d")
            chooseToday()

        props.onKeyDown && props.onKeyDown(e)
    },
    tryChangeDate = (e: any): void => {
        const date = e.target.value.trim(),
        pieces = date.split("-"),
        day = parseInt(pieces[0]),
        month = parseInt(pieces[1]) - 1,
        year = props.selectTime ? parseInt(pieces[2].split(" ")[0]) : parseInt(pieces[2]),
        hour = props.selectTime ? parseInt(date.split(" ")[1].split(":")[0]) : 0,
        minute = props.selectTime ? parseInt(date.split(" ")[1].split(":")[1]) : 0

        if(isValidDate(day, month, year, hour, minute)){
            setState({
                currentHour: hour,
                currentMinute: minute
            })
            selectDay(day, month, year, false)
        }
    },
    changeTime = (time: string): void => {
        const pieces = time.split(":"),
        currentHour = parseInt(pieces[0]),
        currentMinute = parseInt(pieces[1])

        setState({
            currentHour,
            currentMinute
        })
        selectDay(currentDay, currentMonth, currentYear, false, true)
    },
    showPicker = (): void => {
        const monthCalendar = getCalendar(currentMonth, currentYear),
        content = <div className={"dolfo-calendar-container floating-popup" + (showCalendar ? " show" : "") + (props.selectTime ? " time-picker" : "")}>
            {
                !selectingMonth && !selectingYear && <div className="dolfo-calendar">
                    <div className="dolfo-calendar-row">
                        <Tooltip tooltip={Constants.PREV_TEXT}>
                            <div className="prev-month dolfo-calendar-cell-h" onClick={prevMonth}>
                                <Icon iconKey="chevron-left" />
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.CHANGE_MONTH}>
                            <div className="select-month dolfo-calendar-cell-h" onClick={changeMonth}>
                                {decodeMonth(currentMonth)}
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.CHANGE_YEAR}>
                            <div className="select-year dolfo-calendar-cell-h" onClick={changeYear}>
                                {currentYear}
                            </div>
                        </Tooltip>
                        <Tooltip tooltip={Constants.NEXT_TEXT}>
                            <div className="next-month dolfo-calendar-cell-h" onClick={nextMonth}>
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
                                            return <div className="ext-day dolfo-calendar-cell" onClick={() => selectDay(day.day, day.prevMonth, day.prevYear)} key={day.day}>{day.day}</div>
                                        }

                                        if (day.nextMonth >= 0) {
                                            return <div className="ext-day dolfo-calendar-cell" onClick={() => selectDay(day.day, day.nextMonth, day.nextYear)} key={day.day}>{day.day}</div>
                                        }

                                        return <div className={"dolfo-calendar-cell" + (isCurrentDay(day) ? " selected" : isToday(day) ? " today" : "")} onClick={() => selectDay(day.day)} key={day.day}>{day.day}</div>
                                    })
                                }
                            </div>
                        })
                    }

                    <div className="dolfo-calendar-row">
                        <div className="dolfo-calendar-cell select-today" onClick={chooseToday}>
                            Oggi
                        </div>
                    </div>

                    {
                        props.selectTime && <div className="dolfo-calendar-time-picker">
                            <TimePicker defaultValue={zeroBefore(currentHour) + ":" + zeroBefore(currentMinute)} onChange={changeTime} />
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
                                        return <div className={"dolfo-calendar-cell select" + (currentMonth === month ? " selected" : "")} onClick={() => selectMonth(month)} key={month}>
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
                            <div className="prev-month dolfo-calendar-cell-h" onClick={prevDecade}>
                                <span><Icon iconKey="chevron-left" /></span>
                            </div>
                        </Tooltip>
                        <div className="dolfo-calendar-cell-h">
                            <span>{currentDecade}</span>
                        </div>
                        <Tooltip tooltip={Constants.NEXT_TEXT}>
                            <div className="next-month dolfo-calendar-cell-h" onClick={nextDecade}>
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

                                        return <div className={"dolfo-calendar-cell select" + (currentYear === year ? " selected" : "") + (n === -1 || n === 10 ? " ext-year" : "")} onClick={() => selectYear(currentDecade + n)} key={n}>
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

        root.render(content)
        setTimeout(positionPicker)

        if(!document.body.contains(rootContent))
            document.body.appendChild(rootContent)
    },
    hidePicker = (): void => rootContent.remove(),
    nextMonth = (): void => {
        let newMonth,
        newYear = currentYear

        if (currentMonth === 11) {
            newMonth = 0
            newYear += 1
        }else
            newMonth = currentMonth + 1

        setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
        showPicker()
    },
    prevMonth = (): void => {
        let newMonth,
        newYear = currentYear

        if (currentMonth === 0) {
            newMonth = 11
            newYear -= 1
        }else
            newMonth = currentMonth - 1

        setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
        showPicker()
    },
    changeMonth = (): void => setState({ selectingMonth: true }, showPicker),
    changeYear = (): void => setState({ selectingYear: true }, showPicker),
    prevDecade = (): void => setState({ currentDecade: currentDecade - 10 }, showPicker),
    nextDecade = (): void => setState({ currentDecade: currentDecade + 10 }, showPicker),
    isCurrentDay = (day: ICalendarDay): boolean => day.day === currentDay && day.month === selectedMonth && day.year === selectedYear,
    isToday = (day: ICalendarDay): boolean => {
        const date = new Date()

        return day.day === date.getDate() && day.month === date.getMonth() && day.year === date.getFullYear()
    },
    selectMonth = (month: number): void => setState({
        selectingMonth: false,
        currentMonth: month
    }, showPicker),
    selectYear = (year: number): void => setState({
        selectingYear: false,
        currentYear: year,
        currentDecade: parseInt(year.toString().slice(0, -1) + "0")
    }, showPicker),
    handleClickOutside = (args: any) => {
        if(showCalendar && rootContent.contains(args.target))
            return
    
        const timePicker = document.querySelector(".dolfo-time-container")
    
        if(timePicker && timePicker.contains(args.target))
            return
        
        hideCalendar()
    }

    let observer: ResizeObserver,
    rootContent = document.createElement("div"),
    root = createRoot(rootContent)

    useEffect(() => {
        observer = new ResizeObserver(positionPicker)
        observer.observe(rootContent)
        window.addEventListener("scroll", positionPicker, true)
        window.addEventListener("click", handleClickOutside)

        return () => {
            setTimeout(() => root.unmount())
            window.removeEventListener("scroll", positionPicker, true)
            window.removeEventListener("click", handleClickOutside)
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        setState(composeDateFromDefault(props.defaultValue))
    }, [props.defaultValue])

    useEffect(() => {
        showPicker()
    }, [date])

    useEffect(() => {
        if(showCalendar)
            showPicker()
        else
            hidePicker()
    }, [showCalendar])

    return <InputWrapper style={props.wrapperStyle} onFocus={doShowCalendar} label={props.label} icon={icon} focusBool={showCalendar} value={date} resetFunction={resetDate} disabled={props.disabled} onKeyDown={handleTabKey} required={props.required} className={props.className} ref={thisRef}>
        <input
            type="text"
            value={showDate}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            required={props.required}
            onChange={tryChangeDate}
            onPaste={props.onPaste}
            onKeyDown={handleKeyDown}
            onKeyPress={props.onKeyPress}
            onKeyUp={props.onKeyUp}
        />
    </InputWrapper>
}

export default DatePicker