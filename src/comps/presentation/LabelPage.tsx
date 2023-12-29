import React from "react"
import { Label } from "../layout/Label"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class LabelPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render an alert message.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple label"
            result={<Label>Here is a label</Label>}
            code={'<Label>Here is a label</Label>'}
        />

        <ResultCode
            title="Size"
            result={<>
                <Label size="small">Small label</Label>
                <br />
                <Label>Normal label</Label>
                <br />
                <Label size="big">Big label</Label>
            </>}
            code={'<Label size="small">Small label</Label>\n\n<Label>Normal label</Label>\n\n<Label size="big">Big label</Label>'}
        />
        <ResultCode
            title="Colors"
            result={<>
                <Label color="black">Black label</Label>
                <br />
                <Label color="red">Red label</Label>
                <br />
                <Label color="green">Green label</Label>
                <br />
                <Label color="blue">Blue label</Label>
                <br />
                <Label color="darkblue">Darkblue label</Label>
                <br />
                <Label color="violet">Violet label</Label>
                <br />
                <Label color="white">White label</Label>
                <br />
                <Label color="orange">Orange label</Label>
                <br />
                <Label color="black">Black label</Label>
            </>}
            code={'<Label color="black">Black label</Label>\n\n<Label color="red">Red label</Label>\n\n<Label color="green">Green label</Label>\n\n<Label color="blue">Blue label</Label>\n\n<Label color="darkblue">Darkblue label</Label>\n\n<Label color="violet">Violet label</Label>\n\n<Label color="white">White label</Label>\n\n<Label color="orange">Orange label</Label>\n\n<Label color="black">Black label</Label>'}
        />

        <Apis data={[
            {
                name: "color",
                desc: "Determines the color of the label.",
                type: "string (red, blue, green, black, orange, grey, darkblue, white, violet)",
                required: false,
                default: "black"
            },
            {
                name: "size",
                desc: "Determines the size of the label.",
                type: "string (small, big)",
                required: false,
                default: "normal size"
            }
        ]} />
    </>
}