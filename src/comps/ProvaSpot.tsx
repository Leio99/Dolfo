import React from "react"
import Button from "./layout/Button"
import { Spotlight } from "./layout/Spotlight"

export class ProvaSpot extends React.Component<unknown, { readonly visible: boolean, readonly data: any[] }>{
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

    render = () => <>
        <Button btnColor="green" onClick={this.toggle}>Mostra</Button>

        <Spotlight data={this.state.data} renderItem={item => <>
            <strong style={{ display: "block" }}>{item.name}</strong>
            {item.surname}
        </>} onChangeFilter={f => this.setState({
            data: this.DATA.filter(e => e.name.toLowerCase().indexOf(f.trim()) >= 0  || e.surname.toLowerCase().indexOf(f.trim()) >= 0)
        })} visible={this.state.visible} onClose={this.toggle} />
    </>
}