import React from "react"
import { Avatar } from "./comps/layout/Avatar"
import Button from "./comps/layout/Button"
import { Card, CardActions } from "./comps/layout/Card"
import { ContextMenu } from "./comps/layout/ContextMenu"
import { Icon } from "./comps/layout/Icon"
import { Tooltip } from "./comps/layout/Tooltip"
import avatarImage from "./comps/presentation/images/avatarImage.png"

export class Post extends React.Component{
    render = () => <Card title={<div className="post-title">
        <Avatar imageSource={avatarImage} />
        <div className="user-info">
            <a className="link" href="#">
                Prova utente
            </a>
            <span className="user-name">
                @provaUtente.prova
            </span>
        </div>

        <span>Il 18 novembre 2022</span>
    </div>}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et aperiam ipsam atque tenetur itaque enim maxime nesciunt tempore impedit dignissimos saepe explicabo, minus cupiditate. Necessitatibus sed voluptatibus quae molestias corrupti! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis sit, voluptas asperiores doloribus dicta inventore nihil illum nobis repudiandae quidem eligendi explicabo accusamus facere unde vel totam at! Laborum, iusto? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus sint rerum delectus unde laboriosam blanditiis, praesentium voluptas, animi eos error consectetur odit placeat magni esse incidunt! Quasi facilis id reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, blanditiis? Suscipit, ullam, atque enim ratione reiciendis sunt temporibus officia obcaecati unde vel cumque magnam omnis, fuga quam perferendis possimus! Debitis!

        <CardActions style={{ textAlign: "right" }}>
            <ContextMenu options={[
                { label: "Modifica", onClick: () => {} }
            ]}>
                <Tooltip tooltip="Altro">
                    <Button btnColor="grey" type="text">
                        <Icon iconKey="ellipsis-h" large />
                    </Button>
                </Tooltip>
            </ContextMenu>
        </CardActions>
    </Card>
}