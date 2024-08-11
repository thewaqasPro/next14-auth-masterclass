import { NextResponse } from "next/server"

import NextAuth from "next-auth"
import authConfig from "@/auth.config"
// export { auth as middleware } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req, ctx) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  // Continue to the next handler if logged in
  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
