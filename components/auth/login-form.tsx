"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { login } from "@/actions/login"

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const errorUrl = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with a different provider" : ""

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
    // axios post("/your/api/route", values)
  }

  return (
    <>
      <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 p-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="example@email.com" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="******" type="password" />
                    </FormControl>

                    <Button size="sm" variant="link" asChild className="px-0 font-normal flex justify-end">
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error || errorUrl} />
            <FormSuccess message={success} />

            <Button disabled={isPending} type="submit" size="lg" className="w-full mb-10">
              Sign In
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  )
}
