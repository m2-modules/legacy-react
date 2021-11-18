export type SlideDirectionType = 'vertical' | 'horizontal'
export const enum AutoTravel {
  OneWay = 'one-way',
  RoundTrip = 'round-trip',
}

export interface IWrapperProps {
  width?: string
  height?: string
}

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
  autoTravel?: AutoTravel
  timer?: number
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
  direction: SlideDirectionType
}
