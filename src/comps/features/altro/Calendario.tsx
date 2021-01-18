import React from "react"
import { decodeMonth, formatWithMonth, getCalendar, getTime } from "../../../commons/utility"
import { CalendarEvent, GoogleCalendarEvent } from "../../../models/CalendarEvent"
import { GOOGLE_API_KEY } from "../../../services/costantiApi"
import Button from "../../layout/Button"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"

export interface IProps{
    readonly idCalendario: string
}
export interface IState{
    readonly eventi: CalendarEvent[]
    readonly currentMonth: number
    readonly currentYear: number
}

export class Calendario extends React.PureComponent<IProps, IState>{
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
                "apiKey": GOOGLE_API_KEY
            }).then(() => {
                return gapi.client.request({
                    "path": `https://www.googleapis.com/calendar/v3/calendars/${this.props.idCalendario}/events?singleEvents=True&orderBy=startTime`
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

    infoEvento = (e: CalendarEvent, isPrev: boolean, isNext: boolean) => {
        Dialog.openDialog({
            width: "420px",
            hideCancel: true,
            okType: "blue",
            icon: <Icon iconKey="calendar-day" type="far" />,
            title: "Lezione del " + formatWithMonth(e.date.toString()),
            content: <div>
                {
                    isPrev && <small style={{ color: "var(--red)"}}>Lezione del mese precedente</small>
                }
                {
                    isNext && <small style={{ color: "var(--red)"}}>Lezione del mese successivo</small>
                }
                <div>
                    <strong>Fascia oraria</strong>: dalle {e.start} alle {e.end}
                </div>
                <div>
                    <strong>Dettagli</strong>: {e.desc}
                </div>
            </div>
        })
    }

    render = (): JSX.Element => {
        const { eventi, currentYear, currentMonth } = this.state,
        calendario = getCalendar(currentMonth, currentYear)

        return <div>
            <h3 className="mb-4">
                <div className="float-right ml-3">
                    <Button btnColor="black" tooltip="Mese precedente" onClick={this.decreaseMonth}>
                        <Icon iconKey="chevron-left" type="far" large />
                    </Button>
                    <Button btnColor="black" tooltip="Mese successivo" className="ml-2" onClick={this.increaseMonth}>
                        <Icon iconKey="chevron-right" type="far" large />
                    </Button>
                </div>
                {decodeMonth(currentMonth)} {currentYear}
            </h3>

            <table className="table table-bordered text-center calendario mb-0">
                <thead>
                    <th>Lunedì</th>
                    <th>Martedì</th>
                    <th>Mercoledì</th>
                    <th>Giovedì</th>
                    <th>Venerdì</th>
                    <th>Sabato</th>
                    <th>Domenica</th>
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
                                                {isToday && <Icon iconKey="map-pin" large tooltip="Oggi" className="icon-oggi" />}

                                                <div>{col.day}</div>
                                                {
                                                    events.map(e => <div className="evento text-truncate" data-tooltip="Dettagli" onClick={() => this.infoEvento(e, isPrev, isNext)}>
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