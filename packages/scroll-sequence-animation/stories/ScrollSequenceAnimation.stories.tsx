import React, { RefObject, useRef } from 'react'

import styled from 'styled-components'

import { ComponentMeta } from '@storybook/react'

import ScrollSequenceAnimationProps from '../src/interfaces'
import ScrollSequenceAnimation from '../src/ScrollSequenceAnimation'

const Container = styled.div`
  overflow: auto;
  width: 80vw;
  height: 100%;
  background-color: rgba(250, 32, 74, 1);
`

const BeginContent = styled.div`
  height: 1200px;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(250, 32, 74, 1) 50%,
    rgba(250, 32, 74, 1) 100%
  );
`

const EndContent = styled.div`
  height: 1200px;
  background: linear-gradient(
    180deg,
    rgba(250, 32, 74, 1) 0%,
    rgba(250, 32, 74, 1) 50%,
    rgba(2, 0, 36, 1) 100%
  );
`

export default {
  title: 'ScrollSequenceAnimation',
  component: ScrollSequenceAnimation,
  argTypes: {
    startScrollY: { control: { type: 'number' } },
    endScrollY: { control: { type: 'number' } },
    verticalAlign: {
      control: {
        type: 'radio',
        options: ['top', 'middle', 'bottom'],
      },
    },
  },
} as ComponentMeta<typeof ScrollSequenceAnimation>

export const Basic = (args: ScrollSequenceAnimationProps): JSX.Element => {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const imageURLs = Array(121)
    .fill('')
    .map(
      (_, idx) =>
        `https://code-logs.github.io/examples/scroll-sequence-animation/images/${String(
          idx + 1
        ).padStart(3, '0')}.png`
    )

  return (
    <Container ref={containerRef}>
      <BeginContent />
      <ScrollSequenceAnimation
        containerRef={containerRef}
        imagesURLs={imageURLs}
        heightRatio={2 / 3}
        wrapperHeight={'2400px'}
        {...args}
      />
      <EndContent />
    </Container>
  )
}
