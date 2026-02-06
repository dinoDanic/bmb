"use client"

import { useFormContext, FieldValues, Path, Controller } from "react-hook-form"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FormCheckboxProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  description,
}: FormCheckboxProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]

  return (
    <Field orientation="horizontal" data-invalid={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id={name}
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
        )}
      />
      <div className="flex flex-col gap-1">
        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{String(error.message)}</FieldError>}
      </div>
    </Field>
  )
}
