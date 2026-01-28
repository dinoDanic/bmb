"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormWrapper,
  FormInput,
  FormSelect,
  FormCheckbox,
} from "@/features-admin/shared/components/form"
import { useCreateProduct, useUpdateProduct } from "../hooks"
import type { Product, Category, ProductDetails } from "@/db/types"

type ProductFormData = {
  name: string
  code: string
  price: string
  categoryId: string
  featured: boolean
  active: boolean
  productDetailsId: string
}

type Props = {
  product?: Product
  categories: Category[]
  productDetailsList: ProductDetails[]
  mode: "create" | "edit"
}

export function ProductForm({ product, categories, productDetailsList, mode }: Props) {
  const router = useRouter()
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name ?? "",
      code: product?.code ?? "",
      price: product?.price ? String(product.price) : "",
      categoryId: product?.categoryId ? String(product.categoryId) : "",
      featured: product?.featured ?? false,
      active: product?.active ?? true,
      productDetailsId: product?.productDetailsId ? String(product.productDetailsId) : "",
    },
  })

  async function onSubmit(data: ProductFormData) {
    const payload = {
      name: data.name,
      code: data.code,
      price: parseFloat(data.price),
      categoryId: data.categoryId ? Number(data.categoryId) : null,
      featured: data.featured,
      active: data.active,
      productDetailsId: data.productDetailsId ? Number(data.productDetailsId) : null,
    }

    if (mode === "edit" && product) {
      await updateMutation.mutateAsync({ id: product.id, ...payload })
    } else {
      await createMutation.mutateAsync(payload)
    }

    router.push("/admin/products")
    router.refresh()
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  const categoryOptions = [
    { value: "", label: "None" },
    ...categories.map((c) => ({ value: String(c.id), label: c.name })),
  ]

  const detailsOptions = [
    { value: "", label: "None" },
    ...productDetailsList.map((d) => ({ value: String(d.id), label: `Details #${d.id}` })),
  ]

  return (
    <Card className="max-w-2xl p-6">
      <FormWrapper form={form} onSubmit={onSubmit} className="space-y-4">
        <FormInput<ProductFormData>
          name="name"
          label="Name"
          required
        />
        <FormInput<ProductFormData>
          name="code"
          label="Product Code"
          required
        />
        <FormInput<ProductFormData>
          name="price"
          label="Price"
          type="number"
          step="0.01"
          required
        />
        <FormSelect<ProductFormData>
          name="categoryId"
          label="Category"
          options={categoryOptions}
        />
        <FormSelect<ProductFormData>
          name="productDetailsId"
          label="Product Details"
          options={detailsOptions}
        />
        <FormCheckbox<ProductFormData>
          name="featured"
          label="Featured"
          description="Show this product in featured sections"
        />
        <FormCheckbox<ProductFormData>
          name="active"
          label="Active"
          description="Product is available for sale"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Product"}
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
