import React, { UIEvent, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

const StyledList = styled.ul`
  overflow: auto;
  list-style: none;
`

export type InfiniteListPropsType = {
  fetchHandler: <T>(page: number) => Promise<T[]> | T[]
  threshHoldRate?: number
  children?: JSX.Element[]
}

const InfiniteList = (props: InfiniteListPropsType): JSX.Element => {
  const { fetchHandler, threshHoldRate = 80 } = props
  const [page, setPage] = useState<number>(1)
  const [children, setChildren] = useState<JSX.Element[]>(props.children || [])

  useEffect(() => {
    async function initialFetch(): Promise<void> {
      const newChildren: JSX.Element[] = await fetchHandler(1)
      if (newChildren?.length) {
        setChildren(newChildren)
        setPage(2)
      } else {
        setChildren([])
      }
    }

    initialFetch()
  }, [fetchHandler])

  const onScrollHandler = useCallback(
    async (event: UIEvent<HTMLOListElement | HTMLUListElement>) => {
      if (typeof fetchHandler === 'function') {
        const list: HTMLOListElement | HTMLUListElement = event.currentTarget

        if (list.hasAttribute('loading')) return

        const currentScrollPosition: number = list.scrollTop + list.clientHeight
        const scrollHeight: number = list.scrollHeight

        if ((currentScrollPosition / scrollHeight) * 100 >= threshHoldRate) {
          list.setAttribute('loading', '')
          const newChildren: JSX.Element[] = await fetchHandler(page + 1)
          if (newChildren?.length) {
            setChildren([...children, ...newChildren])
            setPage(page + 1)
          }

          list.removeAttribute('loading')
        }
      }
    },
    [children, fetchHandler, page, threshHoldRate]
  )

  return (
    <StyledList onScroll={onScrollHandler}>
      {(children || []).map((child: JSX.Element, idx: number) => (
        <li key={`item-${idx}`}>{child}</li>
      ))}
    </StyledList>
  )
}

export default InfiniteList
