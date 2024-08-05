"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export const Social = () => {
  // // const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get("callbackUrl")

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <>
      <div className="flex items-center w-full gap-x-2">
        <Button variant="outline" className="w-full" size="lg" onClick={() => onClick("google")}>
          <FcGoogle className="w-5 h-5" />
        </Button>
        <Button variant="outline" className="w-full" size="lg" onClick={() => onClick("github")}>
          <FaGithub className="w-5 h-5" />
        </Button>
      </div>
    </>
  )
}
