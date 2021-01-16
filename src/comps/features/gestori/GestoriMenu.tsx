import React from "react"
import { goTo } from "../../../commons/utility"
import { LogoCorsoMenu } from "../altro/LogoCorsoMenu"
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

    render = (): JSX.Element => {
        const props = this.props,
        Item = (props: { path: string, children: any }) => <MenuItem {...props} {...this.getMenuItemProps(props.path)} />

        return <SideMenu onToggle={props.toggleMenu} opened={props.opened}>
            <LogoCorsoMenu />

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