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

const Template = (args: InfiniteListPropsType) => (
  <InfiniteList {...args}>
    {Array(100)
      .fill('Card')
      .map((item: string, idx: number) => (
        <div key={idx}>
          {item} {idx}
        </div>
      ))}
  </InfiniteList>
)

export const Basic = Template.bind({})

export const AddableList = Template.bind({})
AddableList.args = {
  fetchHandler: async (page: number): Promise<JSX.Element[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Array(100)
            .fill('Card')
            .map((item: string, idx: number) => (
              <div key={(page - 1) * 100 + idx}>
                {item} {(page - 1) * 100 + idx}
              </div>
            ))
        )
      }, 2000)
    })
  },
} as InfiniteListPropsType
