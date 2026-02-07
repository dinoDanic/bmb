"use client"

import { useFormContext, FieldValues, Path, Controller } from "react-hook-form"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { FormOption } from "./types"

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
  options: FormOption[]
  placeholder?: string
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  description,
  options,
  placeholder = "Select...",
}: FormSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]

  return (
    <Field data-invalid={!!error}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{String(error.message)}</FieldError>}
    </Field>
  )
}
