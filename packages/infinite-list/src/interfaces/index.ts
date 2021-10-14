type Props = {
  onReach: () => void | Promise<void>
  threshHoldRate?: number
  children?: JSX.Element[]
}

export type InfiniteListProps = Props & React.HTMLProps<HTMLUListElement>
