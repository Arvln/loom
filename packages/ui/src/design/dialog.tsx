import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@workspace/ui/lib/utils'

export const DialogContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-0 left-0 z-50 w-dvw h-dvh px-4 py-16 duration-200',
          className
        )}
        {...props}
      >
        <section className="min-w-[343px] max-w-300 mx-auto flex flex-col gap-4 md:gap-10">
          <DialogPrimitive.Close className="p-2.5 self-end">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          {children}
        </section>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
