import { redirect } from "next/navigation"

const page = () => {
  return (
    redirect("/admin/auth/core")
  )
}

export default page
