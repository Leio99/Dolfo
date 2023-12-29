import React from "react"
import Button from "../layout/Button"
import { FullLoader } from "../layout/FullLoader"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class FullpageLoaderPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a loader showing on the entire page.</WhenToUse>
        <Usage notes={<>this component can only be rendered by calling a function (<em>FullLoader.show(params)</em>)</>} />

        <ResultCode
            title="Simple loader"
            result={<Button btnColor="blue" size="small" onClick={() => {
                const loader = FullLoader.show()

                setTimeout(loader.close, 1000)
            }}>Click to show</Button>}
            code={'<Button btnColor="blue" size="small" onClick={() => {\n\tconst loader = FullLoader.show()\n\n\tsetTimeout(loader.close, 1000)\n}}>Click to show</Button>'}
        />

        <ResultCode
            title="Balls loader"
            result={<Button btnColor="blue" size="small" onClick={() => {
                const loader = FullLoader.show({ type: "balls" })

                setTimeout(loader.close, 1000)
            }}>Click to show</Button>}
            code={'<Button btnColor="blue" size="small" onClick={() => {\n\tconst loader = FullLoader.show({ type: "balls" })\n\n\tsetTimeout(loader.close, 1000)\n}}>Click to show</Button>'}
        />

        <ResultCode
            title="Loading text"
            result={<Button btnColor="blue" size="small" onClick={() => {
                const loader = FullLoader.show({ type: "balls", loadingText: "The website is loading..." })

                setTimeout(loader.close, 1000)
            }}>Click to show</Button>}
            code={'<Button btnColor="blue" size="small" onClick={() => {\n\tconst loader = FullLoader.show({ type: "balls", loadingText: "The website is loading..." })\n\n\tsetTimeout(loader.close, 1000)\n}}>Click to show</Button>'}
        />

        <p className="notes">Note: <span>the full loader function returns a <strong>Closable</strong> object. You can put your loader inside a variable and call <em>loader.close()</em> to close it.</span></p>

        <Apis title="Function properties" data={[
            {
                name: "loadingText",
                desc: "Custom loading text.",
                type: "string",
                required: false,
                default: "null (text not shown)"
            },
            {
                name: "type",
                desc: "Defines loading type (circles or balls).",
                type: "string (circle, ball)",
                required: false,
                default: "circle"
            }
        ]} />
    </>
}