import React from "react"
import { Calendar } from "../layout/Calendar"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class CalendarPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a Google Calendar.</WhenToUse>
        <Usage notes={<>You need to add <em>{'<script src="https://apis.google.com/js/api.js"></script>'}</em> to your index.html page.</>} />

        <ResultCode
            title="Example"
            result={<Calendar apiKey="AIzaSyDHmpV_i08BaD5hW5eSYhiaYPgJ9bzDgG8" calendarId="amicoexe@gmail.com" onEventClick={e => {
                alert("You clicked on an event. Check the console.")
                console.warn("CALENDAR EVENT", e)
            }} />}
            code={'<Calendar apiKey="YOUR_API_KEY" calendarId="CALENDAR_ID" onEventClick={e => {\n\talert("You clicked on an event. Check the console.")\n\tconsole.warn("CALENDAR EVENT", e)\n}} />'}
        />

        <Apis data={[
            {
                name: "calendarId",
                desc: "The ID of the Google Calendar you want to show (calendar must be public).",
                type: "string",
                required: true
            },
            {
                name: "apiKey",
                desc: "Your Google API key",
                type: "string",
                required: true
            },
            {
                name: "onEventClick",
                desc: "Function triggered when the user clicks on the event.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "CalendarEvent (CalendarEvent), isPreviousMonth (boolean), isNextMonth (boolean)",
                onDoubleClick: () => goToApiBlock("#calEventProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            }
        ]} />

        <Apis id="calEventProps" title="Calendar event properties" data={[
            {
                name: "day",
                desc: "The day of the event.",
                type: "number",
                required: true
            },
            {
                name: "month",
                desc: "The month of the event (first day = 0).",
                type: "number",
                required: true
            },
            {
                name: "year",
                desc: "The year of the event.",
                type: "number",
                required: true
            },
            {
                name: "date",
                desc: "The full date of the event.",
                type: "Date",
                required: true
            },
            {
                name: "start",
                desc: "The start time of the event.",
                type: "string (format HH:mm)",
                required: true
            },
            {
                name: "end",
                desc: "The end time of the event.",
                type: "string (format HH:mm)",
                required: true
            }
        ]} />
    </>
}