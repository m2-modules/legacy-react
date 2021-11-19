interface Props {
  fetchHandler: (page: number) => JSX.Element[] | Promise<JSX.Element[]>
  threshHoldRate?: number
  children?: JSX.Element[]
}

export type InfiniteListProps = Props & React.HTMLProps<HTMLUListElement>
