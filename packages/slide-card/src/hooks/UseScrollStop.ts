import { RefObject, useEffect, useState } from 'react'

let timeout: NodeJS.Timeout

const useScrollStop = (
  containerRef: RefObject<HTMLElement>,
  interval = 100
): boolean => {
  const [scrollStop, setScrollStop] = useState<boolean>(true)

  useEffect(() => {
    if (!containerRef.current) return

    const container: HTMLElement = containerRef.current
    const onScroll = () => {
      if (timeout) clearTimeout(timeout)
      if (scrollStop) setScrollStop(false)

      timeout = setTimeout(() => {
        setScrollStop(true)
      }, interval)
    }
    container.addEventListener('scroll', onScroll)

    return () => container.removeEventListener('scroll', onScroll)
  }, [containerRef, interval, scrollStop])

  return scrollStop
}

export default useScrollStop
