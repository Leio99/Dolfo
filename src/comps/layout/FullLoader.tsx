import React from "react"
import ReactDOM from "react-dom";

export class FullLoader extends React.Component{
    static show = () => {
        const loader = document.createElement("div");

        (loader as any).close = () => {
            loader.remove()
            document.body.classList.remove("dolfo-loader-showing")
        }

        loader.classList.add("dolfo-full-loader")
        document.body.classList.add("dolfo-loader-showing")
        document.body.appendChild(loader)

        ReactDOM.render(<div className="dolfo-full-loader-inner">
            <div className="circle-loading">
                <div className="circle-loading-inner"></div>
            </div>
        </div>, loader)

        return loader as { close?: () => void }
    }
}
