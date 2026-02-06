"use client"

import { useFormContext, FieldValues, Path } from "react-hook-form"
import { Input, type InputProps } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FormInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
} & Omit<InputProps, "name">

export function FormInput<T extends FieldValues>({
  name,
  label,
  description,
  ...props
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]

  return (
    <Field data-invalid={!!error}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Input
        id={name}
        aria-invalid={!!error}
        {...register(name)}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{String(error.message)}</FieldError>}
    </Field>
  )
}
