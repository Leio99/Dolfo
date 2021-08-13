import React from "react"
import { Header } from "../layout/Header"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class HeaderPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a navigation header on your page.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple header"
            result={<Header title="I'm the header" />}
            code={'<Header title="I\'m the header" />'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Header title="Black" menuColor="black" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Blue" menuColor="blue" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Darkblue" menuColor="darkblue" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Green" menuColor="green" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Grey" menuColor="grey" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Orange" menuColor="orange" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="Red" menuColor="red" style={{ position: "relative", marginBottom: 10 }} />
                <Header title="White" menuColor="white" style={{ position: "relative" }} />
            </>}
            code={'<Header title="Black" menuColor="black" />\n<Header title="Blue" menuColor="blue" />\n<Header title="Darkblue" menuColor="darkblue" />\n\n<Header title="Green" menuColor="green" />\n<Header title="Grey" menuColor="grey" />\n<Header title="Orange" menuColor="orange" />\n<Header title="Red" menuColor="red" />\n<Header title="White" menuColor="white" />'}
        />

        <ResultCode
            title="Menu toggler"
            result={<Header menuTogglerFn={() => alert("Toggle some side menu")} title="I'm the header" />}
            code={'<Header menuTogglerFn={() => alert("Toggle some side menu")} title="I\'m the header" />'}
        />

        <ResultCode
            title="Custom icon"
            result={<Header menuTogglerIcon={{ iconKey: "globe" }} menuTogglerFn={() => alert("Toggle some side menu")} title="I'm the header" />}
            code={'<Header menuTogglerIcon={{ iconKey: "globe" }} menuTogglerFn={() => alert("Toggle some side menu")} title="I\'m the header" />'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The title of the header.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "menuColor",
                desc: "Defines the header color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white)",
                required: false,
                default: "blue"
            },
            {
                name: "menuTogglerIcon",
                desc: "Custom icon for the header button.",
                type: "Icon",
                required: false,
                default: "null (shows menu hamburger)",
                onDoubleClick: () => window.location.href = "#iconProps",
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "menuTogglerStyle",
                desc: "Additional style for the header button.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional header style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional header className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "menuTogglerFn",
                desc: "Function triggered when clicking the header button. If set, shows the header button.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />

        <IconApis />
    </>
}