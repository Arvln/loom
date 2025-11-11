'use client'

import { useTranslations } from '@/packages/utils'
import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import { Editor, PublishDialog } from './components'

export default function NewStory() {
  const { t } = useTranslations()
  const [saveStatus, setSaveStatus] = useState('')

  return (
    <section className="px-4 py-6 md:px-6 md:py-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex gap-4 text-2xl font-(family-name:--font-inter) font-bold">
          <span className="self-center">{t('main.newStory.title')}</span>
          <span className="self-center text-neutral-default">{saveStatus}</span>
        </div>
        <PublishDialog>
          <Button variant="chip" size="lg" className="bg-success">
            {t('main.newStory.publish')}
          </Button>
        </PublishDialog>
      </div>
      <Editor onUpdate={() => setSaveStatus('')} />
    </section>
  )
}
