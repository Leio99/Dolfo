import React from "react"
import { ResultCode, Usage, WhenToUse } from "./Layouts"
import { Range } from "../form/Range"

export class RangePage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render a range input component inside your form.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple range"
            result={<Range min={0} max={10} steps={1} />}
            code={'<RadioButton controlName="simple" defaultValue={1}>\n\t<Option label="Option 1" value={1} />\n\t<Option label="Option 2" value={2} />\n</RadioButton>'}
        />

        <ResultCode
            title="Label"
            result={<Range showSteps required label="Sound" min={0} max={10} steps={1} />}
            code={'<RadioButton controlName="simple" defaultValue={1}>\n\t<Option label="Option 1" value={1} />\n\t<Option label="Option 2" value={2} />\n</RadioButton>'}
        />

        <ResultCode
            title="Disabled"
            result={<Range disabled label="Sound" min={0} max={10} steps={1} />}
            code={'<RadioButton controlName="simple" defaultValue={1}>\n\t<Option label="Option 1" value={1} />\n\t<Option label="Option 2" value={2} />\n</RadioButton>'}
        />
    </>
}