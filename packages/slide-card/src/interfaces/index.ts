export type SlideDirectionType = 'vertical' | 'horizontal'

export interface IViewPartProps {
  width?: string
  height?: string
  direction: SlideDirectionType
  fastSeeking: boolean
}

export interface SlideCardProps {
  width?: string
  height?: string
  direction?: SlideDirectionType
  fastSeeking?: boolean
  indicator?: boolean
  children: JSX.Element[]
  emphasizeColor?: string
}

export interface ICircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  active: boolean
  emphasizeColor: string
}

export interface CardIndicatorProps {
  cardCount: number
  currentCardIndex: number
  emphasizeColor?: string
}
