export interface BtnOptions{
    readonly text: string | JSX.Element
    readonly onClick: () => void
    readonly hiddenIf?: boolean
}