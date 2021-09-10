import React from 'react'

export type InfiniteListPropsType = {
  isOrderedList?: boolean
  children: JSX.Element | JSX.Element[]
}

const InfiniteList = (props: InfiniteListPropsType): JSX.Element => {
  const { isOrderedList = false } = props

  return isOrderedList ? <ol>{props.children}</ol> : <ul>{props.children}</ul>
}

export default InfiniteList
