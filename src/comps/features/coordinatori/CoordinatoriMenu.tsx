import React from "react"
import { Icon } from "../../layout/Icon"
import { MenuItem } from "../../layout/MenuItem"
import { SideMenu } from "../../layout/SideMenu"
import { SubMenu } from "../../layout/SubMenu"
import { history } from "../../Navigator"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IProps{
    readonly currentPath: string
    readonly isHidden?: boolean
    readonly toggleMenu: () => void
    readonly opened?: boolean
}

export class CoordinatoriMenu extends React.PureComponent<IProps>{
    destroySession = () => {
        sessionStorage.removeItem("sessionCoordinatore")
        ComponentsPermissions.checkPermissionCoordinatore()
    }

    render = (): JSX.Element => {
        const props = this.props

        if(props.isHidden) return <div></div>

        return <SideMenu onToggle={props.toggleMenu} opened={props.opened}>
            <img src="https://i.imgur.com/5Z1DbN7.png" height="100" className="my-4 mx-auto d-block" style={{ filter: "drop-shadow(1.5px 0 0 #fff) drop-shadow(-.7px 0 0 #fff) drop-shadow(0 -1px 0 #fff) drop-shadow(0 1.5px 0 #fff)" }} alt="" />

            <MenuItem selected={props.currentPath === ComponentsPaths.PATH_COORDINATORI_HOME} onClick={() => history.push(ComponentsPaths.PATH_COORDINATORI_HOME)}>
                <Icon iconKey="home-alt" className="mr-2" /> Home
            </MenuItem>

            <SubMenu text={<span>
                <Icon iconKey="users-class" className="mr-2" /> Studenti
            </span>} opened={props.currentPath.indexOf(ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI) >= 0}>
                <MenuItem selected={props.currentPath === ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI} onClick={() => history.push(ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI)}>Lista studenti</MenuItem>
                <MenuItem selected={props.currentPath === ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE} onClick={() => history.push(ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE)}>Aggiungi</MenuItem>
            </SubMenu>

            <SubMenu text={<span>
                <Icon iconKey="chalkboard-teacher" className="mr-2" /> Docenti
            </span>}>
                <MenuItem>Lista docenti</MenuItem>
                <MenuItem>Aggiungi</MenuItem>
            </SubMenu>

            <MenuItem>
                <Icon iconKey="list-alt" className="mr-2" /> Materie
            </MenuItem>

            <SubMenu text={<span>
                <Icon iconKey="wrench" className="mr-2" /> Funzioni
            </span>}>
                <MenuItem>Configura calendario</MenuItem>
                <MenuItem>Firma da remoto</MenuItem>
            </SubMenu>

            <MenuItem>
                <Icon iconKey="book-reader" className="mr-2" /> Documentazione
            </MenuItem>

            <MenuItem onClick={this.destroySession}>
                <Icon iconKey="power-off" className="mr-2" /> Esci
            </MenuItem>
        </SideMenu>
    }
}