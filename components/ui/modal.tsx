'use client';
import { RNode } from '@/types';
import * as RadixDialog from  '@radix-ui/react-dialog';
import Button from './button';
import Icon from './Icon';


export default function Modal({children , description, trigger,  title, isOpen , setOpen}: {
  isOpen?: boolean,
  setOpen?: (arg?: boolean) => void,
  children?: RNode,
  trigger: RNode,
  title?: RNode,
  description?: React.ReactNode,
}){

return (
  <RadixDialog.Root open={isOpen} onOpenChange={setOpen} >
  <RadixDialog.Trigger asChild>
    {trigger}
  </RadixDialog.Trigger>
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-20 bg-black/20 backdrop-blur-10 " />
    <RadixDialog.Content
      className="fixed z-50 max-h-[90vh] overflow-y-auto 
            w-[95vw] max-w-50rem rd-6 p-6 md:w-full 
            top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
          bg-black/80 backdrop-blur-10  b-t-1 b-l-1 b-r-1 b-base4A shadow-2xl shadow-black "
    >
      <div className='relative'>
      <div className='flex justify-end absolute right-0'>
        <RadixDialog.Close asChild>
          <Button iconButton variation='ghost'>
            <Icon className='c-base11' name='bf-i-ph-x' />
          </Button>
        </RadixDialog.Close>
      </div>
      </div>
      <RadixDialog.Title className="fw-700">{title}</RadixDialog.Title>
      <RadixDialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
        {description}
      </RadixDialog.Description>
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
</RadixDialog.Root>)};


Modal.Close = RadixDialog.Close;