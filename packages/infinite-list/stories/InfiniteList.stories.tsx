import React, { useState } from 'react'

import styled from 'styled-components'

import { ComponentMeta } from '@storybook/react'

import InfiniteList, { InfiniteListProps } from '../src'

export default {
  title: 'InfiniteList',
  component: InfiniteList,
} as ComponentMeta<typeof InfiniteList>

const SampleCard = styled.div`
  height: 100px;
  width: 200px;
  border: 1px solid #aaa;
`

const Template = (args: InfiniteListProps) => {
  const [cards, setCards] = useState<string[]>([])

  return (
    <InfiniteList
      {...args}
      onReach={async () => {
        return new Promise((resolve) => {
          console.log('Reached!')

          setTimeout(() => {
            if (cards.length >= 50) return resolve()

            const newCards: string[] = Array(10)
              .fill('')
              .map((_: string, idx: number) => `Card ${cards.length + idx + 1}`)
            setCards([...cards, ...newCards])
            resolve()
          }, 1000)
        })
      }}
    >
      {cards.map((text: string, idx: number) => (
        <SampleCard key={idx}>{text}</SampleCard>
      ))}
    </InfiniteList>
  )
}

export const Basic = Template.bind({})
