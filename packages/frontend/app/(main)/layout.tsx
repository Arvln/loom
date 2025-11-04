import { Header } from './components'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-full flex flex-col">
      <Header />
      {children}
    </main>
  )
}
