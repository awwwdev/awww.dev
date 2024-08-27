export default function MobileOnly({children}){

return (
  <span className='sm:hidden contents' >
    {children}
  </span>
)};