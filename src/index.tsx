import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom"
import { MenuContent } from "./comps/MenuContent"
import { checkDarkTheme } from "./comps/shared/utility"
import "./index.scss"

const WrappedComponent = () => {
    const history: any = useNavigate(),
    location = useLocation()
  
    return <MenuContent history={history} location={location} />
}

createRoot(document.getElementById("root")).render(<BrowserRouter>
    <WrappedComponent />
</BrowserRouter>)

checkDarkTheme()