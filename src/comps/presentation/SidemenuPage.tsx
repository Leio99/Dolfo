import React from "react"
import Button from "../layout/Button"
import { SideMenu, MenuItem, SubMenu } from "../layout/SideMenu"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class SidemenuPage extends React.Component<any, {
    readonly [x: string]: boolean
}>{
    constructor(props: any){
        super(props)

        this.state = {}
    }

    toggle = (key: string) => this.setState({ [key]: !this.state[key] })

    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a side menu.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple menu"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("first")}>Click to show</Button>

                <SideMenu opened={this.state["first"]} onToggle={() => this.toggle("first")}>
                    <div style={{ textAlign: "center"}}>I am a side menu</div>

                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => this.toggle("first")}>Click to show</Button>\n\n<SideMenu opened={this.state["first"]} onToggle={() => this.toggle("first")}>\n\t<div style={{ textAlign: "center"}}>I am a side menu</div>\n\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>'}
        />

        <ResultCode
            title="Sub menu"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("sub")}>Click to show</Button>

                <SideMenu opened={this.state["sub"]} onToggle={() => this.toggle("sub")}>
                    <MenuItem>I am a voice</MenuItem>

                    <SubMenu text="Open me">
                        <MenuItem>I am a sub voice</MenuItem>
                    </SubMenu>
                </SideMenu>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => this.toggle("sub")}>Click to show</Button>\n\n<SideMenu opened={this.state["sub"]} onToggle={() => this.toggle("sub")}>\n\t<MenuItem>I am a voice</MenuItem>\n\n\t<SubMenu text="Open me">\n\t\t<MenuItem>I am a sub voice</MenuItem>\n\t</SubMenu>\n</SideMenu>'}
        />

        <ResultCode
            title="Simple menu"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("red")} style={{ marginRight: 5 }}>Red</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("green")} style={{ marginRight: 5 }}>Green</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("darkblue")} style={{ marginRight: 5 }}>Dark blue</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("black")} style={{ marginRight: 5 }}>Black</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("orange")} style={{ marginRight: 5 }}>Orange</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("grey")} style={{ marginRight: 5 }}>Grey</Button>
                <Button btnColor="blue" size="small" onClick={() => this.toggle("white")}>White</Button>

                <SideMenu opened={this.state["red"]} onToggle={() => this.toggle("red")} menuColor="red">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["green"]} onToggle={() => this.toggle("green")} menuColor="green">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["darkblue"]} onToggle={() => this.toggle("darkblue")} menuColor="darkblue">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["black"]} onToggle={() => this.toggle("black")} menuColor="black">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["orange"]} onToggle={() => this.toggle("orange")} menuColor="orange">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["grey"]} onToggle={() => this.toggle("grey")} menuColor="grey">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>

                <SideMenu opened={this.state["white"]} onToggle={() => this.toggle("white")} menuColor="white">
                    <MenuItem>I am a voice</MenuItem>
                </SideMenu>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => this.toggle("red")} style={{ marginRight: 5 }}>Red</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("green")} style={{ marginRight: 5 }}>Green</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("darkblue")} style={{ marginRight: 5 }}>Dark blue</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("black")} style={{ marginRight: 5 }}>Black</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("orange")} style={{ marginRight: 5 }}>Orange</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("grey")}>Grey</Button>\n<Button btnColor="blue" size="small" onClick={() => this.toggle("white")}>White</Button>\n\n<SideMenu opened={this.state["red"]} onToggle={() => this.toggle("red")} menuColor="red">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["green"]} onToggle={() => this.toggle("green")} menuColor="green">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["darkblue"]} onToggle={() => this.toggle("darkblue")} menuColor="darkblue">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["black"]} onToggle={() => this.toggle("black")} menuColor="black">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["orange"]} onToggle={() => this.toggle("orange")} menuColor="orange">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["grey"]} onToggle={() => this.toggle("grey")} menuColor="grey">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>\n\n<SideMenu opened={this.state["white"]} onToggle={() => this.toggle("white")} menuColor="white">\n\t<MenuItem>I am a voice</MenuItem>\n</SideMenu>'}
        />

        <Apis title="Function properties" data={[
            {
                name: "opened",
                desc: "Determines wheteher the menu is opened or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "menuColor",
                desc: "Defines the menu background and text color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white)",
                required: false,
                default: "circle"
            },
            {
                name: "onToggle",
                desc: "Function triggered when closing the menu.",
                type: "function",
                required: false,
                default: "None"
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
                default: "None"
            }
        ]} />

        <Apis title="Sub menu properties" data={[
            {
                name: "text",
                desc: "The label of the sub-menu.",
                type: "string or JSX",
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
                default: "None"
            }
        ]} />
    </>
}