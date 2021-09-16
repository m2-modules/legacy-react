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
  children: JSX.Element[]
}
