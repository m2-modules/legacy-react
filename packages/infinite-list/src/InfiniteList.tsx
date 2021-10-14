import React, { createRef, RefObject, useCallback, useEffect } from 'react'

import styled from 'styled-components'

import { InfiniteListProps } from './'

const StyledList = styled.ul`
  overflow: auto;
  list-style: none;
`

const InfiniteList = (props: InfiniteListProps): JSX.Element => {
  const { onReach, threshHoldRate = 80, children } = props
  const listRef: RefObject<HTMLUListElement> = createRef<HTMLUListElement>()

  const isFetchRequired = useCallback(() => {
    const list: HTMLUListElement | null = listRef.current
    if (!list) throw new Error('Failed to find list element')

    if (list.hasAttribute('loading')) return false

    if (list.scrollHeight <= list.clientHeight) return true

    const currentScrollPosition: number = list.scrollTop + list.clientHeight
    const scrollHeight: number = list.scrollHeight

    return (currentScrollPosition / scrollHeight) * 100 >= threshHoldRate
  }, [listRef, threshHoldRate])

  const appendChild = useCallback(async (): Promise<void> => {
    const list: HTMLUListElement | null = listRef.current
    if (!list) throw new Error('Failed to find list element')

    if (!isFetchRequired()) return

    list.setAttribute('loading', '')
    await onReach()

    list.removeAttribute('loading')
  }, [isFetchRequired, listRef, onReach])

  useEffect(() => {
    if (listRef.current) {
      const list: HTMLUListElement = listRef.current
      if (list.scrollHeight <= list.clientHeight) {
        appendChild()
      }
    }
  }, [appendChild, listRef])

  const onScrollHandler = useCallback(async () => {
    appendChild()
  }, [appendChild])

  return (
    <StyledList ref={listRef} onScroll={onScrollHandler}>
      {(children || []).map((child: JSX.Element, idx: number) => (
        <li key={`item-${idx}`}>{child}</li>
      ))}
    </StyledList>
  )
}

export default InfiniteList
