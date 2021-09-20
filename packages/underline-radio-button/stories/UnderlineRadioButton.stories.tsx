import React from 'react'

import { ComponentMeta } from '@storybook/react'

import UnderlineRadioButton from '../src/UnderlineRadioButton'
import { UnderlineRadioButtonProps } from '../src/interfaces'

export default {
  title: 'UnderlineRadioButton',
  component: UnderlineRadioButton,
  argTypes: {
    underlineColor: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof UnderlineRadioButton>

const Template = (args: UnderlineRadioButtonProps): JSX.Element => {
  const [selected, setSelected] = React.useState('')

  return (
    <div>
      <h3>current Selected: {selected}</h3>
      <UnderlineRadioButton
        onChangeRadio={(value) => setSelected(value)}
        {...args}
      />
    </div>
  )
}

export const OnlyValue = Template.bind({})
OnlyValue.args = {
  name: 'name',
  value: [
    { value: 'radio button1' },
    { value: 'radio button2' },
    { value: 'radio button3' },
  ],
  style: {
    margin: '0 10px',
  },
}

export const ValueWithDisplayName = Template.bind({})
ValueWithDisplayName.args = {
  name: 'name',
  value: [
    { value: 'value1', display: 'Display Name1' },
    { value: 'value2', display: 'Display Name2' },
    { value: 'value3', display: 'Display Name3' },
  ],
  style: {
    margin: '0 10px',
  },
}
