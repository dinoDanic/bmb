"use client"

import { useFormContext, FieldValues, Path, Controller } from "react-hook-form"
import { Toggle } from "@/components/ui/toggle"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FormToggleProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  description?: string
}

export function FormToggle<T extends FieldValues>({
  name,
  label,
  description,
}: FormToggleProps<T>) {
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
          <Toggle
            label={label}
            value={field.value ?? undefined}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />
      <div className="flex flex-col gap-1">
        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{String(error.message)}</FieldError>}
      </div>
    </Field>
  )
}
