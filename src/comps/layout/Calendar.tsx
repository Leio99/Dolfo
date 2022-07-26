import React from "react"
import { decodeMonth, getCalendar, getTime } from "../shared/utility"
import { CalendarEvent, GoogleCalendarEvent } from "../shared/models/CalendarEvent"
import Button from "./Button"
import { openDialog, openInfoDialog } from "./Dialog"
import { Icon } from "./Icon"
import { Constants } from "../shared/Constants"
import Select from "../form/Select"
import { Option } from "../form/Option"
import { Tooltip } from "./Tooltip"

interface IProps{
    readonly calendarId: string
    readonly apiKey: string
    readonly onEventClick?: (e: CalendarEvent, isPrev: boolean, isNext: boolean) => void
}

interface IState{
    readonly events: CalendarEvent[]
    readonly currentMonth: number
    readonly currentYear: number
}

export class Calendar extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            events: [],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
        }
    }
    
    componentDidMount = (): void => gapi.load("client", () => gapi.client.init({ apiKey: this.props.apiKey }).then(() => gapi.client.request({ path: `https://www.googleapis.com/calendar/v3/calendars/${this.props.calendarId}/events?singleEvents=True&orderBy=startTime` })).then(response => {
        const gEvents = response.result.items as GoogleCalendarEvent[],
        events: CalendarEvent[] = []
        
        gEvents.forEach(e => {
            const start = new Date(e.start.dateTime || e.start.date),
            end = new Date(e.end.dateTime || e.end.date)

            let isDifferentDay = start.getTime() !== end.getTime() && (start.getDate() !== end.getDate() || start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear())

            if(isDifferentDay){
                const copy = new Date(start)

                events.push({
                    day: start.getDate(),
                    month: start.getMonth(),
                    year: start.getFullYear(),
                    desc: e.summary,
                    start: null,
                    end: null,
                    date: start
                })

                while(isDifferentDay){
                    copy.setDate(copy.getDate() + 1)

                    events.push({
                        day: copy.getDate(),
                        month: copy.getMonth(),
                        year: copy.getFullYear(),
                        desc: e.summary,
                        start: null,
                        end: null,
                        date: copy
                    })

                    isDifferentDay = copy.getTime() !== end.getTime() && (copy.getDate() !== end.getDate() || copy.getMonth() !== end.getMonth() || copy.getFullYear() !== end.getFullYear())
                }
            }else{
                events.push({
                    day: start.getDate(),
                    month: start.getMonth(),
                    year: start.getFullYear(),
                    desc: e.summary,
                    start: e.start.date ? null : getTime(start.toString()),
                    end: e.end.date ? null : getTime(end.toString()),
                    date: start
                })
            }
        })

        this.setState({ events })
    }, () => openInfoDialog({
        type: "error",
        content: Constants.CALENDAR_ERROR_UNABLE_TO_GET_EVENTS
    })))

    increaseMonth = (): void => {
        const { currentMonth, currentYear } = this.state,
        newMonth = currentMonth === 11 ? 0 : currentMonth + 1,
        newYear = currentMonth === 11 ? currentYear + 1 : currentYear

        this.setState({
            currentMonth: newMonth,
            currentYear: newYear
        })
    }

    decreaseMonth = (): void => {
        const { currentMonth, currentYear } = this.state,
        newMonth = currentMonth === 0 ? 11 : currentMonth - 1,
        newYear = currentMonth === 0 ? currentYear - 1 : currentYear

        this.setState({
            currentMonth: newMonth,
            currentYear: newYear
        })
    }

    tryOpenEvent = (e: CalendarEvent, isPrev: boolean, isNext: boolean): void => this.props.onEventClick && this.props.onEventClick(e, isPrev, isNext)

    openDateChange = () => {
        let selMonth: number,
        selYear: number

        const { currentYear, currentMonth } = this.state,
        years = Array.from(Array(new Date().getFullYear() - 1999).keys()).map((_, i) => new Date().getFullYear() - i),
        dialog = openDialog({
            title: Constants.CALENDAR_CHANGE_DATE,
            width: "300px",
            clickOutside: true,
            content: <>
                <Select icon={{ iconKey: "calendar", type: "far" }} canSearch defaultValue={currentMonth} onChange={v => selMonth = v}>
                    {
                        Constants.MONTHS.map((m, i) => <Option value={i} label={m} key={m} />)
                    }
                </Select>

                <Select icon={{ iconKey: "calendar-check", type: "far" }} canSearch defaultValue={currentYear} onChange={v => selYear = v}>
                    {
                        years.map(y => <Option value={y} label={y.toString()} key={y} />)
                    }
                </Select>
            </>,
            customFooter: [
                <Tooltip key="today" tooltip={Constants.CALENDAR_SELECT_CURRENT} >
                    <Button type="text"style={{ float: "left" }} size="big" btnColor="green" onClick={() => {
                        const d = new Date()

                        this.setState({
                            currentMonth: d.getMonth(),
                            currentYear: d.getFullYear()
                        }, dialog.close)
                    }}>
                        <Icon iconKey="calendar-alt" type="far" />
                    </Button>
                </Tooltip>,
                <Button key="select" size="small" btnColor="blue" onClick={() => this.setState({
                    currentMonth: selMonth ?? currentMonth,
                    currentYear: selYear ?? currentYear
                }, dialog.close)}>
                    {Constants.CALENDAR_SET_TEXT}
                </Button>,
                <Button key="cancel" type="text" btnColor="red" onClick={() => dialog.close()}>
                    {Constants.CANCEL_TEXT}
                </Button>
            ]
        })
    }

    render = (): JSX.Element => {
        const { events, currentYear, currentMonth } = this.state,
        calendario = getCalendar(currentMonth, currentYear),
        monthEvents = events.filter(e => e.month === currentMonth && e.year === currentYear)

        return <div className="dolfo-g-calendar-content">
            <h3 className="month-title">
                <div className="month-buttons">
                    <Tooltip tooltip={Constants.CALENDAR_PREVIOUS_MONTH}>
                        <Button btnColor="white" size="big" className="month-button-prev" onClick={this.decreaseMonth}>
                            <Icon iconKey="chevron-left" type="far" large />
                        </Button>
                    </Tooltip>
                    <Tooltip tooltip={Constants.CALENDAR_NEXT_MONTH}>
                        <Button btnColor="white" size="big" className="month-button-next" onClick={this.increaseMonth}>
                            <Icon iconKey="chevron-right" type="far" large />
                        </Button>
                    </Tooltip>
                </div>

                <Tooltip tooltip={Constants.CALENDAR_CHANGE}>
                    <Button btnColor="white" size="big" onClick={this.openDateChange}>
                        {decodeMonth(currentMonth)} {currentYear}
                    </Button>
                </Tooltip>
            </h3>

            {!monthEvents.length && <div className="no-month-events">{Constants.MONTH_NO_EVENTS}</div>}

            <table className="dolfo-g-calendar">
                <thead>
                    <tr>
                        <th>{Constants.WEEK_DAYS[0]}</th>
                        <th>{Constants.WEEK_DAYS[1]}</th>
                        <th>{Constants.WEEK_DAYS[2]}</th>
                        <th>{Constants.WEEK_DAYS[3]}</th>
                        <th>{Constants.WEEK_DAYS[4]}</th>
                        <th>{Constants.WEEK_DAYS[5]}</th>
                        <th>{Constants.WEEK_DAYS[6]}</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        calendario.map((row, ri) => {
                            return <tr key={ri}>
                                {
                                    row.map((col, i) => {
                                        const dEvents = events.filter(e => e.day === col.day && e.month === col.month && e.year === col.year),
                                        now = new Date(),
                                        isToday = col.day === now.getDate() && col.month === now.getMonth() && col.year === now.getFullYear(),
                                        isPrev = col.prevMonth >= 0,
                                        isNext = col.nextMonth >= 0

                                        return <td className={(isPrev || isNext ? "external" : "") + (!dEvents.length ? " empty" : "")} key={i}>
                                            <div className="content">
                                                {isToday && <Tooltip tooltip={Constants.CALENDAR_PIN_TODAY}>
                                                    <Icon iconKey="map-pin" large className="icon-today" />
                                                </Tooltip>}

                                                <div className="day-number-container">
                                                    <div className="day-number">
                                                        <div className="week-day">{Constants.WEEK_DAYS[i].substring(0, 3)}</div>
                                                        {col.day}
                                                    </div>
                                                </div>

                                                <div className="events-container">
                                                    {
                                                        dEvents.map((e, ei) => <Tooltip tooltip={this.props.onEventClick && Constants.EVENT_DETAIL_TOOLTIP} key={ei}>
                                                            <div className="event" onClick={() => this.tryOpenEvent(e, isPrev, isNext)}>
                                                                {e.start && e.end && <span>{e.start} - {e.end}</span>} 
                                                                {e.start && e.end && <span className="event-desc-separator"> • </span>}
                                                                <span className="event-desc">{e.desc}</span>
                                                            </div>
                                                        </Tooltip>)
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}