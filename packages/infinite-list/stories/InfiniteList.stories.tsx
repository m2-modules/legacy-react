import InfiniteList, { InfiniteListPropsType } from '../src/InfiniteList'

import { ComponentMeta } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

export default {
  title: 'InfiniteList',
  component: InfiniteList,
} as ComponentMeta<typeof InfiniteList>

const SampleCard = styled.div`
  height: 100px;
  width: 200px;
  border: 1px solid #aaa;
`

const Template = (args: InfiniteListPropsType) => (
  <InfiniteList {...args}></InfiniteList>
)

export const Basic = Template.bind({})
Basic.args = {
  fetchHandler: async (page: number): Promise<JSX.Element[]> => {
    return new Promise((resolve) => {
      console.log('Fetch!')

      setTimeout(() => {
        page >= 5
          ? resolve([])
          : resolve(
              Array(30)
                .fill('Card')
                .map((item: string, idx: number) => (
                  <SampleCard key={(page - 1) * 30 + idx}>
                    {item} {(page - 1) * 30 + idx}
                  </SampleCard>
                ))
            )
      }, 1000)
    })
  },
} as InfiniteListPropsType
