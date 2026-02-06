"use client"

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import z from "zod"
import { login } from '../api/login';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.email(),
  password: z.string().min(1)
})

export function LoginForm() {
  const rotuer = useRouter()

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema)
  })


  async function submit(data: LoginFormData) {
    try {
      await login(data)
      rotuer.push('/admin')
    } catch (err) {
      console.log("err:", err);
      alert("a jbg")
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="flex w-screen h-screen items-center justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormInput<LoginFormData>
                name="email"
                label="Email"
                type="email"
                required
              />
              <FormInput<LoginFormData>
                name="password"
                label="Password"
                type="password"
                required
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </FormProvider>
  )
}


