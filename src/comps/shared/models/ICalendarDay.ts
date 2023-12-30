export interface ICalendarDay{
    /** The day of the calendar
     * @type number
     */
    readonly day: number
    /** The month of the calendar
     * @type number
     */
    readonly month: number
    /** The year of the calendar
     * @type number
     */
    readonly year: number
    /** Defines if the previous month number
     * @type number
     */
    readonly prevMonth?: number
    /** Defines if the previous year number
     * @type number
     */
    readonly prevYear?: number
    /** Defines if the next month number
     * @type number
     */
    readonly nextMonth?: number
    /** Defines if the next year number
     * @type number
     */
    readonly nextYear?: number
}