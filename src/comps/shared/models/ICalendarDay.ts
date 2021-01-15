export interface ICalendarDay{
    readonly day: number,
    readonly month: number,
    readonly year: number,
    readonly prevMonth?: number,
    readonly prevYear?: number,
    readonly nextMonth?: number,
    readonly nextYear?: number
}