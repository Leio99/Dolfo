import { Modal } from "antd"
import { costantiTesti } from "./consts/costantiTesti"

export function infoDialog(data: {
    title: string,
    width?: string,
    centered?: boolean,
    closeOutside?: boolean,
    closeText?: string,
    content: JSX.Element
}) {
    Modal.info({
        title: data.title,
        centered: data.centered || true,
        width: data.width,
        maskClosable: data.closeOutside || true,
        okText: data.closeText || costantiTesti.BTN_CHIUDI,
        content: data.content
    })
}