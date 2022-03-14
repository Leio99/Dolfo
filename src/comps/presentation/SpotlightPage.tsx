import React from "react"
import Button from "../layout/Button"
import { Spotlight } from "../layout/Spotlight"
import { SpotExample } from "./Examples"
import { ResultCode, WhenToUse, Apis } from "./Layouts"

export class SpotlightPage extends React.Component<unknown, { readonly visible: boolean, readonly data: any[] }>{
    private readonly DATA: { name: string, surname: string }[] = [
        { name: "Jules", surname: "Cesar" },
        { name: "Andrew", surname: "Garfield" },
        { name: "Tom", surname: "Holland" },
        { name: "Tobey", surname: "Maguire" }
    ]

    constructor(props: unknown){
        super(props)

        this.state = {
            visible: false,
            data: this.DATA
        }
    }
    
    toggle = () => this.setState({ visible: !this.state.visible })

    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a search dialog (or spotlight).</WhenToUse>

        <ResultCode
            title="Simple messagebox"
            result={<>
                <Button btnColor="green" onClick={this.toggle} size="small">Show spotlight</Button>
        
                <Spotlight data={this.state.data} renderItem={item => <>
                    <strong style={{ display: "block" }}>{item.name}</strong>
                    {item.surname}
                </>} onChangeFilter={f => this.setState({
                    data: this.DATA.filter(e => e.name.toLowerCase().indexOf(f.trim().toLowerCase()) >= 0  || e.surname.toLowerCase().indexOf(f.trim().toLowerCase()) >= 0)
                })} visible={this.state.visible} onClose={this.toggle} onClickItem={i => console.warn(i)} />
            </>}
            code={SpotExample}
        />

        <Apis data={[
            {
                name: "content",
                desc: "The content of the message.",
                type: "string or JSX",
                required: true
            },
            {
                name: "title",
                desc: "The title of the message.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "position",
                desc: "The position of the message.",
                type: "string (top-left, top-right, bottom-left, bottom-right)",
                required: false,
                default: "top-right"
            },
            {
                name: "hideDelay",
                desc: "The amount of seconds after the message should disappear.",
                type: "number (seconds x 1000) or 'never'",
                required: false,
                default: "2 seconds (2000)"
            },
            {
                name: "onClose",
                desc: "Function triggered when the user closes the message.",
                type: "function'",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}