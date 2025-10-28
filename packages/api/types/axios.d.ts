import 'axios'
import { type ReactNode } from 'react'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showMessage?: boolean
    successToast?: (response: AxiosResponse<{ msg: string }>) => ReactNode
    errorToast?: (error: any) => ReactNode
  }
}
