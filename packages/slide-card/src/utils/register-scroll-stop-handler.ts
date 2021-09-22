const registerScrollStopHandler = (
  element: HTMLElement,
  handler: () => void,
  interval = 100
): void => {
  let timer: NodeJS.Timeout

  element.onscroll = () => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      handler()
    }, interval)
  }
}

export default registerScrollStopHandler
