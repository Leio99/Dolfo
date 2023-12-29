import React from "react"
import { createRoot } from "react-dom/client"
import { Closable } from "../shared/models/Closable"

interface FullLoaderProps{ 
    readonly loadingText?: string, 
    readonly type?: "circle" | "balls"
}

export class FullLoader extends React.Component<FullLoaderProps>{
    componentDidMount = () => document.body.classList.add("dolfo-loader-showing")

    componentWillUnmount = () => document.body.classList.remove("dolfo-loader-showing")

    static show = (data?: FullLoaderProps): Closable => {
        const loader = document.createElement("div")
        let component: FullLoader

        document.body.appendChild(loader)

        createRoot(loader).render(<FullLoader ref={r => component = r} {...data} />)

        return new Closable(() => {
            component.componentWillUnmount()
            loader.remove()
        })
    }

    render = (): React.ReactNode => {
        const { props } = this

        return <div className="dolfo-full-loader">
            <div className="dolfo-full-loader-inner">
                {
                    props.type === "balls" ? <div className="balls-loading">
                        <div className="ball-inner"></div>
                    </div> : <div className="circle-loading">
                        <div className="circle-loading-inner"></div>
                    </div>
                }

                {props.loadingText && <span className="loading-text">{props.loadingText}</span>}
            </div>
        </div>
    }
}

export const showFullLoader = FullLoader.show