import React, { UIEvent, useCallback, useState } from 'react'

export type InfiniteListPropsType = {
  fetchHandler?: (page: number) => any
  threshHoldRate?: number
  isOrderedList?: boolean
  children: JSX.Element[]
}

const InfiniteList = (props: InfiniteListPropsType): JSX.Element => {
  const { fetchHandler, threshHoldRate = 80, isOrderedList = false } = props
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
          }
          setPage(page + 1)
        }
      }
    },
    [fetchHandler, children, page]
  )

  return isOrderedList ? (
    <ol onScroll={onScrollHandler}>
      {(children || []).map((child: JSX.Element, idx: number) => (
        <li key={`item-${idx}`}>{child}</li>
      ))}
    </ol>
  ) : (
    <ul onScroll={onScrollHandler}>
      {(children || []).map((child: JSX.Element, idx: number) => (
        <li key={`item-${idx}`}>{child}</li>
      ))}
    </ul>
  )
}

export default InfiniteList
