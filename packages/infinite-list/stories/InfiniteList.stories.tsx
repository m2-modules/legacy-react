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

const Template = (args: InfiniteListProps) => (
  <InfiniteList {...args}></InfiniteList>
)

export const Basic = Template.bind({})
Basic.args = {
  fetchHandler: async (page: number): Promise<JSX.Element[]> => {
    return new Promise((resolve) => {
      console.log('Fetch!')
      console.log('Page: ' + page)
      const limit = 20

      setTimeout(() => {
        page >= 30
          ? resolve([])
          : resolve(
              Array(limit)
                .fill('Card')
                .map((item: string, idx: number) => (
                  <SampleCard key={(page - 1) * limit + idx}>
                    {item} {(page - 1) * limit + idx}
                  </SampleCard>
                ))
            )
      }, 1000)
    })
  },
} as InfiniteListProps
