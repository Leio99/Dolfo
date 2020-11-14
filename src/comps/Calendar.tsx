import React from "react"
import { getCalendar } from "../commons/utility"
import { IDay } from "../models/IDay"
import { IEvent } from "../models/IEvent"
import { Button } from "./layout/Button"
import { Dialog } from "./layout/Dialog"
import { InfoCircleIcon } from "./layout/Icon"
import { Constants } from "./shared/Constants"

export interface IProps{
    events: IDay[]
    clickOnDay: (day: number) => void
}
export class Calendar extends React.PureComponent<IProps>{
    dayEvents = (events: IEvent[], e: any) => {
        e.stopPropagation()

        Dialog.infoDialog({
            title: "Lista degli eventi",
            width: "80vw",
            okText: Constants.CLOSE_TEXT,
            content: <div className="table-responsive mt-3">
                <table className="table table-bordered w-100">
                    <thead className="thead-light text-center">
                        <tr>
                            <th style={{ width: "30%" }}>Descrizione</th>
                            <th style={{ width: "20%" }}>Luogo</th>
                            <th style={{ width: "10%" }}>Inizio</th>
                            <th style={{ width: "10%" }}>Fine</th>
                            <th style={{ width: "30%" }}>Dipendente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map(ev => {
                                return <tr>
                                    <td className="text-truncate" style={{ maxWidth: 0 }}>
                                        {ev.name}
                                    </td>
                                    <td className="text-truncate" style={{ maxWidth: 0 }}>
                                        {ev.location.name}, {ev.space.name}
                                    </td>
                                    <td className="text-center">{ev.startTime}</td>
                                    <td className="text-center">{ev.endTime}</td>
                                    <td className="text-truncate" style={{ maxWidth: 0 }}>
                                        {ev.user}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        })
    }

    timeToMins = (time: string) => time.split(":")[0] + ":" + time.split(":")[1]
    
    render = () => {
        const { events, clickOnDay } = this.props
        return <table className="table table-bordered text-center">
            <tbody>
                {
                    getCalendar().map(week => {
                        return <tr>
                            {
                                week.map(day => {
                                    let findEvents = events?.find(d => d.index === day.day),
                                    event = findEvents ? findEvents.events[0] : null

                                    return <td className="cell" width="14.2%" onClick={() => clickOnDay(day.day)}>
                                        {day.day}

                                        {
                                            findEvents && <div className="prenotazione text-truncate" title={event.startTime + " - " + event.endTime + ": " + event.name}>
                                                <strong>{this.timeToMins(event.startTime)} - {this.timeToMins(event.endTime)}: {event.name}</strong>
                                            </div>
                                        }

                                        {
                                            findEvents && <Button className="details" onClick={(e) => this.dayEvents(findEvents.events, e)} textBtn btnColor="blue">
                                                <InfoCircleIcon />
                                            </Button>
                                        }
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    }
}