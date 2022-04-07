export class Closable{
    private readonly _close: () => void

    constructor(closeFn: () => void){
        this._close = closeFn
    }

    get close(){
        return this._close
    }
}