import React from "react"
import { decodeMonth, getCalendar, getTime } from "../../commons/utility"
import { CalendarEvent, GoogleCalendarEvent } from "../../models/CalendarEvent"
import Button from "./Button"
import { Dialog } from "./Dialog"
import { Icon } from "./Icon"
import { Constants } from "../shared/Constants"

export interface IProps{
    readonly calendarId: string
    readonly apiKey: string
    readonly onEventClick?: (e: CalendarEvent, isPrev: boolean, isNext: boolean) => void
}
export interface IState{
    readonly eventi: CalendarEvent[]
    readonly currentMonth: number
    readonly currentYear: number
}

export class Calendar extends React.PureComponent<IProps, IState>{
    constructor(props: IProps){
        super(props)

        this.state = {
            eventi: [],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
        }
    }
    
    componentDidMount = () => {        
        const start = () => {
            gapi.client.init({
                apiKey: this.props.apiKey
            }).then(() => {
                return gapi.client.request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${this.props.calendarId}/events?singleEvents=True&orderBy=startTime`
                })
            }).then(response => {
                const gEvents = response.result.items as GoogleCalendarEvent[],
                eventi = gEvents.map(e => {
                    const start = new Date(e.start.dateTime),
                    end = new Date(e.end.dateTime)

                    return {
                        day: start.getDate(),
                        month: start.getMonth(),
                        year: start.getFullYear(),
                        desc: e.summary,
                        start: getTime(start.toString()),
                        end: getTime(end.toString()),
                        date: start
                    }
                })

                this.setState({ eventi })
            }, () => {
                Dialog.infoDialog({
                    type: "error",
                    content: "Non è stato possibile recuperare gli eventi del calendario."
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
        const { eventi, currentYear, currentMonth } = this.state,
        calendario = getCalendar(currentMonth, currentYear)

        return <div>
            <h3 className="mb-4">
                <div className="float-right ml-3">
                    <Button btnColor="black" tooltip={Constants.CALENDAR_PREVIOUS_MONTH} onClick={this.decreaseMonth}>
                        <Icon iconKey="chevron-left" type="far" large />
                    </Button>
                    <Button btnColor="black" tooltip={Constants.CALENDAR_NEXT_MONTH} className="ml-2" onClick={this.increaseMonth}>
                        <Icon iconKey="chevron-right" type="far" large />
                    </Button>
                </div>
                {decodeMonth(currentMonth)} {currentYear}
            </h3>

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
                                    row.map(col => {
                                        const events = eventi.filter(e => e.day === col.day && e.month === col.month && e.year === col.year),
                                        now = new Date(),
                                        isToday = col.day === now.getDate() && col.month === now.getMonth() && col.year === now.getFullYear(),
                                        isPrev = col.prevMonth >= 0,
                                        isNext = col.nextMonth >= 0

                                        return <td className={"text-truncate" + (isPrev || isNext ? " external" : "")}>
                                            <div className="content">
                                                {isToday && <Icon iconKey="map-pin" large tooltip={Constants.CALENDAR_PIN_TODAY} className="icon-today" />}

                                                <div>{col.day}</div>
                                                {
                                                    events.map(e => <div className="event text-truncate" data-tooltip={this.props.onEventClick && Constants.EVENT_DETAIL_TOOLTIP} onClick={() => this.tryOpenEvent(e, isPrev, isNext)}>
                                                        {e.start} - {e.end} • {e.desc}
                                                    </div>)
                                                }
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
