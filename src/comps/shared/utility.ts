import { ICalendarDay } from "./models/ICalendarDay"
import { IDataColumn } from "./models/IColumn"
import { getConstant } from "./Constants"
import _ from "lodash"
import { showInfo } from "../layout/NotificationMsg"

/** Function to format a date in european style
 * @type Function
 * @param inputDate Date or string
 * @param monthString boolean (if true shows the month in letters; default is 'false')
 * @returns string (formatted date)
 */
export const formatDate = (inputDate: Date | string, monthString = false): string => {
    const date = new Date(inputDate),
    month = monthString ? (" " + decodeMonth(date.getMonth()).toLowerCase() + " ") : ("-" + zeroBefore(date.getMonth() + 1) + "-")

    return `${zeroBefore(date.getDate()) + month + date.getFullYear()}`
}

/** Function that blurs the active element on document
 * @type Function
 */
export const blurInput = () => (document.activeElement as HTMLElement)?.blur()

/** Function that checks if a date is valid
 * @type Function
 * @param d number (day)
 * @param m number (month)
 * @param y number (year)
 * @param h number (hour)
 * @param i number (minute)
 * @returns boolean
 */
export const isValidDate = (d: number, m: number, y: number, h: number, i: number): boolean => m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y) && h >= 0 && h < 60 && i >= 0 && i < 60 && y > 1900

/** Function that checks if the month has the passed day for the year
 * @type Function
 * @param m number (month)
 * @param y number (year)
 * @returns boolean
 */
export const daysInMonth = (m: number, y: number) => {
    switch (m) {
        case 1: return y % 4 === 0 || y % 100 === 0 || y % 400 === 0 ? 29 : 28
        case 8:
        case 3:
        case 5:
        case 10: return 30
        default: return 31
    }
}

/** Formats a number with '.' for thousands and ',' for decimals
 * @type Function
 * @param n number | string
 * @returns string (formatted number)
 */
export const formatNumber = (n: string | number): string => {
    if(n == null) return "0"

    let converted = _.isNumber(n) ? parseFloat(n.toString()).toFixed(2) : parseFloat(n).toFixed(2)

    if(parseFloat(converted).toString().indexOf(".") === -1) converted = (+converted).toString()

    return converted.replace(/\B(?=(\d{3})+(?!\d))/g, ";").replace(".",",").replace(";",".")
}

/** Function used to decode the passed month in letters
 * @type Function
 * @param month number
 * @param short boolean (if true returns the first three letters; default is 'false')
 * @returns string (month in letters)
 */
export const decodeMonth = (month: number, short: boolean = false): string => {
    switch(month){
        case 0: return short ? getConstant("MONTHS")[0].substring(0, 3) : getConstant("MONTHS")[0]
        case 1: return short ? getConstant("MONTHS")[1].substring(0, 3) : getConstant("MONTHS")[1]
        case 2: return short ? getConstant("MONTHS")[2].substring(0, 3) : getConstant("MONTHS")[2]
        case 3: return short ? getConstant("MONTHS")[3].substring(0, 3) : getConstant("MONTHS")[3]
        case 4: return short ? getConstant("MONTHS")[4].substring(0, 3) : getConstant("MONTHS")[4]
        case 5: return short ? getConstant("MONTHS")[5].substring(0, 3) : getConstant("MONTHS")[5]
        case 6: return short ? getConstant("MONTHS")[6].substring(0, 3) : getConstant("MONTHS")[6]
        case 7: return short ? getConstant("MONTHS")[7].substring(0, 3) : getConstant("MONTHS")[7]
        case 8: return short ? getConstant("MONTHS")[8].substring(0, 3) : getConstant("MONTHS")[8]
        case 9: return short ? getConstant("MONTHS")[9].substring(0, 3) : getConstant("MONTHS")[9]
        case 10: return short ? getConstant("MONTHS")[10].substring(0, 3) : getConstant("MONTHS")[10]
        default: return short ? getConstant("MONTHS")[11].substring(0, 3) : getConstant("MONTHS")[11]
    }
}

/** Given a number, if it is < 10 it adds a '0' before it
 * @type Function
 * @param n number
 * @returns string (formatted number)
 */
export const zeroBefore = (n: number): string => n < 10 ? ("0" + n) : n.toString()

/** Given a month and a year, returns a table with the calendar for that month
 * @type Function
 * @param month number
 * @param year number
 * @returns ICalendarDay[][]
 */
