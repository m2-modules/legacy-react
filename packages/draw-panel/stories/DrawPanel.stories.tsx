import React from 'react'

import { ComponentMeta } from '@storybook/react'

import DrawPanel from '../src/DrawPanel'
import { IDrawPanelProps } from '../src/interfaces'

export default {
  title: 'DrawPanel',
  component: DrawPanel,
  argTypes: {
    position: {
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
} as ComponentMeta<typeof DrawPanel>

const Template = (args: IDrawPanelProps): JSX.Element => (
  <DrawPanel {...args}>
    <div>First child element</div>
    <div>Second child element</div>
    <div>Third child element</div>
  </DrawPanel>
)

export const Basic = Template.bind({})
Basic.args = {}
