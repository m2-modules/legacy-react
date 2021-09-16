import React from 'react'

import { ComponentMeta } from '@storybook/react'

import FloatingLabelInput from '../src/FloatingLabelInput'
import { FloatingLabelInputProps } from '../src/interfaces'

export default {
  title: 'FloatingLabelInput',
  component: FloatingLabelInput,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    underlineColor: {
      control: { type: 'color' },
    },
    style: {
      width: {
        control: { type: 'text' },
      },
    },
  },
} as ComponentMeta<typeof FloatingLabelInput>

export const Basic = (args: FloatingLabelInputProps): JSX.Element => {
  const { label, underlineColor, ...rest } = args

  const [value, setValue] = React.useState('')

  return (
    <FloatingLabelInput
      label={label}
      value={value}
      underlineColor={underlineColor}
      onChange={(event) => setValue(event.target.value)}
      {...rest}
    />
  )
}
Basic.args = {
  style: {
    width: '300px',
  },
  label: 'This is Floating Label',
}
