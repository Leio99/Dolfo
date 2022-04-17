import React from "react"
import { createRoot } from "react-dom/client"
import * as serviceWorker from "./serviceWorker"
import "./index.scss"
import { MenuContent } from "./comps/MenuContent"
import { checkDarkTheme } from "./comps/shared/utility"

createRoot(document.getElementById("root")).render(<MenuContent />)

serviceWorker.unregister()

checkDarkTheme()