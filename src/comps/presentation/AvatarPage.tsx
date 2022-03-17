import React from "react"
import { Avatar } from "../layout/Avatar"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"
import avatarImage from "./images/avatarImage.png"

export class AvatarPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a user avatar image.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple avatar"
            result={<Avatar imageSource={avatarImage} />}
            code={'<Avatar imageSource="../avatar" />'}
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