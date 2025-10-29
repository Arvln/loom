'use client'

import {
  QueryClient,
  QueryClientProvider as ClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const QueryClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <ClientProvider client={queryClient}>
    {children}
    {process.env.NODE_ENV === 'development' && (
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    )}
  </ClientProvider>
)
