import { Tabellable } from "./Tabellable";

export interface Edizione extends Tabellable{
    readonly id?: number
    readonly idGestore?: number
    readonly descrizione: string
}