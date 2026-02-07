"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { deleteProduct } from "../api/actions"

export function useDeleteProduct() {
  const router = useRouter()

  return useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: (result) => {
      if (!result.error) {
        router.push("/admin/auth/core/products")
      }
    },
  })
}
