import { NotificationMsg } from "../comps/layout/NotificationMsg"
import { Day } from "../models/IDay"
import { LoadingIcon } from "../comps/layout/Icon"

export const formatDate = (date: Date) => `${zeroBefore(date.getDate())}-${zeroBefore(date.getMonth() + 1)}-${date.getFullYear()}`

export const formatItalian = (date: string) => formatDate(new Date(date))

export const blurInput = () => (document.activeElement as HTMLElement)?.blur()

export const validateDate = (date: string) => isNaN(new Date(date).getTime())

export const decodeMonth = (month: number, short: boolean = false) => {
    switch(month){
        case 0: return short ? "Gen" : "Gennaio"
        case 1: return short ? "Feb" : "Febbraio"
        case 2: return short ? "Mar" : "Marzo"
        case 3: return short ? "Apr" : "Aprile"
        case 4: return short ? "Mag" : "Maggio"
        case 5: return short ? "Giu" : "Giugno"
        case 6: return short ? "Lug" : "Luglio"
        case 7: return short ? "Ago" : "Agosto"
        case 8: return short ? "Set" : "Settembre"
        case 9: return short ? "Ott" : "Ottobre"
        case 10: return short ? "Nov" : "Novembre"
        default: return short ? "Dic" : "Dicembre"
    }
}

export const zeroBefore = (n: number) => n < 10 ? ("0" + n) : n.toString()

export const getLastDay = (inputMonth?: number, inputYear?: number) => {
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
    cols: Day[] = [],
    today = new Date(),
    dateMonth = month >= 0 ? month : today.getMonth(),
    dateYear = year >= 0 ? year : today.getFullYear(),
    firstDay = new Date(`${dateMonth+1}-01-${dateYear}`),
    weekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay(),
    descending = 42

    for(let i = 1; i < weekDay; i++){
        let prevMonth = dateMonth === 0 ? 11 : dateMonth - 1,
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

    let initLength = table[table.length-1].length - 1

    if(table[table.length-1].length < 7){

        for(let i = table[table.length-1].length; i < 7; i++){
            let nextMonth = dateMonth === 11 ? 0 : dateMonth + 1,
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
        let nextMonth = dateMonth === 11 ? 0 : dateMonth + 1,
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

export const copyToClipBoard = (text: string) => {
    const el = document.createElement('textarea')
    el.value = text
    el.style.opacity = "0"
    el.style.width = "0"
    el.style.height = "0"

    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    NotificationMsg.showInfo("Codice copiato negli appunti!")
}

export const capitalizeFirst = (name: string) => {
    let splitStr = capitalizeQuote(name.toLowerCase()).split(" ")

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1) 
    }
   
    return splitStr.join(" ")
}

export const capitalizeQuote = (name: string) => {
    let splitStr = name.toLowerCase().split("'")

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
   
    return splitStr.join("'")
}

export const convertFromUTC = (date: string) => {
    let localDate = new Date(date)

    return `${zeroBefore(localDate.getHours())}:${zeroBefore(localDate.getMinutes())}`
}

export const getDateTime = (date: string) => {
    let clearDate = date.replace("Z", ""),
    converted = new Date(clearDate)

    return `${zeroBefore(converted.getHours())}:${zeroBefore(converted.getMinutes())}`
}

export const LoadingIconCentered = () => {
    return LoadingIcon({
        color: "var(--darkblue)",
        style: { fontSize: 50 },
        spinning: true,
        className: "d-block mx-auto"
    })
}