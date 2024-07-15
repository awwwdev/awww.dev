import { Children } from '@/types';
import * as RadixToggle from '@radix-ui/react-toggle';
import type * as RadixToggleTypes from '@radix-ui/react-toggle'

export default function Toggle({children, ...props}: Children & RadixToggleTypes.ToggleProps ) {


  return (
    <RadixToggle.Root  {...props}>
      {children}
    </RadixToggle.Root>
  )
}