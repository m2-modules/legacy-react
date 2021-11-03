import { useEffect } from 'react'

const useWindowResizeHandler = (handler: () => void): void => {
  useEffect(() => {
    if (!handler) return
    window.addEventListener('resize', handler)

    return () => {
      if (!handler) return
      window.removeEventListener('resize', handler)
    }
  }, [handler])
}

export default useWindowResizeHandler
