import React from "react"
import ReactDOM from "react-dom"
import { Closable } from "../shared/models/Closable"

export class FullLoader extends React.Component{
    static show = (data?: { loadingText?: string, type?: "circle" | "balls" }): Closable => {
        const loader = document.createElement("div");

        (loader as any).close = () => {
            loader.remove()
            document.body.classList.remove("dolfo-loader-showing")
        }

        loader.classList.add("dolfo-full-loader")
        document.body.classList.add("dolfo-loader-showing")
        document.body.appendChild(loader)

        ReactDOM.render(<div className="dolfo-full-loader-inner">
            {
                data?.type === "balls" ? <div className="balls-loading">
                    <div className="ball-inner"></div>
                </div> : <div className="circle-loading">
                    <div className="circle-loading-inner"></div>
                </div>
            }

            {data?.loadingText && <span className="loading-text">{data.loadingText}</span>}
        </div>, loader)

        return loader as Closable
    }
}