import React from "react"
import { goTo } from "../../../commons/utility"
import { LogoCorsoMenu } from "../LogoCorsoMenu"
import { Icon } from "../../layout/Icon"
import { MenuItem } from "../../layout/MenuItem"
import { SideMenu } from "../../layout/SideMenu"
import { SubMenu } from "../../layout/SubMenu"
import { ComponentsPaths } from "../ComponentsPaths"
import { ComponentsPermissions } from "../ComponentsPermissions"

export interface IProps{
    readonly currentPath: string
    readonly toggleMenu: () => void
    readonly opened?: boolean
}

export class CoordinatoriMenu extends React.PureComponent<IProps>{
    readonly session = ComponentsPermissions.getLoginCoordinatore()

    destroySession = () => {
        sessionStorage.removeItem("sessionCoordinatore")
        ComponentsPermissions.checkPermissionCoordinatore()
    }

    getMenuItemProps = (path: string) => {
        return {
            selected: this.props.currentPath === path,
            onClick: () => goTo(path)
        }
    }

    isInPath = (path: string) => this.props.currentPath.indexOf(path) >= 0

    render = (): JSX.Element => {
        const props = this.props

        return <SideMenu onToggle={props.toggleMenu} opened={props.opened}>
            <LogoCorsoMenu session={this.session} />

            <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_HOME)}>
                <Icon iconKey="home-alt" className="mr-2" /> Home
            </MenuItem>

            <SubMenu text={<span>
                <Icon iconKey="users-class" className="mr-2" /> Studenti
            </span>} opened={this.isInPath(ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI)}>
                <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI)}>Lista studenti</MenuItem>
                <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE)}>Aggiungi</MenuItem>
                <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_IMPORT_STUDENTI)}>Importa</MenuItem>
            </SubMenu>

            <SubMenu text={<span>
                <Icon iconKey="chalkboard-teacher" className="mr-2" /> Docenti
            </span>} opened={this.isInPath(ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI)}>
                <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI)}>Lista docenti</MenuItem>
                <MenuItem {...this.getMenuItemProps(ComponentsPaths.PATH_COORDINATORI_ADD_DOCENTE)}>Aggiungi</MenuItem>
            </SubMenu>

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