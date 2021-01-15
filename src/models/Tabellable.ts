import { IDataColumn } from "../comps/shared/models/IColumn";

export interface Tabellable extends IDataColumn{
    azioni?: JSX.Element
}