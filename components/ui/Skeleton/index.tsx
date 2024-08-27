 
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-base5 ${className}`}
      {...props}
    />
  )
}
 
export { Skeleton }