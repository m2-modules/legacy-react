import { useEffect } from 'react'

const useImagePreload = (imageURLs: string[]): void => {
  useEffect(() => {
    if (!imageURLs.length) return
    imageURLs.forEach((imageURL: string) => {
      const image: HTMLImageElement = new Image()
      image.src = imageURL
    })
  }, [imageURLs])
}

export default useImagePreload
