import React from "react"
import { goTo } from "../../../commons/utility"
import { Dialog } from "../../layout/Dialog"
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

export class GestoriMenu extends React.PureComponent<IProps>{
    getMenuItemProps = (path: string) => {
        return {
            selected: this.props.currentPath === path,
            onClick: () => goTo(path)
        }
    }

    isInPath = (path: string) => this.props.currentPath.indexOf(path) >= 0

    openInfoDialog = () => {
        Dialog.openDialog({
            type: "info",
            title: "Informazioni",
            clickOutside: true,
            okType: "blue",
            width: "400px",
            content: <div>
                <div>
                    <strong>Versione:</strong> 1.0
                </div>
                <div>
                    &copy; Copyright {new Date().getFullYear()} 
                </div>
                <div className="text-center mt-2">
                    <Icon iconKey="font-awesome-flag" type="fab" tooltip="FontAwesome" color="#339af0" className="mx-1" large />
                    <Icon iconKey="bootstrap" type="fab" tooltip="Bootstrap" color="#7952b3" className="mx-1" large />
                    <Icon iconKey="google" type="fab" tooltip="Google API" className="mx-1" large />
                </div>
            </div>
        })
    }

    render = (): JSX.Element => {
        const props = this.props,
        Item = (props: { path: string, children: any }) => <MenuItem {...props} {...this.getMenuItemProps(props.path)} />

        return <SideMenu onToggle={props.toggleMenu} opened={props.opened}>
            <img src="/images/menu-logo.png" className="menu-logo" alt="menu-logo" onClick={this.openInfoDialog} /> 

            <Item path={ComponentsPaths.PATH_GESTORI_HOME}>
                <Icon iconKey="home-alt" className="mr-2" /> Home
            </Item>

            <SubMenu text={<span>
                <Icon iconKey="users-class" className="mr-2" /> Studenti
            </span>} opened={this.isInPath(ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI)}>
                <Item path={ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI}>Lista studenti</Item>
                <Item path={ComponentsPaths.PATH_GESTORI_ADD_STUDENTE}>Aggiungi</Item>
                <Item path={ComponentsPaths.PATH_GESTORI_IMPORT_STUDENTI}>Importa</Item>
            </SubMenu>

            <SubMenu text={<span>
                <Icon iconKey="chalkboard-teacher" className="mr-2" /> Docenti
            </span>} opened={this.isInPath(ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI)}>
                <Item path={ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI}>Lista docenti</Item>
                <Item path={ComponentsPaths.PATH_GESTORI_ADD_DOCENTE}>Aggiungi</Item>
            </SubMenu>

            <SubMenu text={<span>
                <Icon iconKey="wrench" className="mr-2" /> Funzioni
            </span>} opened={this.isInPath(ComponentsPaths.PATH_GESTORI_FUNZIONI)}>
                <Item path={ComponentsPaths.PATH_GESTORI_CONFIG_CALENDAR}>Configura calendario</Item>
            </SubMenu>

            <Item path="">
                <Icon iconKey="book-reader" className="mr-2" /> Documentazione
            </Item>

            <MenuItem onClick={ComponentsPermissions.destroySessionGestore}>
                <Icon iconKey="power-off" className="mr-2" /> Esci
            </MenuItem>
        </SideMenu>
    }
}