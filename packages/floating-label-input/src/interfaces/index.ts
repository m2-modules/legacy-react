export interface IStyledLabel {
  focus: boolean
  underlineColor?: string
}

export interface IStyledSpan {
  focus: boolean
}

interface Props {
  label: string
  underlineColor?: string
}

export type FloatingLabelInputProps = Props & React.InputHTMLAttributes<any>
