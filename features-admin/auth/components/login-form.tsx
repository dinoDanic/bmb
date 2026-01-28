"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormWrapper,
  FormInput,
} from "@/features-admin/shared/components/form"
import { login } from "../actions/login"

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  })


  async function onSubmit(data: LoginFormData) {
    setError(null)
    setLoading(true)

    try {
      const result = await login(data)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      <FormWrapper form={form} onSubmit={onSubmit} className="space-y-4">
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

        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </FormWrapper>
    </Card>
  )
}
