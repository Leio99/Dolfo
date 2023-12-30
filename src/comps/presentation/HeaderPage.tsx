import React from "react"
import { Header } from "../layout/Header"
import { goToApiBlock, MenuContentProps } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class HeaderPage extends React.Component<MenuContentProps>{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a navigation header on your page.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple header"
            result={<Header title="I'm the header" style={{ zIndex: 0 }} />}
            code={'<Header title="I\'m the header" />'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Header title="Black" headerColor="black" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Blue" headerColor="blue" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Darkblue" headerColor="darkblue" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Green" headerColor="green" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Grey" headerColor="grey" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Orange" headerColor="orange" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Red" headerColor="red" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="White" headerColor="white" style={{ position: "relative", marginBottom: 10, zIndex: 0 }} />
                <Header title="Violet" headerColor="violet" style={{ position: "relative", zIndex: 0 }} />
            </>}
            code={'<Header title="Black" headerColor="black" />\n<Header title="Blue" headerColor="blue" />\n<Header title="Darkblue" headerColor="darkblue" />\n\n<Header title="Green" headerColor="green" />\n<Header title="Grey" headerColor="grey" />\n<Header title="Orange" headerColor="orange" />\n<Header title="Red" headerColor="red" />\n<Header title="White" headerColor="white" />\n<Header title="Violet" headerColor="violet" />'}
        />

        <ResultCode
            title="Menu toggler"
            result={<Header menuTogglerFn={() => alert("Toggle some side menu")} title="I'm the header" style={{ zIndex: 0 }} />}
            code={'<Header menuTogglerFn={() => alert("Toggle some side menu")} title="I\'m the header" />'}
        />

        <ResultCode
            title="Custom icon"
            result={<Header menuTogglerIcon={{ iconKey: "globe" }} menuTogglerFn={() => alert("Toggle some side menu")} title="I'm the header" style={{ zIndex: 0 }} />}
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
                name: "headerColor",
                desc: "Defines the header color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "blue"
            },
            {
                name: "menuTogglerIcon",
                desc: "Custom icon for the header button.",
                type: "Icon",
                required: false,
                default: "null (shows menu hamburger)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
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

        <IconApis {...this.props} />
    </>
}