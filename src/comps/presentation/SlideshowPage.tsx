import React from "react"
import { Slide, SlideShow } from "../layout/SlideShow"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class SlideshowPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render an image or slide show.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple slideshow"
            result={<SlideShow>
                <Slide>
                    <h3>Hi there!</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>
                </Slide>
                <Slide imageUrl="https://designwoop.com/uploads/2012/03/19_free_subtle_textures_3px_tile.jpg" style={{ color: "white" }}>
                    <h3>I am the second slide!</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>
                </Slide>
            </SlideShow>}
            code={'<SlideShow>\n\t<Slide>\n\t\t<h3>Hi there!</h3>\n\t\t<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>\n\t</Slide>\n\t<Slide imageUrl="https://designwoop.com/uploads/2012/03/19_free_subtle_textures_3px_tile.jpg" style={{ color: "white" }}>\n\t\t<h3>I am the second slide!</h3>\n\t\t<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>\n\t\t<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>\n\t\t<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>\n\t\t<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione at suscipit quam repellendus similique nesciunt consequuntur odio velit expedita est. Cupiditate quia eos molestiae quasi nemo aperiam explicabo non temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam ad odit fugiat perferendis, quisquam nam architecto unde voluptatem illo repellat, provident, nisi amet saepe deleniti aliquid impedit natus aperiam.</p>\n\t</Slide>\n</SlideShow>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single slides to show.",
                type: "Slide",
                required: true,
                onDoubleClick: () => goToApiBlock("#slideProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "automatic",
                desc: "Determines whether the slideshow should move automatically or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "className",
                desc: "Additional className for the slideshow.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the slideshow.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="slideProps" title="Slide properties" data={[
            {
                name: "imageUrl",
                desc: "Determines the background image URL.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "selected",
                desc: "Determines whether the slide should be selected by default or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "className",
                desc: "Additional className for the slide.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the slide.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}