import { Sidebar } from './Sidebar'

type Props = {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  )
}