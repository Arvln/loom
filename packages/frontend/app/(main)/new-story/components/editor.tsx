'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@/packages/hooks'
import { useTranslations } from '@/packages/utils'
import { DataBoundary } from '@workspace/ui/design'
import { cn } from '@workspace/ui/lib/utils'
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { type Editor as TiptapEditor, type JSONContent } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import {
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  Image as LucideImage,
} from 'lucide-react'
import { Redo2, Undo2 } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import './editor.css'

const extensions = [
  TextStyleKit,
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Image,
]

const MenuBar = ({ editor }: { editor: TiptapEditor }) => {
  const { t } = useTranslations()
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
      isBold: ctx.editor.isActive('bold') ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor.isActive('strike') ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive('code') ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      isParagraph: ctx.editor.isActive('paragraph') ?? false,
      isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
      isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
      isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
      isBulletList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
      isBlockquote: ctx.editor.isActive('blockquote') ?? false,
    }),
  })
  const toggles = [
    {
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editorState.canUndo,
      children: <Undo2 />,
    },
    {
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editorState.canRedo,
      children: <Redo2 />,
    },
    {
      className:
        editorState.isBold && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editorState.canBold,
      children: t('main.newStory.editor.bold'),
    },
    {
      className:
        editorState.isItalic && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editorState.canItalic,
      children: t('main.newStory.editor.italic'),
    },
    {
      className:
        editorState.isStrike && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editorState.canStrike,
      children: t('main.newStory.editor.strike'),
    },
    {
      className:
        editorState.isCode && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editorState.canCode,
      children: t('main.newStory.editor.code'),
    },
    {
      onClick: () => editor.chain().focus().unsetAllMarks().run(),
      children: t('main.newStory.editor.clearMarks'),
    },
    {
      onClick: () => editor.chain().focus().clearNodes().run(),
      children: t('main.newStory.editor.clearNodes'),
    },
    {
      className:
        editorState.isParagraph && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().setParagraph().run(),
      children: t('main.newStory.editor.paragraph'),
    },
    {
      className:
        editorState.isHeading1 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      children: t('main.newStory.editor.h1'),
    },
    {
      className:
        editorState.isHeading2 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      children: t('main.newStory.editor.h2'),
    },
    {
      className:
        editorState.isHeading3 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      children: t('main.newStory.editor.h3'),
    },
    {
      className:
        editorState.isHeading4 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      children: t('main.newStory.editor.h4'),
    },
    {
      className:
        editorState.isHeading5 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      children: t('main.newStory.editor.h5'),
    },
    {
      className:
        editorState.isHeading6 && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      children: t('main.newStory.editor.h6'),
    },
    {
      className:
        editorState.isBulletList && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      children: t('main.newStory.editor.bulletList'),
    },
    {
      className:
        editorState.isOrderedList && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      children: t('main.newStory.editor.orderedList'),
    },
    {
      className:
        editorState.isCodeBlock && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      children: t('main.newStory.editor.codeBlock'),
    },
    {
      className:
        editorState.isBlockquote && 'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      children: t('main.newStory.editor.blockquote'),
    },
    {
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      children: t('main.newStory.editor.horizontalRule'),
    },
    {
      onClick: () => editor.chain().focus().setHardBreak().run(),
      children: t('main.newStory.editor.hardBreak'),
    },
    {
      className:
        editor.isActive({ textAlign: 'left' }) &&
        'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      children: <TextAlignStart />,
    },
    {
      className:
        editor.isActive({ textAlign: 'center' }) &&
        'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      children: <TextAlignCenter />,
    },
    {
      className:
        editor.isActive({ textAlign: 'right' }) &&
        'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      children: <TextAlignEnd />,
    },
    {
      className:
        editor.isActive({ textAlign: 'justify' }) &&
        'text-neutral-lightest bg-primary-default',
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      children: <TextAlignJustify />,
    },
    {
      children: (
        <label htmlFor="imageUploader" className="flex gap-2.5">
          <LucideImage width="24" height="24" className="min-w-6 min-h-6" />
          {t('main.newStory.editor.addImage')}
          <Input
            id="imageUploader"
            type="file"
            accept="image/jpg, image/png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                const formData = new FormData()
                formData.append('image', e.target.files[0])

                // TODO: Save image by using api and get url to insert in editor.
                console.log(e.target.files[0])
              }
            }}
          />
        </label>
      ),
    },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {toggles.map(({ className, ...toggle }, index) => (
        <Button
          {...toggle}
          key={index}
          variant="chip"
          size="lg"
          className={cn('text-neutral-darkest bg-neutral-lightest', className)}
        />
      ))}
    </div>
  )
}

export const Editor = ({
  onUpdate,
  onDebounceUpdate,
}: {
  onUpdate?: (content: JSONContent) => void
  onDebounceUpdate?: (content: JSONContent) => void
}) => {
  const { t } = useTranslations()
  const [content, setContent] = useState<JSONContent>()
  const debounceContent = useDebounce(content, 3000)
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: ({ editor, node }) => {
          const firstChild = editor.state.doc.children[0]
          const secondChild = editor.state.doc.children[1]

          if (node === firstChild)
            return t('main.newStory.editor.placeholder.title')
          else if (node === secondChild)
            return t('main.newStory.editor.placeholder.content')
          else return ''
        },
        showOnlyCurrent: false,
      }),
    ],
    content: {
      type: 'doc',
      content: [{ type: 'heading' }, { type: 'paragraph' }],
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON())
      onUpdate?.(editor.getJSON())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    // TODO: Save content every 3 seconds by using api.
    if (debounceContent) onDebounceUpdate?.(debounceContent)
  }, [debounceContent])

  return (
    <DataBoundary data={editor} fallback={<span>Loading...</span>}>
      {(editor) => (
        <section className="flex flex-col gap-4 md:gap-6 xl:gap-10">
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="*:focus-visible:outline-none *:font-(family-name:--font-inter) min-h-80"
          />
        </section>
      )}
    </DataBoundary>
  )
}
