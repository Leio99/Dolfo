import { Tabellable } from "./Tabellable";

export interface Docente extends Tabellable{
    readonly id?: number
    readonly idEnte?: number
    readonly nome: string
    readonly cognome: string
    readonly cf: string
    readonly email: string
    readonly ritirato?: boolean
}