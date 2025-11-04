export const DataBoundary = <T,>({
  data,
  fallback,
  children,
}: {
  data: T
  fallback: React.ReactNode
  children: (data: NonNullable<T>) => React.ReactNode
}) => {
  if (!data) return fallback
  else return children(data)
}
