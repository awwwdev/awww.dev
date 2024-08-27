export default function DesktopOnly({children}){

return (
  <span className='hidden sm:contents' >
    {children}
  </span>
)};