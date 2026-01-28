"use client"

import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form"

type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
  children: React.ReactNode
  className?: string
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormWrapperProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}
