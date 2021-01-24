export interface GoogleCalendarEvent{
    readonly summary: string
    readonly end: {
        dateTime?: string,
        date?: string
    }
    readonly start: {
        dateTime?: string,
        date?: string
    }
}

export interface CalendarEvent{
    readonly day: number
    readonly month: number
    readonly year: number
    readonly start: string
    readonly end: string
    readonly desc: string
    readonly date: Date
}
