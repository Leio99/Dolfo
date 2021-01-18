import { ListaStudenti } from "./gestori/ListaStudenti"
import { TestLayout } from "../TestLayout"
import { IComponentList } from "../../models/IComponent"
import { ComponentsPaths } from "./ComponentsPaths"
import { ComponentsPermissions } from "./ComponentsPermissions"
import { LoginGestore } from "./gestori/LoginGestore"
import { HomeGestore } from "./gestori/HomeGestore"
import { AddStudente } from "./gestori/AddStudente"
import { EditStudente } from "./gestori/EditStudente"
import { ImportaStudenti } from "./gestori/ImportaStudenti"
import { DettaglioStudente } from "./gestori/DettaglioStudente"
import { goTo } from "../../commons/utility"
import { AddDocente } from "./gestori/AddDocente"
import { ListaDocenti } from "./gestori/ListaDocenti"
import { EditDocente } from "./gestori/EditDocente"
import { DettaglioDocente } from "./gestori/DettaglioDocente"
import { ErrorPage } from "./altro/ErrorPage"
import { ConfigCalendario } from "./gestori/ConfigCalendario"

export const Components: IComponentList = {
    [ComponentsPaths.PATH_GESTORI]: {
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathGestore
    },
    [ComponentsPaths.PATH_GESTORI + "/"]: {
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathGestore
    },
    [ComponentsPaths.PATH_GESTORI_LOGIN]: {
        hideMenu: true,
        Component: LoginGestore,
        permission: ComponentsPermissions.checkLoginGestore
    },
    [ComponentsPaths.PATH_GESTORI_HOME]: {
        Component: HomeGestore,
        pageTitle: "Homepage",
        permission: ComponentsPermissions.checkPermissionGestore
    },
    [ComponentsPaths.PATH_GESTORI_ADD_STUDENTE]: {
        Component: AddStudente,
        pageTitle: "Nuovo studente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI]: {
        Component: ListaStudenti,
        pageTitle: "Tutti gli studenti",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_HOME
    },
    [ComponentsPaths.PATH_GESTORI_IMPORT_STUDENTI]: {
        Component: ImportaStudenti,
        pageTitle: "Importa studenti",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_ADD_STUDENTE
    },
    [ComponentsPaths.PATH_GESTORI_DETAILS_STUDENTE]: {
        Component: DettaglioStudente,
        pageTitle: "Dettaglio studente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_GESTORI_EDIT_STUDENTE]: {
        Component: EditStudente,
        pageTitle: "Modifica studente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI]: {
        Component: ListaDocenti,
        pageTitle: "Tutti i docenti",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_HOME
    },
    [ComponentsPaths.PATH_GESTORI_ADD_DOCENTE]: {
        Component: AddDocente,
        pageTitle: "Nuovo docente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI
    },
    [ComponentsPaths.PATH_GESTORI_EDIT_DOCENTE]: {
        Component: EditDocente,
        pageTitle: "Modifica docente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI
    },
    [ComponentsPaths.PATH_GESTORI_DETAILS_DOCENTE]: {
        Component: DettaglioDocente,
        pageTitle: "Dettaglio docente",
        permission: ComponentsPermissions.checkPermissionGestore,
        parentKey: ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI
    },
    [ComponentsPaths.SITE_BASE + "layout"]: {
        Component: TestLayout,
        pageTitle: "Layout di test"
    },
    [ComponentsPaths.SITE_BASE]: {
        pageTitle: "Layout di test",
        permission: () => goTo(ComponentsPaths.SITE_BASE + "layout")
    },
    [ComponentsPaths.PATH_GESTORI_CONFIG_CALENDAR]: {
        pageTitle: "Calendario",
        Component: ConfigCalendario,
        parentKey: ComponentsPaths.PATH_GESTORI_HOME,
        permission: ComponentsPermissions.checkPermissionGestore
    },
    [ComponentsPaths.ERROR_404_PATH]: {
        hideMenu: true,
        Component: ErrorPage
    }
}