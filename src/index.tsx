import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import NavContainer from "./comps/Navigator"
import "./index.scss"
import { store } from "./commons/Redux"

ReactDOM.render(<Provider store={store}>
    <NavContainer />
</Provider>, document.getElementById("root"))

serviceWorker.unregister()
