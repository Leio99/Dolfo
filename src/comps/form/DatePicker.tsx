import React from "react"
import { getCalendar, decodeMonth, zeroBefore, formatDate, blurInput } from "../../commons/utility"
import { Day } from "../../models/IDay"
import { InputProps } from "../shared/models/InputProps"
import { InputWrapper } from "./InputWrapper"
import onClickOutside from "react-onclickoutside"

export interface IProps extends InputProps {
    readonly defaultValue?: Date
}
export interface IState {
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
}

class DatePicker extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        let date = props.defaultValue ? formatDate(props.defaultValue) : "",
        currentDay = props.defaultValue ? props.defaultValue.getDate() : 0,
        currentYear = props.defaultValue ? props.defaultValue.getFullYear() : new Date().getFullYear(),
        currentMonth = props.defaultValue ? props.defaultValue.getMonth() :  new Date().getMonth(),
        currentDecade = parseInt(currentYear.toString().slice(0, -1) + '0')

        this.state = {
            date,
            showCalendar: false,
            selectingMonth: false,
            selectingYear: false,
            currentDecade,
            currentDay,
            currentYear: currentYear,
            currentMonth: currentMonth,
            selectedYear: currentYear,
            selectedMonth: currentMonth
        }
    }

    nextMonth = () => {
        let newMonth,
        newYear = this.state.currentYear

        if (this.state.currentMonth === 11) {
            newMonth = 0
            newYear += 1
        }
        else newMonth = this.state.currentMonth + 1

        this.setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
    }

    prevMonth = () => {
        let newMonth,
        newYear = this.state.currentYear

        if (this.state.currentMonth === 0) {
            newMonth = 11
            newYear -= 1
        }
        else newMonth = this.state.currentMonth - 1

        this.setState({
            currentYear: newYear,
            currentMonth: newMonth
        })
    }

    selectDay = (day: number, month: number = this.state.currentMonth, year: number = this.state.currentYear) => {
        let date = zeroBefore(day) + "-" + zeroBefore(month + 1) + "-" + year

        this.setState({
            showCalendar: false,
            date,
            selectedMonth: month,
            selectedYear: year,
            currentDay: day,
            currentMonth: month,
            currentYear: year
        })

        this.props.onChange && this.props.onChange(date)

        blurInput()
    }

    showCalendar = (    ) => this.setState({ showCalendar: true })

    hideCalendar = () => this.setState({ showCalendar: false })

    changeMonth = () => this.setState({ selectingMonth: true })

    changeYear = () => this.setState({ selectingYear: true })

    prevDecade = () => this.setState({ currentDecade: this.state.currentDecade - 10 })

    nextDecade = () => this.setState({ currentDecade: this.state.currentDecade + 10 })

    isCurrentDay = (day: Day) => {
        const { currentDay, selectedMonth, selectedYear } = this.state

        return day.day === currentDay && day.month === selectedMonth && day.year === selectedYear
    }

    isToday = (day: Day) => {
        let date = new Date()

        return day.day === date.getDate() && day.month === date.getMonth() && day.year === date.getFullYear()
    }

    selectMonth = (month: number) => {
        this.setState({
            selectingMonth: false,
            currentMonth: month
        })
    }

    selectYear = (year: number) => {
        this.setState({
            selectingYear: false,
            currentYear: year,
            currentDecade: parseInt(year.toString().slice(0, -1) + '0')
        })
    }

    resetDate = () => {
        let props = this.props,
        currentDay = props.defaultValue ? props.defaultValue.getDate() : 0,
        currentYear = props.defaultValue ? props.defaultValue.getFullYear() : new Date().getFullYear(),
        currentMonth = props.defaultValue ? props.defaultValue.getMonth() :  new Date().getMonth(),
        currentDecade = parseInt(currentYear.toString().slice(0, -1) + '0')

        this.setState({ 
            date: "",
            currentDecade,
            showCalendar: true,
            currentDay,
            currentYear: currentYear,
            currentMonth: currentMonth,
            selectedYear: currentYear,
            selectedMonth: currentMonth
        })
        
        this.props.onChange && this.props.onChange("")
    }

    chooseToday = () => this.selectDay(new Date().getDate(), new Date().getMonth(), new Date().getFullYear())

    handleClickOutside = () => this.hideCalendar()

    render = (): JSX.Element => {
        const { date, showCalendar, selectingMonth, selectingYear, currentYear, currentMonth, currentDecade } = this.state,
        props = this.props,
        monthCalendar = getCalendar(currentMonth, currentYear),
        icon = props.icon || {
            type: "far",
            iconKey: "calendar-day"
        }

        return <InputWrapper style={props.wrapperStyle} onFocus={this.showCalendar} label={props.label} icon={icon} focusBool={showCalendar} value={date} resetFunction={this.resetDate} disabled={props.disabled} isFocusable>
            <input
                type="text"
                value={date}
                required={props.required}
                readOnly={props.readonly}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                onKeyPress={props.onKeyPress ? props.onKeyPress : null}
                onKeyUp={props.onKeyUp ? props.onKeyUp : null}
                onPaste={this.props.onPaste && this.props.onPaste}
            />
            
            <div className={"dolfo-calendar-container" + (showCalendar ? " show" : "")}>
                {
                    !selectingMonth && !selectingYear && <table className="dolfo-calendar">
                        <thead>
                            <tr>
                                <th className="prev-month" onClick={this.prevMonth}>
                                    <i className="fa fa-chevron-left fa-fw"></i>
                                </th>
                                <th colSpan={3} className="select-month" onClick={this.changeMonth}>
                                    {decodeMonth(currentMonth)}
                                </th>
                                <th colSpan={2} className="select-year" onClick={this.changeYear}>
                                    {currentYear}
                                </th>
                                <th className="next-month" onClick={this.nextMonth}>
                                    <i className="fa fa-chevron-right fa-fw"></i>
                                </th>
                            </tr>

                            <tr>
                                <th>L</th>
                                <th>M</th>
                                <th>M</th>
                                <th>G</th>
                                <th>V</th>
                                <th>S</th>
                                <th>D</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                monthCalendar.map(week => {
                                    return <tr>
                                        {
                                            week.map(day => {
                                                if (day.prevMonth >= 0) {
                                                    return <td className="ext-day" onClick={() => this.selectDay(day.day, day.prevMonth, day.prevYear)}>{day.day}</td>
                                                }

                                                if (day.nextMonth >= 0) {
                                                    return <td className="ext-day" onClick={() => this.selectDay(day.day, day.nextMonth, day.nextYear)}>{day.day}</td>
                                                }

                                                return <td className={this.isCurrentDay(day) ? "selected" : this.isToday(day) ? "today" : ""} onClick={() => this.selectDay(day.day)}>{day.day}</td>
                                            })
                                        }
                                    </tr>
                                })
                            }

                            <tr>
                                <td colSpan={7} onClick={this.chooseToday}>
                                    Oggi
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }

                {
                    selectingMonth && <table className="month-selection">
                        {
                            [[0,1,2],[3,4,5],[6,7,8],[9,10,11]].map(tris => {
                                return <tr>
                                    {
                                        tris.map(month => {
                                            return <td className={"select" + (currentMonth === month ? " selected" : "")} onClick={() => this.selectMonth(month)}>
                                                <span>{decodeMonth(month, true)}</span>
                                            </td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </table>
                }

                {
                    selectingYear && <table className="year-selection">
                        <thead>
                            <tr>
                                <th className="prev-month" onClick={this.prevDecade}>
                                    <i className="fa fa-chevron-left fa-fw"></i>
                                </th>
                                <th>
                                    {currentDecade}
                                </th>
                                <th className="next-month" onClick={this.nextDecade}>
                                    <i className="fa fa-chevron-right fa-fw"></i>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                [[-1, 0, 1],[2,3,4],[5,6,7],[8,9,10]].map(tris => {
                                    return <tr>
                                        {
                                            tris.map(n => {
                                                let year = currentDecade + n

                                                return <td className={"select" + (currentYear === year ? " selected" : "") + (n === -1 || n === 10 ? " ext-year" : "")} onClick={() => this.selectYear(currentDecade + n)}>
                                                    <span>{year}</span>
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </InputWrapper>
    }
}

export default onClickOutside(DatePicker)