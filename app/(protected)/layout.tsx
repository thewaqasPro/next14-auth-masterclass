import { Navbar } from "./_components/navbar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout
