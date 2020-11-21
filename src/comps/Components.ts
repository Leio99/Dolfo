import { ListaStudenti } from "./ListaStudenti"
import { TestLayout } from "./TestLayout"

export const Components = {
    "/studenti": {
        COMPONENT: ListaStudenti,
        PAGE_TITLE: "Studenti del corso"
    },
    "/layout": {
        COMPONENT: TestLayout,
        PAGE_TITLE: "Layout di test"
    }
}