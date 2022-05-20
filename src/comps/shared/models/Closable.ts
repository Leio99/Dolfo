export class Closable{
    private readonly _close: () => void
    private _isClosed = false

    constructor(closeFn?: () => void){
        this._close = () => {
            closeFn && closeFn()
            this._isClosed = true
        }
    }

    get close(){
        return this._close
    }

    get isClosed(){
        return this._isClosed
    }
}