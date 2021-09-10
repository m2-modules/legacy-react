import React from 'react'

import { ComponentMeta } from '@storybook/react'

import InfiniteList, { InfiniteListPropsType } from '../src/InfiniteList'

export default {
  title: 'InfiniteList',
  component: InfiniteList,
  argTypes: {
    isOrderedList: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof InfiniteList>

export const Basic = (args: InfiniteListPropsType) => (
  <InfiniteList {...args}>
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
    <div>Card 4</div>
    <div>Card 5</div>
    <div>Card 6</div>
  </InfiniteList>
)
