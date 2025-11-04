'use client'

import { useState } from 'react'
import { useTranslations } from '@/packages/utils'
import { useDebounce } from '@/packages/hooks'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { SquarePen, Search, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const { t } = useTranslations()
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)

  return (
    <header className="px-6 py-2 border-b border-b-neutral-default flex justify-between">
      <div className="flex md:gap-6">
        <h1 className="self-center text-xl font-bold">NoteSphere</h1>
        <div className="hidden md:block relative flex-1 rounded-2xl text-neutral-default bg-neutral-lighter">
          <Input
            className="peer w-xs h-full ps-12 pe-4 rounded-2xl focus-visible:border-2 focus-visible:border-secondary-default focus-visible:outline-none focus-visible:ring-0 placeholder:text-base/normal placeholder:text-neutral-default"
            type="search"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4">
            <SearchIcon size="24" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:gap-6">
        <Link href="/new-story">
          <Button variant="icon" size="icon">
            <SquarePen size="24" />
            <span className="hidden md:inline-block md:text-base/normal">
              {t('main.header.newStory')}
            </span>
          </Button>
        </Link>
        <Button className="md:hidden" variant="icon">
          <Search size="24" />
        </Button>
        <Image
          src="https://github.com/shadcn.png"
          className="rounded-full"
          width="44"
          height="44"
          alt="User Avatar"
        />
      </div>
    </header>
  )
}
