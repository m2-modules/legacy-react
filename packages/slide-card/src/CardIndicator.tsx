import React from 'react'

import styled from 'styled-components'

import { CardIndicatorProps, ICircleProps } from './interfaces'

const IndicatorContainer = styled.div`
  position: fixed;
  bottom: 10px;
  height: 10px !important;
  display: inline-flex;
  justify-content: center;
  gap: 5px;
`

const Circle = styled.span<ICircleProps>`
  border: 2px solid ${(props) => props.emphasizeColor};
  background-color: ${(props) =>
    props.active ? props.emphasizeColor : 'transparent'};
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
`

const CardIndicator = (props: CardIndicatorProps): JSX.Element => {
  const cardCount: number = props.cardCount
  const currentCardIndex: number = props.currentCardIndex
  const emphasizeColor: string = props.emphasizeColor || 'skyblue'

  return (
    <IndicatorContainer>
      {Array(cardCount)
        .fill('')
        .map((_, idx: number) => (
          <Circle
            key={idx}
            active={idx === currentCardIndex}
            emphasizeColor={emphasizeColor}
          />
        ))}
    </IndicatorContainer>
  )
}

export default CardIndicator
