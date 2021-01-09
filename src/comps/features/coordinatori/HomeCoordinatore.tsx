import React from "react"
import { copyToClipBoard } from "../../../commons/utility"
import { Option } from "../../form/Option"
import Select from "../../form/Select"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import { DialogListaEdizioni } from "./dialogs/DialogListaEdizioni"
import { ListaPresenzeDaConfermare } from "./ListaPresenzeDaConfermare"

export interface IState{
    readonly listaEdizioni: any[]
}

export class HomeCoordinatore extends React.PureComponent<undefined, IState>{
    constructor(){
        super(undefined)

        this.state = {
            listaEdizioni: null
        }
    }

    reloadEdizioni = () =>  {
        this.setState({ listaEdizioni: null })
        setTimeout(() => this.setState({ listaEdizioni: [
            { desc: "Edizione 1", id: 1 },
            { desc: "Edizione 2", id: 2 }
        ] }), 2000)
    }
    
    componentDidMount = this.reloadEdizioni
    
    changeEdizione = (value: number) => {
        // deve avvenire lato server ed essere salvata nella sessione,
        // ed usata per tutte le chiamate che hanno bisogno dell'idEnte
        this.reloadEdizioni()
    }

    objectsAreSame = (x: any, y: any) => {
        let objectsAreSame = true

        for(const propertyName in x){
           if(x[propertyName] !== y[propertyName]){
              objectsAreSame = false
              break
           }
        }

        return objectsAreSame
     }

    openGestisciEdizioni = () => {
        Dialog.openDialogComponent(DialogListaEdizioni, {
            idEnte: null,
            reloadEdizioni: (newList: any[]) => {
                const current = this.state.listaEdizioni
                let areEqual = newList.length === current.length
                newList?.forEach((e, i) => {
                    if(!this.objectsAreSame(e, current[i])) areEqual = false
                })
                
                if(!areEqual) this.reloadEdizioni()
            }
        })
    }

    render = (): JSX.Element => {
        const { listaEdizioni } = this.state

        return <div>
            <Card title="Dati generali" className="mb-3">
                <div className="float-right col-md-4 px-0">
                    <Button textBtn btnColor="blue" tooltip="Gestisci edizioni" onClick={this.openGestisciEdizioni}>
                        <Icon iconKey="wrench" large />
                    </Button>

                    <Select label="Cambia edizione" className="d-inline-block ml-3" defaultValue={2} loading={!listaEdizioni} onChange={this.changeEdizione} wrapperStyle={{ width: "calc(100% - 40px)"}}>
                        {
                            listaEdizioni?.map(e => <Option label={e.desc} value={e.id}></Option>)
                        }
                    </Select>
                </div>

                <h2 className="text-uppercase">Luca Arcangeli</h2>
                <span>
                    Codice di accesso alla firma: <strong>{56576675}</strong>
                    <Button tooltip="Copia il codice" textBtn btnColor="grey" className="ml-2 align-top" onClick={() => copyToClipBoard("56576675")}>
                        <Icon iconKey="copy" large />
                    </Button>
                </span>

                <div className="clearfix"></div>
            </Card>

            <ListaPresenzeDaConfermare />
        </div>
    }
}