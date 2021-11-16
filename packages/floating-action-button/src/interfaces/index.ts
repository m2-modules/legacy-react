export enum ButtonPosition {
  RightBottomCorner = 'right-bottom-corner',
  LeftBottomCorner = 'left-bottom-corner',
}

export interface FloatingActionButtonProps {
  position?: ButtonPosition
  buttonMargin?: string
  children: JSX.Element
  onClick: () => void
}
