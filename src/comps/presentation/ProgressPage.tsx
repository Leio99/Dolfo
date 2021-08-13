import React from "react"
import { Progress } from "../layout/Progress"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class ProgressPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a progress to show statistic.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple progress"
            result={<Progress percent={65} />}
            code={'<Progress percent={65} />'}
        />

        <ResultCode
            title="Size"
            result={<>
                <Progress percent={50} barSize="small" />
                <Progress percent={50} barSize="medium" />
                <Progress percent={50} barSize="large" />
            </>}
            code={'<Progress percent={50} barSize="small" />\n<Progress percent={50} barSize="medium" />\n<Progress percent={50} barSize="large" />'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Progress percent={50} color="red" />
                <Progress percent={50} color="orange" />
                <Progress percent={50} color="green" />
                <Progress percent={50} color="black" />
                <Progress percent={50} color="grey" />
                <Progress percent={50} color="blue" />
                <Progress percent={50} color="darkblue" />
            </>}
            code={'<Progress percent={50} color="red" />\n<Progress percent={50} color="orange" />\n<Progress percent={50} color="green" />\n<Progress percent={50} color="black" />\n<Progress percent={50} color="grey" />\n<Progress percent={50} color="blue" />\n<Progress percent={50} color="darkblue" />'}
        />

        <ResultCode
            title="Loading"
            result={<>
                <Progress percent={10} loading />
                <Progress percent={65} loading loadingText="Wait please..." />
            </>}
            code={'<Progress percent={10} loading />\n<Progress percent={65} loading loadingText="Wait please..." />'}
        />

        <ResultCode
            title="Circle"
            result={<Progress percent={10} circular />}
            code={'<Progress percent={10} circular />'}
        />

        <ResultCode
            title="Custom text"
            result={<Progress percent={10} circular customCircleText="Hello" />}
            code={'<Progress percent={10} circular customCircleText="Hello" />'}
        />

        <ResultCode
            title="Custom size"
            result={<Progress percent={10} circular circleWidth={100} />}
            code={'<Progress percent={10} circular circleWidth={100} />'}
        />

        <ResultCode
            title="Colors"
            result={<>
                <Progress percent={50} color="red" circular />
                <Progress percent={50} color="orange" circular />
                <Progress percent={50} color="green" circular />
                <Progress percent={50} color="black" circular />
                <Progress percent={50} color="grey" circular />
                <Progress percent={50} color="blue" circular />
                <Progress percent={50} color="darkblue" circular />
            </>}
            code={'<Progress percent={50} color="red" circular />\n<Progress percent={50} color="orange" circular />\n<Progress percent={50} color="green" circular />\n<Progress percent={50} color="black" circular />\n<Progress percent={50} color="grey" circular />\n<Progress percent={50} color="blue" circular />\n<Progress percent={50} color="darkblue" circular />'}
        />

        <Apis data={[
            {
                name: "percent",
                desc: "The percent of the progress.",
                type: "number (from 0 to 100)",
                required: true
            },
            {
                name: "color",
                desc: "Defines the progress bar color.",
                type: "string (red, blue, darkblue, orange, grey, black, green)",
                required: false,
                default: "darkblue"
            },
            {
                name: "barSize",
                desc: "If 'circular' is false, defines the bar size.",
                type: "string (small, medium, large)",
                required: false,
                default: "small"
            },
            {
                name: "loading",
                desc: "Defines whether the progress is loading or not (only if not 'circular').",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "loadingText",
                desc: "Defines a custom loading text (only if not 'circular').",
                type: "string or JSX",
                required: false,
                default: "null (shows loading icon)"
            },
            {
                name: "circular",
                desc: "If true, the progress is shown as a circle.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "circleWidth",
                desc: "If 'circular' is true, defines the circle width.",
                type: "number",
                required: false,
                default: "150"
            },
            {
                name: "customCircleText",
                desc: "If 'circular' is true, defines a custom text inside the circle.",
                type: "string or JSX",
                required: false,
                default: "null (shows percentage)"
            },
            {
                name: "convertCommas",
                desc: "If the percentage has decimals, shows commas instead of dots to separate decimals.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "className",
                desc: "Additional className to apply to the progress.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}