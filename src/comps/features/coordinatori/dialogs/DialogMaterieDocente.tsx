import React from "react"
import { LoadingIconCentered } from "../../../../commons/utility"
import { MaterieService } from "../../../../services/MaterieService"
import { ComponentAsDialogProps, Dialog } from "../../../layout/Dialog"
import { CheckIcon } from "../../../layout/Icon"
import { ComponentsPermissions } from "../../ComponentsPermissions"

export interface IProps extends ComponentAsDialogProps{
    readonly materie: number[]
}
export interface IState{
    readonly materie: any[]
}

export class DialogMaterieDocente extends React.PureComponent<IProps, IState>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    constructor(props: IProps){
        super(props)

        this.state = {
            materie: null
        }
    }

    componentDidMount = () => {
        MaterieService.getMaterie(this.session.idCorso).then(response => {
            this.setState({
                materie: response.data.filter((m: any) => this.props.materie.includes(m.idMateria))
            })
        })
    }

    render = (): JSX.Element => {
        const { materie } = this.state

        return <Dialog title="Materie insegnate" visible clickOutside overflows={!!materie} hideCancel onClose={this.props.close} onOk={this.props.close} okType="blue">
            {
                materie ? <div>
                    {
                        materie.map(m => <div className="p-1">
                            <CheckIcon color="var(--green)" className="float-right" />
                            {m.nome}
                        </div>)
                    }
                </div> : <LoadingIconCentered />
            }
        </Dialog>
    }
}