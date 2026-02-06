"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createCategory, updateCategory } from "../api/actions"
import type { Category } from "@/db/types"

const schema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().optional(),
  description: z.string().optional(),
})

type CategoryFormData = {
  displayName: string
  slug: string
  categoryId?: string
  description?: string
}

type CategoryFormDialogProps = {
  category?: Category
  parentCategories: Category[]
  trigger: React.ReactNode
}

export function CategoryFormDialog({
  category,
  parentCategories,
  trigger,
}: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const isEdit = !!category

  const form = useForm<CategoryFormData>({
    defaultValues: {
      displayName: category?.displayName ?? "",
      slug: category?.slug ?? "",
      categoryId: category?.categoryId ? String(category.categoryId) : undefined,
      description: category?.description ?? "",
    },
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: CategoryFormData) {
    const payload = {
      displayName: data.displayName,
      slug: data.slug,
      categoryId: data.categoryId ? Number(data.categoryId) : null,
      description: data.description || null,
    }

    if (isEdit) {
      await updateCategory(category.id, payload)
    } else {
      await createCategory(payload)
    }

    setOpen(false)
    form.reset()
    router.refresh()
  }

  const parentOptions = parentCategories.map((c) => ({
    value: String(c.id),
    label: c.displayName,
  }))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.JSX.Element} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInput<CategoryFormData>
              name="displayName"
              label="Display Name"
              placeholder="Category name"
            />
            <FormInput<CategoryFormData>
              name="slug"
              label="Slug"
              placeholder="category-slug"
            />
            <FormSelect<CategoryFormData>
              name="categoryId"
              label="Parent Category"
              options={[{ value: "", label: "None (root category)" }, ...parentOptions]}
              placeholder="Select parent..."
            />
            <FormInput<CategoryFormData>
              name="description"
              label="Description"
              placeholder="Optional description"
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Save Changes"
                    : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
