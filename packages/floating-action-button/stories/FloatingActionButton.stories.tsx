import React, { RefObject, useRef } from 'react'

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { ComponentMeta } from '@storybook/react'

import FloatingActionButton from '../src/FloatingActionButton'
import { ButtonPosition, FloatingActionButtonProps } from '../src/interfaces'

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

const Template = (args: FloatingActionButtonProps): JSX.Element => {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={containerRef} style={{ height: '100%', overflow: 'auto' }}>
        <div
          style={{
            height: '2000px',
            width: '100vw',
            background: `linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(250, 32, 74, 1) 25%,
            rgba(250, 32, 74, 1) 50%,
            rgba(250, 32, 74, 1) 75%,
            rgba(255, 255, 255, 1) 100%
          )`,
          }}
        ></div>
      </div>

      <FloatingActionButton
        {...args}
        autoHideOptions={{
          ...(args.autoHideOptions || {}),
          containerRef,
        }}
      />
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  children: (
    <ArrowCircleUpIcon
      style={{ width: '50px', height: '50px' }}
      onClick={() => alert('Move to top')}
    />
  ),
  autoHideOptions: {
    animation: true,
    timer: 1,
  },
} as FloatingActionButtonProps
