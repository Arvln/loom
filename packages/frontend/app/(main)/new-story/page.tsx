import { getTranslations } from '@/packages/utils'
import { Button } from '@workspace/ui/components/button'
import { Editor } from './components'

export default async function NewStory() {
  const t = await getTranslations()

  return (
    <section className="px-4 py-6 md:px-6 md:py-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex gap-4 text-2xl font-(family-name:--font-inter) font-bold">
          <span className="self-center">{t('main.newStory.title')}</span>
          <span className="self-center text-neutral-default">
            {t('main.newStory.updateStatus')}
          </span>
        </div>
        <Button variant="chip" size="lg" className="bg-success">
          {t('main.newStory.publish')}
        </Button>
      </div>
      <Editor />
    </section>
  )
}
