import Axios, { AxiosResponse } from "axios"
import { Dialog } from "../comps/layout/Dialog"

export class ServerCall{
    static handleFailed(promise: Promise<AxiosResponse<any>>){
        promise.catch(err => {
            if(err.response && err.response.data && typeof err.response.data === "string"){
                Dialog.infoDialog({
                    content: err.response.data,
                    type: "error"
                })
            }else{
                Dialog.infoDialog({
                    type: "error",
                    content: "C'è stato un errore. Riprova."
                })
            }
        })
    }

    static emptyCallResult = () =>  {
        return {
            then: () => {
                return {
                    catch: () => {}
                }
            },
            catch: () => {}
        }
    }

    static get(url: string): Promise<AxiosResponse<any>> {
        const promise = Axios.get(url)
        
        this.handleFailed(promise)
        
        return promise
    }

    static post(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.post(url, body)

        this.handleFailed(promise)
        
        return promise
    }

    static put(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.put(url, body)
        
        this.handleFailed(promise)
        
        return promise
    }

    static delete(url: string, body: any): Promise<AxiosResponse<any>> {
        const promise = Axios.delete(url, body)
        
        this.handleFailed(promise)
        
        return promise
    }
}