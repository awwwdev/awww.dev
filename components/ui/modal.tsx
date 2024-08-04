import { RNode } from '@/types';
import * as RadixDialog from  '@radix-ui/react-dialog';


export default function Modal({children , trigger,  title, isOpen , setOpen}: {
  isOpen?: boolean,
  setOpen?: (arg?: boolean) => void,
  children?: RNode,
  trigger: RNode,
  title?: RNode,
}){

return (
  <RadixDialog.Root open={isOpen} onOpenChange={setOpen} >
  <RadixDialog.Trigger asChild>
    {trigger}
  </RadixDialog.Trigger>
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-20 bg-black/80" />
    <RadixDialog.Content
      className="fixed z-50 max-h-[90vh] overflow-y-auto
            w-[95vw] max-w-50rem rd-6 p-6 md:w-full 
            top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
          bg-base3 b-t-1 b-l-1 b-r-1 b-base4"
    >
      <RadixDialog.Title className="fw-700">{title}</RadixDialog.Title>
      <RadixDialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
      {children}
      </RadixDialog.Description>
    </RadixDialog.Content>
  </RadixDialog.Portal>
</RadixDialog.Root>)};


Modal.Close = RadixDialog.Close;