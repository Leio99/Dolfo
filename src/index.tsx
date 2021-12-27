import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./index.scss"
import { MenuContent } from "./comps/MenuContent"
import { checkDarkTheme } from "./comps/shared/utility"
import { initializeTooltips } from "./comps/layout/Tooltip"

ReactDOM.render(<MenuContent />, document.getElementById("root"))

serviceWorker.unregister()

checkDarkTheme()

initializeTooltips()