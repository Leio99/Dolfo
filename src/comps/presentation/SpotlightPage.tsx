import React from "react"
import Button from "../layout/Button"
import { Spotlight } from "../layout/Spotlight"
import { SpotExample } from "./Examples"
import { ResultCode, WhenToUse, Apis } from "./Layouts"

export class SpotlightPage extends React.Component<unknown, { readonly visible: boolean, readonly data: any[] }>{
    private readonly DATA: { name: string, surname: string }[] = [{
        "name": "Sunshine",
        "surname": "Strauss"
      }, {
        "name": "Alfons",
        "surname": "Guillot"
      }, {
        "name": "Darci",
        "surname": "Dedam"
      }, {
        "name": "Eimile",
        "surname": "Japp"
      }, {
        "name": "Hamlen",
        "surname": "Tangye"
      }, {
        "name": "Lora",
        "surname": "Ropkins"
      }, {
        "name": "Doug",
        "surname": "Cullrford"
      }, {
        "name": "Opal",
        "surname": "Gooble"
      }, {
        "name": "Katleen",
        "surname": "Vise"
      }, {
        "name": "Malinda",
        "surname": "Jacobsz"
      }, {
        "name": "Carey",
        "surname": "Blann"
      }, {
        "name": "Evangelin",
        "surname": "Trembey"
      }, {
        "name": "Grannie",
        "surname": "Beatens"
      }, {
        "name": "Kelly",
        "surname": "Duignan"
      }, {
        "name": "Arlinda",
        "surname": "Furlong"
      }, {
        "name": "Prudence",
        "surname": "Greg"
      }, {
        "name": "Weider",
        "surname": "Smout"
      }, {
        "name": "Crissie",
        "surname": "Atterley"
      }, {
        "name": "Alessandro",
        "surname": "Smither"
      }, {
        "name": "Rodrique",
        "surname": "Coltart"
      }]

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
            title="Simple spotlight"
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
                name: "data",
                desc: "The data source of the spotlight.",
                type: "Array",
                required: true
            },
            {
                name: "renderItem",
                desc: "Function to render a single item of the list.",
                type: "function",
                required: true,
                fnParams: "The single item of the list"
            },
            {
                name: "loading",
                desc: "Determines whether the data source is loading or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "visible",
                desc: "Determines whether the spotlight should show or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClickItem",
                desc: "Function triggered when the user clicks an item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "The clicked item (any)"
            },
            {
                name: "onChangeFilter",
                desc: "Function triggered when the filter changes.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Filter value (string)"
            },
            {
                name: "onClose",
                desc: "Function triggered when the user closes the spotlight or clicks an item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}