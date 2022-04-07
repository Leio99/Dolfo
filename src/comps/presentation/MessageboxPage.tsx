import React from "react"
import Button from "../layout/Button"
import { MessageBox } from "../layout/MessageBox"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class MessageboxPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a message box.</WhenToUse>
        <Usage notes={<>this component can only be rendered by calling a function (<em>MessageBox.show(params)</em>)</>} />

        <ResultCode
            title="Simple messagebox"
            result={<Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                title: "Hi there!",
                content: "Here some text for the content."
            })}>Click to show</Button>}
            code={'<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "Here some text for the content."\n})}>Click to show</Button>'}
        />

        <ResultCode
            title="Positioning"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "Here some text for the content.",
                    position: "top-left"
                })} style={{ marginRight: 5 }}>Top-left</Button>
                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "Here some text for the content.",
                    position: "top-right"
                })} style={{ marginRight: 5 }}>Top-right</Button>
                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "Here some text for the content.",
                    position: "bottom-right"
                })} style={{ marginRight: 5 }}>Bottom-right</Button>
                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "Here some text for the content.",
                    position: "bottom-left"
                })} style={{ marginRight: 5 }}>Bottom-left</Button>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "Here some text for the content.",\n\tposition: "top-left"\n})} style={{ marginRight: 5 }}>Top-left</Button>\n\n<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "Here some text for the content.",\n\tposition: "top-right"\n})} style={{ marginRight: 5 }}>Top-right</Button>\n\n<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "Here some text for the content.",\n\tposition: "bottom-right"\n})} style={{ marginRight: 5 }}>Bottom-right</Button>\n\n<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "Here some text for the content.",\n\tposition: "bottom-left"\n})} style={{ marginRight: 5 }}>Bottom-left</Button>'}
        />

        <ResultCode
            title="Timing"
            result={<>
                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "I won't close automatically. Click the close X",
                    hideDelay: "never"
                })} style={{ marginRight: 5 }}>Never closes</Button>

                <Button btnColor="blue" size="small" onClick={() => MessageBox.show({
                    title: "Hi there!",
                    content: "I close after one second, watch out!",
                    hideDelay: 1000
                })}>Closes after 1 second</Button>
            </>}
            code={'<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "I won\'t close automatically. Click the close X",\n\thideDelay: "never"\n})} style={{ marginRight: 5 }}>Never closes</Button>\n\n<Button btnColor="blue" size="small" onClick={() => MessageBox.show({\n\ttitle: "Hi there!",\n\tcontent: "I close after one second, watch out!",\n\thideDelay: 1000\n})}>Closes after 1 second</Button>'}
        />

        <p className="notes">Note: <span>the messagebox function returns a <strong>Closable</strong> object. You can put your message inside a variable and call <em>message.close()</em> to close it.</span></p>

        <Apis title="Function properties" data={[
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
                name: "hideIcon",
                desc: "Defines whether to show the title icon or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onClose",
                desc: "Function triggered when the user closes the message.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            }
        ]} />
    </>
}