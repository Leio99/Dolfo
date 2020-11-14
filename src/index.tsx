import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import * as serviceWorker from "./serviceWorker"
import { Navigator } from "./comps/Navigator"

ReactDOM.render(<Navigator />, document.getElementById("root"))

serviceWorker.unregister()
