import { ICalendarDay } from "./models/ICalendarDay"
import { IDataColumn } from "./models/IColumn"
import { Constants } from "./Constants"

export const formatDate = (date: Date, monthString = false): string => {
    const month = monthString ? (" " + decodeMonth(date.getMonth()).toLowerCase() + " ") : ("-" + zeroBefore(date.getMonth() + 1) + "-")

    return `${zeroBefore(date.getDate()) + month + date.getFullYear()}`
}

export const blurInput = () => (document.activeElement as HTMLElement)?.blur()

export const isValidDate = (d: number, m: number, y: number, h: number, i: number): boolean => m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y) && h >= 0 && h < 60 && i >= 0 && i < 60 && y > 1900

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

export const formatNumber = (n: string|number): string => {
    if(n == null) return "0"

    let converted = typeof n === "number" ? parseFloat(n.toString()).toFixed(2) : parseFloat(n).toFixed(2)

    if(parseFloat(converted).toString().indexOf(".") === -1) converted = (+converted).toString()

    return converted.replace(/\B(?=(\d{3})+(?!\d))/g, ";").replace(".",",").replace(";",".")
}

export const decodeMonth = (month: number, short: boolean = false): string => {
    switch(month){
        case 0: return short ? Constants.MONTHS[0].substring(0, 3) : Constants.MONTHS[0]
        case 1: return short ? Constants.MONTHS[1].substring(0, 3) : Constants.MONTHS[1]
        case 2: return short ? Constants.MONTHS[2].substring(0, 3) : Constants.MONTHS[2]
        case 3: return short ? Constants.MONTHS[3].substring(0, 3) : Constants.MONTHS[3]
        case 4: return short ? Constants.MONTHS[4].substring(0, 3) : Constants.MONTHS[4]
        case 5: return short ? Constants.MONTHS[5].substring(0, 3) : Constants.MONTHS[5]
        case 6: return short ? Constants.MONTHS[6].substring(0, 3) : Constants.MONTHS[6]
        case 7: return short ? Constants.MONTHS[7].substring(0, 3) : Constants.MONTHS[7]
        case 8: return short ? Constants.MONTHS[8].substring(0, 3) : Constants.MONTHS[8]
        case 9: return short ? Constants.MONTHS[9].substring(0, 3) : Constants.MONTHS[9]
        case 10: return short ? Constants.MONTHS[10].substring(0, 3) : Constants.MONTHS[10]
        default: return short ? Constants.MONTHS[11].substring(0, 3) : Constants.MONTHS[11]
    }
}

export const zeroBefore = (n: number): string => n < 10 ? ("0" + n) : n.toString()

export const getLastDay = (inputMonth?: number, inputYear?: number): number => {
    let date = new Date(),
    month = inputMonth >= 0 ? (inputMonth + 1) : (date.getMonth() + 1),
    year = inputYear >= 0 ? inputYear : date.getFullYear()

    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: return 31
        
        case 2:
            if(year % 4 === 0 || year % 100 === 0 || year % 400 === 0) return 29
            return 28
        
        default: return 30
    }
}

export const getCalendar = (month?: number, year?: number) => {
    let days = getLastDay(month, year),
    table = [],
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
            day: getLastDay(prevMonth, prevYear) - (weekDay - i - 1),
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

export const getTime = (d: string): string => {
    const date = new Date(d)

    return `${zeroBefore(date.getHours())}:${zeroBefore(date.getMinutes())}`
}

export const downloadCSV = (data: IDataColumn[], heading?: string[]) => {
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

export const objectsAreSame = (x: any, y: any) => {
    let objectsAreSame = true
    
    for(const propertyName in x){
       if(x[propertyName] !== y[propertyName]){
          objectsAreSame = false
          break
       }
    }

    return objectsAreSame
}

export const capitalizeFirstLetter = (s: string) => s[0].toUpperCase() + s.substring(1, s.length)
