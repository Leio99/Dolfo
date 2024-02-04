import React from "react"
import { Avatar } from "../layout/Avatar"
import { Apis, ResultCode, Usage, WhenToUse } from "./Layouts"
import avatarImage from "./images/avatarImage.png"

export class AvatarPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a user avatar image.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple avatar"
            result={<Avatar imageSource={avatarImage} />}
            code={'<Avatar imageSource="../avatar" />'}
        />

        <ResultCode
            title="Alternative avatar"
            result={<Avatar imageSource={null} alternativeStr="Leonzio" style={{ backgroundColor: "#B68AF6", color: "#fff" }} />}
            code={'<Avatar imageSource={null} alternativeStr="Leonzio" style={{ backgroundColor: "#B68AF6", color: "#fff" }} />'}
        />

        <ResultCode
            title="Sizes"
            result={<>
                <div>
                    <Avatar imageSource={avatarImage} size="small" />
                </div>
                <div>
                    <Avatar imageSource={avatarImage} size="medium" />
                </div>
                <div>
                    <Avatar imageSource={avatarImage} size="large" />
                </div>
                <div>
                    <Avatar imageSource={avatarImage} size="xl" />
                </div>
            </>}
            code={'<Avatar imageSource={avatarImage} size="small" />\n<Avatar imageSource={avatarImage} size="medium" />\n<Avatar imageSource={avatarImage} size="large" />\n<Avatar imageSource={avatarImage} size="xl" />'}
        />

        <Apis data={[
            {
                name: "imageSource",
                desc: "The source of the avatar image.",
                type: "string (URL)",
                required: true
            },
            {
                name: "size",
                desc: "Determines the size of the avatar.",
                type: "string (small, medium, large, xl)",
                required: false,
                default: "medium"
            },
            {
                name: "alternativeStr",
                desc: "Specifices an alternative string for the avatar. If 'imageSource' is not set, it takes the first letter of the string and uses it as the avatar. You can use 'style' prop to set the background color and additional styles.",
                type: "string",
                required: false
            },
            {
                name: "style",
                desc: "Additional avatar style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional avatar className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}