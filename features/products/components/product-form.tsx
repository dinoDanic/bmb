"use client"

import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import { FormCheckbox } from "@/components/form/form-checkbox"
import { DeleteProductDialog } from "./delete-product-dialog"
import { createProduct, updateProduct } from "../api/actions"
import type { ProductWithDetails } from "../api/actions"
import type { Category } from "@/db/types"
import type { FormOption } from "@/components/form/types"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  price: z.string().min(1, "Price is required"),
  categoryId: z.string().optional(),
  featured: z.boolean(),
  active: z.boolean(),
  width: z.string().optional(),
  height: z.string().optional(),
  depth: z.string().optional(),
  weight: z.string().optional(),
  imageUrl: z.string().optional(),
})

type ProductFormData = z.infer<typeof schema>

type ProductFormProps = {
  product?: ProductWithDetails
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!product

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name ?? "",
      code: product?.code ?? "",
      price: product?.price != null ? String(product.price) : "",
      categoryId: product?.categoryId ? String(product.categoryId) : undefined,
      featured: product?.featured ?? false,
      active: product?.active ?? true,
      width: product?.details?.width != null ? String(product.details.width) : "",
      height: product?.details?.height != null ? String(product.details.height) : "",
      depth: product?.details?.depth != null ? String(product.details.depth) : "",
      weight: product?.details?.weight != null ? String(product.details.weight) : "",
      imageUrl: product?.details?.imageUrl ?? "",
    },
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: ProductFormData) {
    const productPayload = {
      name: data.name,
      code: data.code,
      price: parseFloat(data.price),
      categoryId: data.categoryId ? Number(data.categoryId) : null,
      featured: data.featured,
      active: data.active,
    }

    const detailsPayload = {
      width: data.width ? parseFloat(data.width) : null,
      height: data.height ? parseFloat(data.height) : null,
      depth: data.depth ? parseFloat(data.depth) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      imageUrl: data.imageUrl || null,
    }

    if (isEdit) {
      await updateProduct(product.id, productPayload, detailsPayload)
    } else {
      await createProduct(productPayload, detailsPayload)
    }

    router.push("/admin/auth/core/products")
  }

  const categoryOptions = categories.map((c): FormOption => ({
    value: String(c.id),
    label: c.displayName,
  }))

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput<ProductFormData>
                name="name"
                label="Name"
                placeholder="Product name"
              />
              <FormInput<ProductFormData>
                name="code"
                label="Code"
                placeholder="PROD-001"
              />
              <FormInput<ProductFormData>
                name="price"
                label="Price"
                placeholder="0.00"
                type="number"
                step="0.01"
              />
              <FormSelect<ProductFormData>
                name="categoryId"
                label="Category"
                options={[{ value: "", label: "None" }, ...categoryOptions]}
                placeholder="Select category..."
              />
              <FormCheckbox<ProductFormData>
                name="featured"
                label="Featured"
                description="Show this product in featured sections"
              />
              <FormCheckbox<ProductFormData>
                name="active"
                label="Active"
                description="Product is visible to customers"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput<ProductFormData>
                name="width"
                label="Width"
                placeholder="cm"
                type="number"
                step="0.1"
              />
              <FormInput<ProductFormData>
                name="height"
                label="Height"
                placeholder="cm"
                type="number"
                step="0.1"
              />
              <FormInput<ProductFormData>
                name="depth"
                label="Depth"
                placeholder="cm"
                type="number"
                step="0.1"
              />
              <FormInput<ProductFormData>
                name="weight"
                label="Weight"
                placeholder="kg"
                type="number"
                step="0.1"
              />
              <div className="sm:col-span-2">
                <FormInput<ProductFormData>
                  name="imageUrl"
                  label="Image URL"
                  placeholder="https://..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardFooter className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Save Changes"
                    : "Create Product"}
              </Button>
              {isEdit && (
                <DeleteProductDialog
                  product={product}
                  trigger={
                    <Button variant="destructive" type="button">
                      Delete
                    </Button>
                  }
                />
              )}
            </div>
            <Link
              href="/admin/auth/core/products"
              className="text-sm text-muted-foreground hover:underline"
            >
              Back to Products
            </Link>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
