import React from 'react'

import { ComponentMeta } from '@storybook/react'

import { SlideCardProps } from '../src/interfaces'
import SlideCard from '../src/SlideCard'

export default {
  title: 'SlideCard',
  component: SlideCard,
} as ComponentMeta<typeof SlideCard>

const Template = (args: SlideCardProps): JSX.Element => <SlideCard {...args} />

export const ImageCard = Template.bind({})
ImageCard.args = {
  width: '300px',
  children: Array(5)
    .fill('')
    .map((_, idx: number) => (
      <img key={idx} src={`https://picsum.photos/300/45${idx}`} />
    )),
} as SlideCardProps

export const ComponentCard = Template.bind({})
ComponentCard.args = {
  children: Array(5)
    .fill('')
    .map((_, idx: number) => (
      <div
        key={idx}
        style={{
          display: 'grid',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        <button
          style={{ margin: 'auto' }}
          onClick={() => console.log('Button clicked')}
        >{`Component ${idx + 1}`}</button>
      </div>
    )),
}
