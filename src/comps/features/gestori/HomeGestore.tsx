import React from "react"
import { EdizioniService } from "../../../services/EdizioniService"
import { GestoriService } from "../../../services/GestoriService"
import { Option } from "../../form/Option"
import Select from "../../form/Select"
import Button from "../../layout/Button"
import { Card } from "../../layout/Card"
import { Dialog } from "../../layout/Dialog"
import { Icon } from "../../layout/Icon"
import { ComponentsPermissions } from "../ComponentsPermissions"
import { DialogListaEdizioni } from "./dialogs/DialogListaEdizioni"
import { ListaPresenzeDaConfermare } from "./ListaPresenzeDaConfermare"

export interface IState{
    readonly listaEdizioni: any[]
    readonly defaultEdizione: number
}

export class HomeGestore extends React.PureComponent<undefined, IState>{
    readonly session = ComponentsPermissions.getLoginGestore()

    constructor(){
        super(undefined)

        this.state = {
            listaEdizioni: null,
            defaultEdizione: null
        }
    }

    reloadEdizioni = () =>  {
        this.setState({ listaEdizioni: null })

        GestoriService.getLastEdizione(this.session.idGestore).then(response => {
            const defaultEdizione = response.data
            
            EdizioniService.getByGestore(this.session.idGestore).then(response2 => {
                this.setState({ listaEdizioni: response2.data, defaultEdizione })
            })
        })
    }
    
    componentDidMount = this.reloadEdizioni
    
    changeEdizione = (value: number) => {
        this.setState({ defaultEdizione: null })
        GestoriService.changeEdizione(this.session.idGestore, value).then(() => {
            this.setState({ defaultEdizione: value })
        })
    }

    objectsAreSame = (x: any, y: any) => {
        let objectsAreSame = true
        console.log(x, y)
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
            idGestore: this.session.idGestore,
            reloadEdizioni: (newList: any[]) => {
                const current = this.state.listaEdizioni
                let areEqual = newList.length === current.length
                areEqual && newList?.forEach((e, i) => {
                    if(!this.objectsAreSame(e, current[i])) areEqual = false
                })
                
                if(!areEqual) this.reloadEdizioni()
            }
        })
    }

    render = (): JSX.Element => {
        const { listaEdizioni, defaultEdizione } = this.state
        
        return <div>
            <Card title="Dati generali" className="mb-3">
                <div className="float-right col-md-4 px-0">
                    <Button textBtn btnColor="blue" tooltip="Gestisci edizioni" onClick={this.openGestisciEdizioni}>
                        <Icon iconKey="wrench" large />
                    </Button>

                    <Select label="Cambia edizione" className="d-inline-block ml-3" defaultValue={defaultEdizione} loading={!listaEdizioni || !defaultEdizione} onChange={this.changeEdizione} wrapperStyle={{ width: "calc(100% - 40px)"}}>
                        <Option label="Non selezionata" value={-1} />

                        {
                            listaEdizioni?.map(e => <Option label={e.descrizione} value={e.id}></Option>)
                        }
                    </Select>
                </div>

                <h2 className="text-uppercase">{this.session.descrizione}</h2>

                <div className="clearfix"></div>
            </Card>

            <ListaPresenzeDaConfermare />
        </div>
    }
}