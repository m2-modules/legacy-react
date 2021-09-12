import React from 'react'

import { ComponentMeta } from '@storybook/react'

import RippleEffectButton, { RippleEffectButtonProps } from '../src/RippleEffectButton'

export default {
  title: 'RippleEffectButton',
  component: RippleEffectButton,
  argTypes: {
    children: {
      control: { type: 'text' }
    },
    rippleColor: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof RippleEffectButton>

const Template = (args: RippleEffectButtonProps) => {
  const { children, ...rest } = args;
  return (
    <RippleEffectButton {...rest} >
      {children ?? 'Ripple Effect Button' }
    </RippleEffectButton>
  )
};

export const LightColorButton = Template.bind({});
LightColorButton.args = {
  rippleColor: 'dark',
};

export const DarkColorButton = Template.bind({});
DarkColorButton.args = {
  style: {
    backgroundColor: 'black',
    color: 'white',
  },
  rippleColor: 'light',
};

