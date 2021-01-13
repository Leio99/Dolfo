import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { goTo, LoadingIconCentered } from "../../../commons/utility"
import { DocentiService } from "../../../services/DocentiService"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Dialog } from "../../layout/Dialog"
import { EditIcon, Icon } from "../../layout/Icon"
import { Components } from "../Components"
import { ComponentsPaths } from "../ComponentsPaths"
import { EditDocente } from "./EditDocente"
import { TabellaPresenzeDocente } from "./TabellaPresenzeDocente"
import { CardActions } from "../../layout/CardActions"

export interface IRouteParams{
    readonly id: string
}
export interface IState{
    readonly docente: any
}

export class DettaglioDocente extends React.PureComponent<RouteComponentProps<IRouteParams>, IState>{
    constructor(props: RouteComponentProps<IRouteParams>){
        super(props)

        this.state = {
            docente: null
        }
    }

    loadDocente = () => {
        const id = this.props.match.params.id

        if(isNaN(parseInt(id)))
            goTo(ComponentsPaths.PATH_GESTORI_HOME)

        DocentiService.getDocente(id).then(response => {
            this.setState({
                docente: response.data
            })
        }).catch(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
    }

    componentDidMount = this.loadDocente

    openModifica = () => {
        const dialog = Dialog.openDialog({
            title: Components[ComponentsPaths.PATH_GESTORI_EDIT_DOCENTE].pageTitle,
            content: <EditDocente {...this.props} onSave={() => {
                dialog.close()
                this.loadDocente()
            }} />,
            hideFooter: true,
            width: "70vw",
            icon: <Icon iconKey="user-edit" type="far" />
        })
    }

    render = (): JSX.Element => {
        const { docente } = this.state,
        idDocente = this.props.match.params.id

        if(!docente) return <LoadingIconCentered />

        return <div>
            <div className="row mx-0">
                <Card title={docente.ritirato && "Ritirato"} className="col-12 col-sm-6 mb-3">
                    <h2 className="text-uppercase mb-2 text-truncate">{docente.nome} {docente.cognome}</h2>

                    <div>
                        <Icon large type="far" iconKey="envelope" className="mr-1" /> <a data-tooltip="Invia e-mail" href={"mailto:" + docente.email}>{docente.email}</a>
                    </div>

                    <CardActions className="text-right">
                        <Button textBtn onClick={this.openModifica} btnColor="orange" tooltip="Modifica">
                            <EditIcon large />
                        </Button>
                    </CardActions>
                </Card>
            </div>

            <TabellaPresenzeDocente idDocente={parseInt(idDocente)} refreshDocente={this.loadDocente} />
        </div>
    }
}