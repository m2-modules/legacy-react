import React from 'react'

import { ComponentMeta } from '@storybook/react'

import { SubButton } from '../interfaces'
import MultiActionButton, {
  MultiActionButtonPropsType,
} from '../src/MultiActionButton'

export default {
  title: 'MultiActionButton',
  component: MultiActionButton,
  argTypes: {
    name: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof MultiActionButton>

export const Basic = (args: MultiActionButtonPropsType) => (
  <MultiActionButton
    name={args.name || 'Multi Action Button'}
    action={() => console.log('Action!')}
    subButtons={
      args.subButtons ||
      ([
        { name: 'Sub Action 1' },
        { name: 'Sub Action 2' },
        { name: 'Sub Action 3' },
      ] as SubButton[])
    }
  />
)
