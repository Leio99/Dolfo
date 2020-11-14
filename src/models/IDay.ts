import { IEvent } from "./IEvent"

export interface IDay{
    readonly index: number
    readonly events: IEvent[]
}

export interface Day{
    readonly day: number,
    readonly month: number,
    readonly year: number,
    readonly prevMonth?: number,
    readonly prevYear?: number,
    readonly nextMonth?: number,
    readonly nextYear?: number
}