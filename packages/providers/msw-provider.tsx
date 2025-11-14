'use client'

import { useEffect } from 'react'

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('../frontend/mocks/browser').then(({ worker }) => {
        worker.start()
      })
    }
  }, [])

  return <>{children}</>
}
