import React from "react"
import ReactDOM from "react-dom/client"
import * as serviceWorker from "./serviceWorker"
import "./index.scss"
import { MenuContent } from "./comps/MenuContent"
import { checkDarkTheme } from "./comps/shared/utility"
import { initializeTooltips } from "./comps/layout/Tooltip"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<MenuContent />)

serviceWorker.unregister()

checkDarkTheme()

initializeTooltips()