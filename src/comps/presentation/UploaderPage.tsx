import React from "react"
import { Uploader } from "../form/Uploader"
import { goToApiBlock } from "../MenuContent"
import { Constants } from "../shared/Constants"
import { ResultCode, WhenToUse, Usage, Apis, IconApis } from "./Layouts"

export class UploaderPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a file uploader component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Single file uploader"
            result={<Uploader />}
            code={'<Uploader />'}
        />

        <ResultCode
            title="Multiple file uploader"
            result={<Uploader multiple />}
            code={'<Uploader multiple />'}
        />

        <ResultCode
            title="Label"
            result={<Uploader label="I am a label" />}
            code={'<Uploader label="I am a label" />'}
        />

        <ResultCode
            title="Disabled"
            result={<Uploader disabled />}
            code={'<Uploader disabled />'}
        />

        <ResultCode
            title="Accept TXT and PDF files"
            result={<Uploader accept=".txt, .pdf" />}
            code={'<Uploader accept=".txt ,.pdf" />'}
        />

        <ResultCode
            title="Drop file area"
            result={<Uploader dropArea />}
            code={'<Uploader dropArea />'}
        />

        <ResultCode
            title="Drop file area disabled"
            result={<Uploader dropArea disabled />}
            code={'<Uploader dropArea disabled />'}
        />

        <Apis data={[
            {
                name: "icon",
                desc: "Custom icon to show.",
                type: "BaseIconProps",
                required: false,
                default: "null (shows upload icon)",
                onDoubleClick: () => goToApiBlock("#iconProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "multiple",
                desc: "Determines whether the user can select more than one file.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "dropArea",
                desc: "Shows a drag and drop area.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "accept",
                desc: "Determines what file extensions are allowed.",
                type: "string (HTML input upload allowed values)",
                required: false,
                default: "null"
            },
            {
                name: "disabled",
                desc: "Determines whether the uploader is disabled or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "label",
                desc: "The label to show over the uploader.",
                type: "string or JSX",
                required: false,
                default: `'${Constants.UPLOAD_FILE_DROP_LABEL}' if 'dropArea' is true, '${Constants.UPLOAD_FILE_LABEL}' instead.`
            },
            {
                name: "wrapperStyle",
                desc: "The style to apply to the uploader wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "The style to apply to the uploader.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the uploader wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "required",
                desc: "Determines whether the uploader is required inside the form or not.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "onChange",
                desc: "Function triggered when user selects the files.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Selected files (FileList)"
            }
        ]} />

        <IconApis />
    </>
}