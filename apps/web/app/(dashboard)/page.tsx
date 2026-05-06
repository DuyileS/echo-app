"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {

  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-svh p-6">
        <p>apps/web</p>
        <UserButton />
        <OrganizationSwitcher hidePersonal={true} />
        <Button onClick={() => addUser()}>Add User</Button>
      </div>
    </>
  )
}
