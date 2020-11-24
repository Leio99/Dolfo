import Axios, { AxiosResponse } from "axios";
import { Dialog } from "../comps/layout/Dialog";

export class ServerCall{
    static handleAuthFailed(promise: Promise<AxiosResponse<any>>){
        promise.catch(err => {
            if(err.response && err.response.data){
                const msg = typeof err.response.data === "string" ? err.response.data : "C'è stato un errore. Riprova."

                Dialog.infoDialog({
                    content: msg,
                    type: "error"
                })
            }
        })
    }

    static get(url: string): Promise<AxiosResponse<any>> {
        const promise = Axios.get(url)
        
        this.handleAuthFailed(promise)
        
        return promise
    }

    static post(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.post(url, body)
        
        this.handleAuthFailed(promise)
        
        return promise
    }

    static put(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.put(url, body)
        
        this.handleAuthFailed(promise)
        
        return promise
    }

    static delete(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.delete(url, body)
        
        this.handleAuthFailed(promise)
        
        return promise
    }
}