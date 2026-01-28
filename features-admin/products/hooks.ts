import { useMutation } from "@tanstack/react-query"
import { createProduct } from "./actions/create-product"
import { updateProduct } from "./actions/update-product"
import { deleteProduct } from "./actions/delete-product"

export const useCreateProduct = () =>
  useMutation({ mutationFn: createProduct })

export const useUpdateProduct = () =>
  useMutation({ mutationFn: updateProduct })

export const useDeleteProduct = () =>
  useMutation({ mutationFn: deleteProduct })
