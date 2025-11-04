import Image from 'next/image'
import { CalendarClock } from 'lucide-react'

export default function Home() {
  return (
    <section className="px-4 py-6 md:px-6 md:py-10 xl:px-0 xl:py-11 grow divide-y divide-neutral-default">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="py-4 md:py-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="https://github.com/shadcn.png"
              className="rounded-full"
              width="44"
              height="44"
              alt="User Avatar"
            />
            <span className="self-center text-base/normal text-neutarl-light line-clamp-1">
              Marco Mercedes Marco Mercedes Marco Mercedes Marco Mercedes Marco
              Marco Mercedes Marco Mercedes Marco Mercedes Mercedes Marco
              Mercedes
            </span>
          </div>
          <div className="flex gap-4 md:gap-10 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl/tight font-bold font-(family-name:--font-inter) line-clamp-3">
                Lorem ipsumdolor sitamet consec tetur adipisicing elit.
                Distinctio neque sed minima, numquam consequatur quis quia omnis
                voluptatem debitis dolores sunt at architecto corporis, ad
                facilis eum illum? Possimus dolores asperiores maiores alias
                molestiae, praesentium itaque nisi doloremque saepe sapiente
                consequuntur quis eum impedit cum architecto eos commodi
                inventore ducimus.
              </h1>
              <p className="text-sm/normal line-clamp-2">
                Quasi iusto vero natus nesciunt explicabo cumque neque in autem
                placeat quisquam eaque deleniti sunt, quis non atque eius fuga
                nostrum molestias, ratione officia culpa possimus debitis id.
                Quae, sequi velit error obcaecati nostrum ut? Cupiditate omnis
                expedita minus dolore corporis ad quaerat ipsum beatae nulla
                error. Vitae facilis est iusto dicta laboriosam voluptatibus,
                maiores eius consectetur sint quas, exercitationem rem,
                recusandae voluptas non officia. Porro, dolore similique.
                Maxime, iure?
              </p>
            </div>
            <div className="w-28.5 md:w-72.5 shrink-0">
              <div className="relative pb-[45%]">
                <Image
                  src="/"
                  className="bg-amber-300 object-cover"
                  fill
                  alt="Main Image"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <CalendarClock
              className="text-secondary-default"
              width="24"
              height="24"
            />
            <span className="self-center text-sm/normal text-neutral-light">
              2025-11-7
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
