import { RNode } from '@/types';
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";


export default function AlertDialog({children , trigger,  title, cancelButton, okButton , isOpen , setOpen}: {
  isOpen: boolean,
  setOpen: (arg?: boolean) => void,
  children: RNode,
  trigger: RNode,
  title: RNode,
  okButton?: RNode,
  cancelButton?: RNode
}){

return (
  <RadixAlertDialog.Root open={isOpen} onOpenChange={setOpen} >
  <RadixAlertDialog.Trigger asChild>
    {trigger}
  </RadixAlertDialog.Trigger>
  <RadixAlertDialog.Portal>
    <RadixAlertDialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
    <RadixAlertDialog.Content
      className="fixed z-50
            w-[95vw] max-w-md rounded-lg p-4 md:w-full 
            top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
            bg-gray2 space-y-6"
    >
      <RadixAlertDialog.Title className="fw-700">{title}</RadixAlertDialog.Title>
      <RadixAlertDialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
      {children}
      </RadixAlertDialog.Description>
      <div className="flex gap-4 justify-end">
        <RadixAlertDialog.Cancel asChild>
         {cancelButton}
        </RadixAlertDialog.Cancel>
        <RadixAlertDialog.Action asChild>
         {okButton}
        </RadixAlertDialog.Action>
      </div>
    </RadixAlertDialog.Content>
  </RadixAlertDialog.Portal>
</RadixAlertDialog.Root>)};


AlertDialog.Action = RadixAlertDialog.Action;