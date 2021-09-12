import { MouseEvent } from 'react'

export interface ButtonIcon {
  alt: string
  src: string
  width: string
  height: string
}
export interface SubButton {
  icon?: ButtonIcon | JSX.Element
  name: string
  action: <T>(args: MouseEvent<HTMLButtonElement>) => T
}
