"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormWrapper,
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/features-admin/shared/components/form"
import { useCreateCategory, useUpdateCategory } from "../hooks"
import type { Category } from "@/db/types"

type CategoryFormData = {
  name: string
  categoryId: string
  description: string
  imageUrl: string
}

type Props = {
  category?: Category
  parentOptions: Category[]
  mode: "create" | "edit"
}

export function CategoryForm({ category, parentOptions, mode }: Props) {
  const router = useRouter()
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()

  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name ?? "",
      categoryId: category?.categoryId ? String(category.categoryId) : "",
      description: category?.description ?? "",
      imageUrl: category?.imageUrl ?? "",
    },
  })

  async function onSubmit(data: CategoryFormData) {
    const payload = {
      name: data.name,
      categoryId: data.categoryId ? Number(data.categoryId) : null,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
    }

    if (mode === "edit" && category) {
      await updateMutation.mutateAsync({ id: category.id, ...payload })
    } else {
      await createMutation.mutateAsync(payload)
    }

    router.push("/admin/categories")
    router.refresh()
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  const categoryOptions = [
    { value: "", label: "None (Top Level)" },
    ...parentOptions.map((c) => ({ value: String(c.id), label: c.name })),
  ]

  return (
    <Card className="max-w-2xl p-6">
      <FormWrapper form={form} onSubmit={onSubmit} className="space-y-4">
        <FormInput<CategoryFormData>
          name="name"
          label="Name"
          required
        />
        <FormSelect<CategoryFormData>
          name="categoryId"
          label="Parent Category"
          options={categoryOptions}
        />
        <FormTextarea<CategoryFormData>
          name="description"
          label="Description"
        />
        <FormInput<CategoryFormData>
          name="imageUrl"
          label="Image URL"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Category"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </FormWrapper>
    </Card>
  )
}
