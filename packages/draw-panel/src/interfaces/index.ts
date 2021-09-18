export interface IStyledModal {
  backgroundColor: string
  open: boolean
}

export interface IStyledDrawPanelContainer {
  backgroundColor: string
  open: boolean
}

export type DrawPanelPositionTypes = 'left' | 'right' | 'top' | 'bottom'

export interface IDrawPanelProps {
  position?: DrawPanelPositionTypes
  modalColor?: string
  panelColor?: string
  open?: boolean
  closeHandler: () => void
  children: JSX.Element[]
}
