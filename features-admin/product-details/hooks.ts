import { useMutation } from "@tanstack/react-query"
import { createProductDetail } from "./actions/create-product-detail"
import { updateProductDetail } from "./actions/update-product-detail"
import { deleteProductDetail } from "./actions/delete-product-detail"

export const useCreateProductDetail = () =>
  useMutation({ mutationFn: createProductDetail })

export const useUpdateProductDetail = () =>
  useMutation({ mutationFn: updateProductDetail })

export const useDeleteProductDetail = () =>
  useMutation({ mutationFn: deleteProductDetail })
