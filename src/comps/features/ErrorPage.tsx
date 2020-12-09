import React from "react"
import { goTo } from "../../commons/utility"
import Button from "../layout/Button"
import { ErrorCircleIcon, Icon } from "../layout/Icon"
import { ComponentsPaths } from "./ComponentsPaths"
import { history } from "../Navigator"
import { Dialog } from "../layout/Dialog"

export class ErrorPage extends React.Component{

    componentDidMount = () => document.body.classList.add("login")

    componentWillUnmount = () => document.body.classList.remove("login")

    render = (): JSX.Element => {
        return <div>
            <Dialog title={<span>
                <ErrorCircleIcon color="var(--red)" /> Pagina non trovata!
            </span>} visible hideFooter className="dialog-404">
                <div>Ci dispiace, ma la pagina a cui stai tentando di accedere non esiste.</div>
                
                <div className="d-flex mt-3">
                    <Button onClick={history.goBack} textBtn btnColor="grey">
                        <Icon iconKey="arrow-left" /> Torna indietro
                    </Button>

                    <Button onClick={() => goTo(ComponentsPaths.SITE_BASE)} btnColor="blue" smallBtn className="ml-auto">
                        <Icon iconKey="shield-check" /> Torna al sicuro
                    </Button>
                </div>
            </Dialog>
        </div>
    }
}