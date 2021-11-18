import { RefObject, useEffect } from 'react'

const useScroll = (
  refObject: RefObject<HTMLElement> | undefined,
  callback: (event: Event) => void
): void => {
  useEffect(() => {
    if (!refObject?.current || !callback) return

    const container: HTMLElement = refObject.current
    container.addEventListener('scroll', callback)

    return () => container.removeEventListener('scroll', callback)
  }, [refObject, callback])
}

export default useScroll
