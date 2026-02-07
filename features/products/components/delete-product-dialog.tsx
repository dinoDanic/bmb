"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteProduct } from "../hooks/mutations"
import type { Product } from "@/db/types"

type DeleteProductDialogProps = {
  product: Product
  trigger: React.ReactNode
}

export function DeleteProductDialog(props: DeleteProductDialogProps) {
  const deleteProductMutation = useDeleteProduct()

  function handleDelete() {
    deleteProductMutation.mutate(props.product.id, {
      onError: (error) => {
        alert(error instanceof Error ? error.message : "Failed to delete product")
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={props.trigger as React.JSX.Element} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{props.product.name}&quot;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteProductMutation.isPending}>
            {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
