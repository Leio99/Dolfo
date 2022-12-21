import React from "react"
import { createRoot } from "react-dom/client"
import * as serviceWorker from "./serviceWorker"
import "./index.scss"
import { MenuContent } from "./comps/MenuContent"
import { checkDarkTheme } from "./comps/shared/utility"
import { useLocation, useNavigate } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"

const WrappedComponent = () => {
    const history: any = useNavigate(),
    location = useLocation()
  
    return <MenuContent history={history} location={location} />
}

createRoot(document.getElementById("root")).render(<BrowserRouter>
    <WrappedComponent />
</BrowserRouter>)

serviceWorker.unregister()

checkDarkTheme()