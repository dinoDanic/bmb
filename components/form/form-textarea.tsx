"use client"

import { useFormContext, FieldValues, Path } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
} & Omit<React.ComponentProps<"textarea">, "name">

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  description,
  ...props
}: FormTextareaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]

  return (
    <Field data-invalid={!!error}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Textarea
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
