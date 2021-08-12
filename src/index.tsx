import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./index.scss"
import { MenuContent } from "./comps/MenuContent"

ReactDOM.render(<MenuContent />, document.getElementById("root"))

serviceWorker.unregister()