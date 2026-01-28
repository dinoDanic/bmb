import { useMutation } from "@tanstack/react-query"
import { createCategory } from "./actions/create-category"
import { updateCategory } from "./actions/update-category"
import { deleteCategory } from "./actions/delete-category"

export const useCreateCategory = () =>
  useMutation({ mutationFn: createCategory })

export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategory })

export const useDeleteCategory = () =>
  useMutation({ mutationFn: deleteCategory })
