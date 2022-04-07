import React from "react"
import { createRoot } from "react-dom/client"
import { Closable } from "../shared/models/Closable"

interface FullLoaderProps{ 
    readonly loadingText?: string, 
    readonly type?: "circle" | "balls"
}

export class FullLoader extends React.Component{
    static show = (data?: FullLoaderProps): Closable => {
        const loader = document.createElement("div"),
        close = () => {
            loader.remove()
            document.body.classList.remove("dolfo-loader-showing")
        }

        loader.classList.add("dolfo-full-loader")
        document.body.classList.add("dolfo-loader-showing")
        document.body.appendChild(loader)

        createRoot(loader).render(<div className="dolfo-full-loader-inner">
            {
                data?.type === "balls" ? <div className="balls-loading">
                    <div className="ball-inner"></div>
                </div> : <div className="circle-loading">
                    <div className="circle-loading-inner"></div>
                </div>
            }

            {data?.loadingText && <span className="loading-text">{data.loadingText}</span>}
        </div>)

        return new Closable(close)
    }
}

export const showFullLoader = FullLoader.show