export class ComponentsPaths{
    static SITE_BASE = "/"
    static ERROR_404_PATH = "404"
    static PATH_GESTORI = ComponentsPaths.SITE_BASE + "gestori"
    static PATH_GESTORI_LOGIN = ComponentsPaths.PATH_GESTORI + "/login"
    static PATH_GESTORI_HOME = ComponentsPaths.PATH_GESTORI + "/home"
    static PATH_GESTORI_LISTA_STUDENTI = ComponentsPaths.PATH_GESTORI + "/studenti"
    static PATH_GESTORI_ADD_STUDENTE = ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/new"
    static PATH_GESTORI_EDIT_STUDENTE_BASE = ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/edit"
    static PATH_GESTORI_EDIT_STUDENTE = ComponentsPaths.PATH_GESTORI_EDIT_STUDENTE_BASE + "/:id"
    static PATH_GESTORI_DETAILS_STUDENTE = ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/:id"
    static PATH_GESTORI_IMPORT_STUDENTI = ComponentsPaths.PATH_GESTORI_LISTA_STUDENTI + "/import"
    static PATH_GESTORI_LISTA_DOCENTI = ComponentsPaths.PATH_GESTORI + "/docenti"
    static PATH_GESTORI_ADD_DOCENTE = ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI + "/new"
    static PATH_GESTORI_EDIT_DOCENTE_BASE = ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI + "/edit"
    static PATH_GESTORI_EDIT_DOCENTE = ComponentsPaths.PATH_GESTORI_EDIT_DOCENTE_BASE + "/:id"
    static PATH_GESTORI_DETAILS_DOCENTE = ComponentsPaths.PATH_GESTORI_LISTA_DOCENTI + "/:id"
    static PATH_GESTORI_FUNZIONI = ComponentsPaths.PATH_GESTORI + "/funzioni"
    static PATH_GESTORI_CONFIG_CALENDAR = ComponentsPaths.PATH_GESTORI_FUNZIONI + "/calendario"
}