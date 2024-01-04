import _ from "lodash"
import React from "react"
import { Icon, LoadingIcon } from "../layout/Icon"
import { formatDate } from "../shared/utility"

interface IState{
  readonly updates: {
    [version: string]: {
      readonly date: string
      readonly updates: {
        readonly title: string
        readonly list: string[]
      }[]
    }
  }
}

export class UpdatesPage extends React.Component<unknown, IState>{
    constructor(props: unknown){
        super(props)
        
        this.state = { updates: null }
    }

    componentDidMount = () => fetch("./updates.json").then(r => r.json()).then(updates => this.setState({
        updates
    })).catch(() => console.error("File updates.json not loaded!"))

    render = () => {
        const { updates } = this.state

        if(!updates)
            return <LoadingIcon spinning className="fa-3x" />
        
        return _.orderBy(Object.keys(updates), null, "desc").map(version => {
            const versionContent = updates[version]

            return <React.Fragment key={version}>
                <h2 className="version-title">
                    <Icon iconKey="code-branch" type="fal" /> Version {version}
                    <small>Release date: {formatDate(versionContent.date)}</small>
                </h2>

                <div className="all-updates">
                    {
                        versionContent.updates.map(upd => <div key={upd.title} className="updates-list">
                            <h5>{upd.title}</h5>
                            {
                                upd.list.map(l => <div key={l}>
                                    &rarr; {l}
                                </div>)
                            }
                        </div>)
                    }
                </div>
            </React.Fragment>
        })
    }
}