import React from "react"
import Button from "../layout/Button"
import { Swipe, Swiper } from "../layout/Swiper"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class SwiperPage extends React.Component<any, {
    readonly opened: boolean
}>{
    constructor(props: any){
        super(props)

        this.state = {
            opened: false
        }
    }

    toggleOpen = () => this.setState({ opened: !this.state.opened })

    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a master-detail swiper.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple swiper"
            result={<Swiper opened={this.state.opened}>
                <Swipe>
                    <p>I am the master</p>

                    <Button size="small" btnColor="blue" onClick={this.toggleOpen}>Open the detail</Button>
                </Swipe>
                <Swipe onGoBack={this.toggleOpen}>I am the detail</Swipe>
            </Swiper>}
            code={'<Swiper opened={this.state.opened}>\n\t<Swipe>\n\t\t<p>I am the master</p>\n\n\t\t<Button size="small" btnColor="blue" onClick={this.toggleOpen}>Open the detail</Button>\n\t</Swipe>\n\n\t<Swipe onGoBack={this.toggleOpen}>I am the detail</Swipe>\n</Swiper>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The swiper screens (must be 2).",
                type: "Swipe",
                required: true,
                onDoubleClick: () => window.location.href = "#swipeProps",
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "opened",
                desc: "Determines whether the detail is opened or not.",
                type: "boolean",
                required: false,
                default: "false"
            }
        ]} />

        <Apis id="swipeProps" title="Swipe properties" data={[
            {
                name: "style",
                desc: "Additional swipe style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional swipe className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onGoBack",
                desc: "Function triggered when the user clicks on the detail button to go back. Can only be set if the swipe is the second one of the children.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}