export const getCalendar = (month: number, year: number): ICalendarDay[][] => {
    let days = daysInMonth(month, year),
    table: ICalendarDay[][] = [],
    cols: ICalendarDay[] = [],
    today = new Date(),
    dateMonth = month >= 0 ? month : today.getMonth(),
    dateYear = year >= 0 ? year : today.getFullYear(),
    firstDay = new Date(`${dateMonth+1}-01-${dateYear}`),
    weekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay(),
    descending = 42

    for(let i = 1; i < weekDay; i++){
        const prevMonth = dateMonth === 0 ? 11 : dateMonth - 1,
        prevYear = dateMonth === 0 ? dateYear - 1 : dateYear

        cols.push({
            day: daysInMonth(prevMonth, prevYear) - (weekDay - i - 1),
            month: prevMonth,
            year: prevYear,
            prevMonth,
            prevYear
        })

        descending--
    }

    for(let i = 1; i <= days; i++){
        cols.push({
            day: i,
            month: dateMonth,
            year: dateYear
        })

        if(cols.length === 7 || i === days){
            table.push(cols)
            cols = []
        }
        
        descending--
    }

    const initLength = table[table.length-1].length - 1

    if(table[table.length-1].length < 7){

        for(let i = table[table.length-1].length; i < 7; i++){
            const nextMonth = dateMonth === 11 ? 0 : dateMonth + 1,
            nextYear = dateMonth === 11 ? dateYear + 1 : dateYear

            table[table.length-1].push({
                day: table[table.length-1].length - initLength,
                month: nextMonth,
                year: nextYear,
                nextMonth,
                nextYear
            })

            descending--
        }
    }

    for(let i = descending; i >= 1; i--){
        const nextMonth = dateMonth === 11 ? 0 : dateMonth + 1,
        nextYear = dateMonth === 11 ? dateYear + 1 : dateYear

        cols.push({
            day: descending - initLength,
            month: nextMonth,
            year: nextYear,
            nextMonth,
            nextYear
        })

        if(cols.length === 7){
            table.push(cols)
            cols = []
        }

        descending++
    }

    return table
}

/** Given a date, retrieves the time formatted
 * @type Function
 * @param d Date or string
 * @returns string (formatted time)
 */
export const getTime = (d: string | Date): string => {
    const date = new Date(d)

    return `${zeroBefore(date.getHours())}:${zeroBefore(date.getMinutes())}`
}

/** Given a datasurce, exports it in CSV format
 * @type Function
 * @param data IDataColumn[]
 * @param heading string[] (optional; contains the labels of the columns)
 * @returns void
 */
export const downloadCSV = (data: IDataColumn[], heading?: string[]): void => {
    if(!data || !data.length) return
    
    let csvContent = "data:text/csv;charset=utf-8,"

    if(heading) csvContent += heading.join(";") + "\n"

    csvContent += data.map(e => Object.values(e).map(a => a.toString().replaceAll(";",",")).join(";")).join("\n")

    const encodedUri = encodeURI(csvContent),
    link = document.createElement("a")

    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "OreStage.csv")
    document.body.appendChild(link)

    link.click()
    link.remove()
}

/** Copies a text to the clipboard
 * @type Function
 * @param text string
 * @param msg string (optional; the message shown on success)
 */
export const copyToClipBoard = (text: string, msg = getConstant("COPIED_TO_CLIPBOARD")): void => {
    navigator.clipboard.writeText(text)
    showInfo(msg)
}

/** Function that toggles the dark theme on the page
 * @type Function
 */
export const toggleDarkTheme = (): void => {
    const isDark = isDarkTheme() ? "0" : "1"

    document.querySelector("html").classList.toggle("dark-theme")
    localStorage.setItem("darkTheme", isDark)
}

/** Function the checks if the dark theme is enabled
 * @type Function
 * @returns boolean
 */
export const isDarkTheme = (): boolean => localStorage.getItem("darkTheme") === "1"

/** Checks if the dark theme is enabled and applies it to the body
 * @type Function
 */
export const checkDarkTheme = (): void => isDarkTheme() && document.querySelector("html").classList.add("dark-theme")

/** Given an element, loops all its parents to retrieve its z-index
 * @type Function
 * @param element HTMLElement
 * @returns number
 */
export const sumParentZIndex = (element: HTMLElement): number => {
    let sum = 0,
    temp = element

    while(temp.parentElement){
        const index = window.getComputedStyle(temp).zIndex

        if(!isNaN(Number(index)))
            sum += Number(index)
        
        temp = temp.parentElement
    }

    return sum
}

/** Function that checks if the element is inside the viewport or not
 * @type Function
 * @param element Element
 * @returns boolean
 */
export const isElementInViewport = (element: Element): boolean => {
    const rect = element.getBoundingClientRect()

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
}