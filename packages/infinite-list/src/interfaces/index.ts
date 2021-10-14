type Props = {
  fetchHandler: (page: number) => JSX.Element[] | Promise<JSX.Element[]>
  initialPage?: number
  threshHoldRate?: number
  children?: JSX.Element[]
}

export type InfiniteListProps = Props & React.HTMLProps<HTMLUListElement>
