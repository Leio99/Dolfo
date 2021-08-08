import React from "react"
import { decodeMonth, getCalendar, getTime } from "../shared/utility"
import { CalendarEvent, GoogleCalendarEvent } from "../shared/models/CalendarEvent"
import Button from "./Button"
import { Dialog } from "./Dialog"
import { Icon } from "./Icon"
import { Constants } from "../shared/Constants"

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
    
    componentDidMount = () => {
        /*
        * script script src="https://apis.google.com/js/api.js"></script>
        * is required in your index.html
        */
        const start = () => {
            gapi.client.init({
                apiKey: this.props.apiKey
            }).then(() => {
                return gapi.client.request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${this.props.calendarId}/events?singleEvents=True&orderBy=startTime`
                })
            }).then(response => {
                const gEvents = response.result.items as GoogleCalendarEvent[],
                events = gEvents.map(e => {
                    const start = new Date(e.start.dateTime || e.start.date),
                    end = new Date(e.end.dateTime || e.start.date)

                    return {
                        day: start.getDate(),
                        month: start.getMonth(),
                        year: start.getFullYear(),
                        desc: e.summary,
                        start: e.start.date ? null : getTime(start.toString()),
                        end: e.end.date ? null : getTime(end.toString()),
                        date: start
                    }
                })

                this.setState({ events })
            }, () => {
                Dialog.infoDialog({
                    type: "error",
                    content: Constants.CALENDAR_ERROR_UNABLE_TO_GET_EVENTS
                })
            })
        }

        gapi.load("client", start)
    }

    increaseMonth = () => {
        const { currentMonth, currentYear } = this.state,
        newMonth = currentMonth === 11 ? 0 : currentMonth + 1,
        newYear = currentMonth === 11 ? currentYear + 1 : currentYear

        this.setState({
            currentMonth: newMonth,
            currentYear: newYear
        })
    }

    decreaseMonth = () => {
        const { currentMonth, currentYear } = this.state,
        newMonth = currentMonth === 0 ? 11 : currentMonth - 1,
        newYear = currentMonth === 0 ? currentYear - 1 : currentYear

        this.setState({
            currentMonth: newMonth,
            currentYear: newYear
        })
    }

    tryOpenEvent = (e: CalendarEvent, isPrev: boolean, isNext: boolean) => this.props.onEventClick && this.props.onEventClick(e, isPrev, isNext)

    render = (): JSX.Element => {
        const { events, currentYear, currentMonth } = this.state,
        calendario = getCalendar(currentMonth, currentYear),
        monthEvents = events.filter(e => e.month === currentMonth && e.year === currentYear)

        return <div className="dolfo-g-calendar-content">
            <h3 className="month-title">
                <div className="month-buttons">
                    <Button btnColor="black" tooltip={Constants.CALENDAR_PREVIOUS_MONTH} className="month-button-prev" onClick={this.decreaseMonth}>
                        <Icon iconKey="chevron-left" type="far" large />
                    </Button>
                    <Button btnColor="black" tooltip={Constants.CALENDAR_NEXT_MONTH} className="month-button-next" onClick={this.increaseMonth}>
                        <Icon iconKey="chevron-right" type="far" large />
                    </Button>
                </div>
                {decodeMonth(currentMonth)} {currentYear}
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
                        calendario.map(row => {
                            return <tr>
                                {
                                    row.map((col, i) => {
                                        const dEvents = events.filter(e => e.day === col.day && e.month === col.month && e.year === col.year),
                                        now = new Date(),
                                        isToday = col.day === now.getDate() && col.month === now.getMonth() && col.year === now.getFullYear(),
                                        isPrev = col.prevMonth >= 0,
                                        isNext = col.nextMonth >= 0

                                        return <td className={(isPrev || isNext ? "external" : "") + (!dEvents.length ? " empty" : "")}>
                                            <div className="content">
                                                {isToday && <Icon iconKey="map-pin" large tooltip={Constants.CALENDAR_PIN_TODAY} className="icon-today" />}

                                                <div className="day-number-container">
                                                    <div className="day-number">
                                                        <div className="week-day">{Constants.WEEK_DAYS[i].substring(0, 3)}</div>
                                                        {col.day}
                                                    </div>
                                                </div>

                                                <div className="events-container">
                                                    {
                                                        dEvents.map(e => <div className="event" data-tooltip={this.props.onEventClick && Constants.EVENT_DETAIL_TOOLTIP} onClick={() => this.tryOpenEvent(e, isPrev, isNext)}>
                                                            {e.start && e.end && <span>{e.start} - {e.end}</span>} 
                                                            {e.start && e.end && <span className="event-desc-separator"> • </span>}
                                                            <span className="event-desc">{e.desc}</span>
                                                        </div>)
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