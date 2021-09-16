import React from 'react'

import DoneIcon from '@material-ui/icons/Done'
import MoreVerticalIcon from '@material-ui/icons/MoreVert'
import { ComponentMeta } from '@storybook/react'

import MultiActionButton, { MultiActionButtonProps } from '../src'

export default {
  title: 'MultiActionButton',
  component: MultiActionButton,
  argTypes: {
    name: { control: { type: 'text' } },
    dropdown: { control: { type: 'boolean' } },
    reverse: { control: { type: 'boolean' } },
    rippleColor: {
      control: { type: 'color' },
    },
  },
} as ComponentMeta<typeof MultiActionButton>

const Template: (args: MultiActionButtonProps) => JSX.Element = (
  args: MultiActionButtonProps
) => <MultiActionButton {...args} />

export const PrimaryOnly = Template.bind({})
PrimaryOnly.args = {
  name: 'Primary action button',
  action: () => console.log('Primary Action'),
} as MultiActionButtonProps

export const WithSubActions = Template.bind({})
WithSubActions.args = {
  ...PrimaryOnly.args,
  subButtons: [
    { name: 'Sub action button 1', action: () => console.log('Sub action 1') },
    { name: 'Sub action button 2', action: () => console.log('Sub action 2') },
    { name: 'Sub action button 3', action: () => console.log('Sub action 3') },
  ],
} as MultiActionButtonProps

export const WithComponentIcons = Template.bind({})
WithComponentIcons.args = {
  ...WithSubActions.args,
  icon: <DoneIcon />,
  subButtons: [
    {
      name: 'Sub action button 1',
      action: () => console.log('Sub action 1'),
      icon: <DoneIcon />,
    },
    {
      name: 'Sub action button 2',
      action: () => console.log('Sub action 2'),
      icon: <DoneIcon />,
    },
    {
      name: 'Sub action button 3',
      action: () => console.log('Sub action 3'),
      icon: <DoneIcon />,
    },
  ],
} as MultiActionButtonProps

export const WithSrcIcons = Template.bind({})
WithSrcIcons.args = {
  ...WithSubActions.args,
  icon: {
    src: 'https://picsum.photos/50/50.jpg',
    alt: 'Randomly created',
    width: '30px',
    height: '100px',
  },
  subButtons: [
    {
      name: 'Sub action button 1',
      action: () => console.log('Sub action 1'),
      icon: {
        src: 'https://picsum.photos/50/50.jpg',
        alt: 'Randomly created',
        width: '30px',
        height: '100px',
      },
    },
    {
      name: 'Sub action button 2',
      action: () => console.log('Sub action 2'),
      icon: {
        src: 'https://picsum.photos/50/50.jpg',
        alt: 'Randomly created',
        width: '30px',
        height: '100px',
      },
    },
    {
      name: 'Sub action button 3',
      action: () => console.log('Sub action 3'),
      icon: {
        src: 'https://picsum.photos/50/50.jpg',
        alt: 'Randomly created',
        width: '30px',
        height: '100px',
      },
    },
  ],
} as MultiActionButtonProps

export const CustomizedMoreButton = Template.bind({})
CustomizedMoreButton.args = {
  name: 'Primary action button',
  action: () => console.log('Primary Action'),
  moreButtonIcon: <MoreVerticalIcon />,
  subButtons: [
    {
      name: 'Sub action button 1',
      action: () => console.log('Sub action 1'),
      icon: <DoneIcon />,
    },
    {
      name: 'Sub action button 2',
      action: () => console.log('Sub action 2'),
      icon: <DoneIcon />,
    },
    {
      name: 'Sub action button 3',
      action: () => console.log('Sub action 3'),
      icon: <DoneIcon />,
    },
  ],
} as MultiActionButtonProps
