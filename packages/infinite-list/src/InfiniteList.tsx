import React, { UIEvent, useCallback, useState } from 'react'

import styled from 'styled-components'

const StyledList = styled.ul`
  overflow: auto;
  list-style: none;
`

export type InfiniteListPropsType = {
  fetchHandler?: <T>(page: number) => T
  threshHoldRate?: number
  children: JSX.Element[]
}

const InfiniteList = (props: InfiniteListPropsType): JSX.Element => {
  const { fetchHandler, threshHoldRate = 80 } = props
  const [page, setPage] = useState<number>(1)
  const [children, setChildren] = useState<JSX.Element[]>(props.children)

  const onScrollHandler = useCallback(
    async (event: UIEvent<HTMLOListElement | HTMLUListElement>) => {
      if (typeof fetchHandler === 'function') {
        const list: HTMLOListElement | HTMLUListElement = event.currentTarget
        const currentScrollPosition: number = list.scrollTop + list.clientHeight
        const scrollHeight: number = list.scrollHeight

        if ((currentScrollPosition / scrollHeight) * 100 >= threshHoldRate) {
          const newChildren: JSX.Element[] = await fetchHandler(page + 1)
          if (children?.length) {
            setChildren([...children, ...newChildren])
            setPage(page + 1)
          }
        }
      }
    },
    [fetchHandler, children, page]
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
