import React from "react"
import { Display } from "../layout/Display"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class DisplayPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render some information displayer.</WhenToUse>
        <Usage />

        <ResultCode
            title="Single display"
            result={<Display>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>}
            code={'<Display>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>'}
        />

        <ResultCode
            title="Title"
            result={<Display title="Some title here">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>}
            code={'<Display title="Some title here">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Display title="Some title here" color="darkblue">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="violet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="red">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="green">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="orange">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
                <Display title="Some title here" color="grey">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>
            </>}
            code={'<Display title="Some title here" color="darkblue">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="violet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="red">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="green">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="orange">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>\n<Display title="Some title here" color="grey">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aspernatur, molestiae ducimus consectetur temporibus quisquam eius eos assumenda itaque consequuntur nisi iure aliquam quasi alias, atque quis. Nemo, aliquam iste.</Display>'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The display title.",
                type: "string or ReactNode",
                required: false,
                default: "null"
            },
            {
                name: "color",
                desc: "Defines the display color.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "blue"
            },
            {
                name: "style",
                desc: "Additional display style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional display className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}