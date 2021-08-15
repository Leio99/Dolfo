export interface GoogleCalendarEvent{
    readonly summary: string
    readonly end: {
        readonly dateTime?: string
        readonly date?: string
    }
    readonly start: {
        readonly dateTime?: string
        readonly date?: string
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