import { Tabellable } from "./Tabellable";

export interface Studente extends Tabellable{
    readonly id?: number
    readonly idEdizione?: number
    readonly nome: string
    readonly cognome: string
    readonly dataNascita: string
    readonly cf: string
    readonly email: string
    readonly frequenza?: number
    readonly promosso?: boolean
}