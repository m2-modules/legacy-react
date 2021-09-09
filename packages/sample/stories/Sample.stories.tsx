import React from 'react'

import { ComponentMeta } from '@storybook/react'

import Sample from '../lib/sample'

export default {
  title: 'Sample',
  component: Sample,
} as ComponentMeta<typeof Sample>

export const Basic = () => <Sample />
