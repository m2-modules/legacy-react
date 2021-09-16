import React from 'react'

import { ComponentMeta } from '@storybook/react'

import RippleEffectButton, {
  RippleEffectButtonProps,
} from '../src/RippleEffectButton'

export default {
  title: 'RippleEffectButton',
  component: RippleEffectButton,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    rippleColor: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof RippleEffectButton>

const Template = (args: RippleEffectButtonProps) => {
  const { children, ...rest } = args
  return (
    <RippleEffectButton {...rest}>
      {children ?? 'Ripple Effect Button'}
    </RippleEffectButton>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const DarkColorButton = Template.bind({})
DarkColorButton.args = {
  style: {
    backgroundColor: 'black',
    color: 'white',
  },
  rippleColor: 'rgba(255, 255, 255, 0.5)',
}
