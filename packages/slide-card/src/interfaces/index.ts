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
  indicatorColor?: string
}

export interface ICircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  active: boolean
  indicatorColor: string
}

export interface CardIndicatorProps {
  cardCount: number
  currentCardIndex: number
  indicatorColor?: string
}
