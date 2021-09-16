import React from 'react'

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
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export type FloatingLabelInputProps = Props &
  React.LabelHTMLAttributes<HTMLLabelElement>
