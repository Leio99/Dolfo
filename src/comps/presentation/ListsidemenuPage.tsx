import React from "react"
import Button, { ButtonColors } from "../layout/Button"
import { ListSideMenu } from "../layout/ListSideMenu"
import { MenuItem, SubMenu } from "../layout/SideMenu"
import { ResultCode, WhenToUse, Apis } from "./Layouts"

export class ListsidemenuPage extends React.Component<any, {
    readonly color: ButtonColors
}>{
    constructor(props: any){
        super(props)

        this.state = {
            color: "blue"
        }
    }

    toggle = (color: ButtonColors) => this.setState({ color })

    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a side menu with list style.</WhenToUse>

        <ResultCode
            title="Simple menu"
            result={<ListSideMenu>
                <MenuItem>I am a voice</MenuItem>

                <SubMenu text="Open me">
                    <MenuItem>I am a sub voice</MenuItem>
                </SubMenu>
            </ListSideMenu>}
            code={'<ListSideMenu>\n\t<MenuItem>I am a voice</MenuItem>\n\n\t<SubMenu text="Open me">\n\t\t<MenuItem>I am a sub voice</MenuItem>\n\t</SubMenu>\n</ListSideMenu>'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Button btnColor="red" size="small" onClick={() => this.toggle("red")} style={{ marginRight: 5 }}>Red</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("blue")} style={{ marginRight: 5 }}>Blue</Button>
                <Button btnColor="green" size="small" onClick={() => this.toggle("green")} style={{ marginRight: 5 }}>Green</Button>
                <Button btnColor="darkblue" size="small" onClick={() => this.toggle("darkblue")} style={{ marginRight: 5 }}>Dark blue</Button>
                <Button btnColor="black" size="small" onClick={() => this.toggle("black")} style={{ marginRight: 5 }}>Black</Button>
                <Button btnColor="orange" size="small" onClick={() => this.toggle("orange")} style={{ marginRight: 5 }}>Orange</Button>
                <Button btnColor="grey" size="small" onClick={() => this.toggle("grey")} style={{ marginRight: 5 }}>Grey</Button>
                <Button btnColor="white" size="small" onClick={() => this.toggle("white")} style={{ marginRight: 5 }}>White</Button>
                <Button btnColor="violet" size="small" onClick={() => this.toggle("violet")}>Violet</Button>

                <div style={{ marginTop: 20 }}></div>

                <ListSideMenu menuColor={this.state.color}>
                    <MenuItem>I am a voice</MenuItem>

                    <SubMenu text="Open me" opened>
                        <MenuItem>I am a sub voice</MenuItem>
                    </SubMenu>
                </ListSideMenu>
            </>}
            code={'<Button btnColor="red" size="small" onClick={() => this.toggle("red")} style={{ marginRight: 5 }}>Red</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("blue")} style={{ marginRight: 5 }}>Blue</Button>\n<Button btnColor="green" size="small" onClick={() => this.toggle("green")} style={{ marginRight: 5 }}>Green</Button>\n<Button btnColor="darkblue" size="small" onClick={() => this.toggle("darkblue")} style={{ marginRight: 5 }}>Dark blue</Button>\n<Button btnColor="black" size="small" onClick={() => this.toggle("black")} style={{ marginRight: 5 }}>Black</Button>\n<Button btnColor="orange" size="small" onClick={() => this.toggle("orange")} style={{ marginRight: 5 }}>Orange</Button>\n<Button btnColor="grey" size="small" onClick={() => this.toggle("grey")} style={{ marginRight: 5 }}>Grey</Button>\n<Button btnColor="white" size="small" onClick={() => this.toggle("white")} style={{ marginRight: 5 }}>White</Button>\n<Button btnColor="violet" size="small" onClick={() => this.toggle("violet")}>Violet</Button>\n\n<ListSideMenu menuColor={this.state.color}>\n\t<MenuItem>I am a voice</MenuItem>\n\n\t<SubMenu text="Open me" opened>\n\t\t<MenuItem>I am a sub voice</MenuItem>\n\t</SubMenu>\n</ListSideMenu>'}
        />

        <Apis title="Menu properties" data={[
            {
                name: "menuColor",
                desc: "Defines the menu background and text color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "blue"
            },
            {
                name: "style",
                desc: "Additional menu style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional menu className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />

        <Apis title="Menu items properties" data={[
            {
                name: "selected",
                desc: "Determines wheteher the menu item is selected or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClick",
                desc: "Function triggered when clicking the menu item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />

        <Apis title="Sub menu properties" data={[
            {
                name: "text",
                desc: "The label of the sub-menu.",
                type: "string or ReactNode",
                required: true
            },
            {
                name: "opened",
                desc: "Determines wheteher the sub-menu is expanded or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClick",
                desc: "Function triggered when clicking the sub-menu.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}