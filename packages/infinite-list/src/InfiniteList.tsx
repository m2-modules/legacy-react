import React, {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { InfiniteListProps } from '.'
import styled from 'styled-components'

const StyledList = styled.ul`
  overflow: auto;
  list-style: none;
`

const InfiniteList = (props: InfiniteListProps): JSX.Element => {
  const { fetchHandler, threshHoldRate = 80 } = props
  const listRef: RefObject<HTMLUListElement> = createRef<HTMLUListElement>()
  const [page, setPage] = useState<number>(0)
  const [children, setChildren] = useState<JSX.Element[]>(props.children || [])

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
    const newChildren: JSX.Element[] = await fetchHandler(page + 1)
    if (newChildren?.length) {
      setChildren([...children, ...newChildren])
      setPage(page + 1)
    }

    list.removeAttribute('loading')
  }, [children, fetchHandler, isFetchRequired, listRef, page])

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
