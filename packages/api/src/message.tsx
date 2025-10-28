import { toast, type ExternalToast } from 'sonner'
import { CircleCheck, CircleX } from 'lucide-react'

export const success = (
  message: string,
  data: ExternalToast = {
    position: 'top-center',
    style: { borderRadius: '16px' },
  }
) =>
  toast.custom(
    () => (
      <section className="w-70 md:w-97 p-3 md:py-4 rounded-2xl bg-white flex justify-center gap-2">
        <CircleCheck className="text-success self-center" />
        <span>{message}</span>
      </section>
    ),
    data
  )

export const error = (
  message: string,
  data: ExternalToast = {
    position: 'top-center',
    style: { borderRadius: '16px' },
  }
) =>
  toast.custom(
    () => (
      <section className="w-70 md:w-97 p-3 md:py-4 rounded-2xl bg-white flex justify-center gap-2">
        <CircleX className="text-failure self-center" />
        <span>{message}</span>
      </section>
    ),
    data
  )
