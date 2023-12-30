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
    /** The day of the event
     * @type number
     */
    readonly day: number
    /** The month of the event
     * @type number
     */
    readonly month: number
    /** The year of the event
     * @type number
     */
    readonly year: number
    /** The starting time of the event
     * @type string
     */
    readonly start: string
    /** The ending time of the event
     * @type string
     */
    readonly end: string
    /** The description of the event
     * @type string
     */
    readonly desc: string
    /** The full date of the event
     * @type Date
     */
    readonly date: Date
}