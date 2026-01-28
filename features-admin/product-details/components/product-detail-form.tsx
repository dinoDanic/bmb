"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormWrapper,
  FormInput,
} from "@/features-admin/shared/components/form"
import { useCreateProductDetail, useUpdateProductDetail } from "../hooks"
import type { ProductDetails } from "@/db/types"

type ProductDetailsFormData = {
  width: string
  height: string
  depth: string
  weight: string
  imageUrl: string
}

type Props = {
  productDetail?: ProductDetails
  mode: "create" | "edit"
}

export function ProductDetailForm({ productDetail, mode }: Props) {
  const router = useRouter()
  const createMutation = useCreateProductDetail()
  const updateMutation = useUpdateProductDetail()

  const form = useForm<ProductDetailsFormData>({
    defaultValues: {
      width: productDetail?.width ? String(productDetail.width) : "",
      height: productDetail?.height ? String(productDetail.height) : "",
      depth: productDetail?.depth ? String(productDetail.depth) : "",
      weight: productDetail?.weight ? String(productDetail.weight) : "",
      imageUrl: productDetail?.imageUrl ?? "",
    },
  })

  async function onSubmit(data: ProductDetailsFormData) {
    const payload = {
      width: data.width ? parseFloat(data.width) : null,
      height: data.height ? parseFloat(data.height) : null,
      depth: data.depth ? parseFloat(data.depth) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      imageUrl: data.imageUrl || null,
    }

    if (mode === "edit" && productDetail) {
      await updateMutation.mutateAsync({ id: productDetail.id, ...payload })
    } else {
      await createMutation.mutateAsync(payload)
    }

    router.push("/admin/product-details")
    router.refresh()
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Card className="max-w-2xl p-6">
      <FormWrapper form={form} onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput<ProductDetailsFormData>
            name="width"
            label="Width (cm)"
            type="number"
            step="0.01"
          />
          <FormInput<ProductDetailsFormData>
            name="height"
            label="Height (cm)"
            type="number"
            step="0.01"
          />
          <FormInput<ProductDetailsFormData>
            name="depth"
            label="Depth (cm)"
            type="number"
            step="0.01"
          />
          <FormInput<ProductDetailsFormData>
            name="weight"
            label="Weight (kg)"
            type="number"
            step="0.01"
          />
        </div>
        <FormInput<ProductDetailsFormData>
          name="imageUrl"
          label="Image URL"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Product Details"}
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
