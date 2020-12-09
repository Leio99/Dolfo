import React from "react"
import { goTo } from "../../commons/utility"
import Button from "../layout/Button"
import { ErrorCircleIcon, Icon } from "../layout/Icon"
import { ComponentsPaths } from "./ComponentsPaths"

export class ErrorPage extends React.Component{

    componentDidMount = () => document.body.classList.add("login")

    componentWillUnmount = () => document.body.classList.remove("login")

    render = (): JSX.Element => {
        return <div className="floating-centered shadow p-4 rounded bg-white col-10 col-md-7 col-lg-4">
            <h3>
                <ErrorCircleIcon color="var(--red)" /> Pagina non trovata!
            </h3>
            <div>Ci dispiace, ma la pagina a cui stai tentando di accedere non esiste.</div>
            
            <div className="text-right mt-3">
                <Button onClick={() => goTo(ComponentsPaths.SITE_BASE)} btnColor="blue" smallBtn>
                    <Icon iconKey="shield-check" /> Torna al sicuro
                </Button>
            </div>
        </div>
    }
}