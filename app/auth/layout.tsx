const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var (--tw-gradient-stops))] from-sky-400 to-blue-800 bg-gradient-to-r from-slate-900 to-slate-700">{children}</div>
    </>
  )
}

export default AuthLayout
