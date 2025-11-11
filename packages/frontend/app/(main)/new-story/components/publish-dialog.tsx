import { useTranslations } from '@/packages/utils'
import {
  Dialog as ShadcnDialog,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog'
import { DialogContent } from '@workspace/ui/design'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { Button } from '@/packages/ui/src/components/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@workspace/ui/components/form'

const topicSchema = z.object({
  topic: z.string().nonempty(),
})

export const PublishDialog = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslations()
  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topic: '',
    },
  })

  const onSubmit = (values: z.infer<typeof topicSchema>) => {
    console.log(values)
  }

  return (
    <ShadcnDialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2 md:gap-4 font-(family-name:--font-inter) font-bold">
          <DialogTitle className="text-4xl">
            {t('main.newStory.editor.publishDialog.title')}: Sam Altmon
          </DialogTitle>
          <p className="text-2xl">
            {t('main.newStory.editor.publishDialog.description')}
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-10"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full md:w-1/2 p-5.5 text-base/normal text-neutral-default font-bold bg-neutral-lighter rounded-2xl">
                        <SelectValue
                          placeholder={t(
                            'main.newStory.editor.publishDialog.selectPlaceholder'
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-lighter">
                        <SelectGroup className="text-base/normal text-neutral-darkest font-bold">
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="webDesign">Web Design</SelectItem>
                          <SelectItem value="webDevelopment">
                            Web Development
                          </SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="boardGames">
                            Board Games
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 md:gap-4">
              <Button variant="chip" size="lg">
                {t('main.newStory.editor.publishDialog.saveToDrafts')}
              </Button>
              <Button variant="chip" size="lg" className="bg-success">
                {t('main.newStory.editor.publishDialog.publishNow')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </ShadcnDialog>
  )
}
