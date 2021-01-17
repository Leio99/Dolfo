import React from "react"
import ReactDOM from "react-dom";
import { Icon } from "./Icon";

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
            <Icon iconKey="spinner-third" type="fal" className="dolfo-full-loader-icon fa-9x" spinning />
        </div>, loader)

        return loader as { close?: () => void }
    }
}