import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { TestLayout } from "./comps/TestLayout"
import "./index.scss"

ReactDOM.render(<TestLayout />, document.getElementById("root"))

serviceWorker.unregister()
