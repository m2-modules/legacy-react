import { ButtonPosition, FloatingActionButtonProps } from '../src/interfaces'

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { ComponentMeta } from '@storybook/react'
import FloatingActionButton from '../src/FloatingActionButton'
import React from 'react'

export default {
  title: 'FloatingActionButton',
  component: FloatingActionButton,
  argTypes: {
    position: {
      options: [
        ButtonPosition.LeftBottomCorner,
        ButtonPosition.RightBottomCorner,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof FloatingActionButton>

const Template = (args: FloatingActionButtonProps): JSX.Element => (
  <FloatingActionButton {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  children: <ArrowCircleUpIcon style={{ width: '50px', height: '50px' }} />,
  onClick: () => alert('Button Clicked!'),
} as FloatingActionButtonProps
