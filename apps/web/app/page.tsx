"use client"

import { SignInButton, UserButton } from "@clerk/nextjs"
import { useMutation, useQuery, Authenticated, Unauthenticated } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {

  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <>
      <Authenticated>
        <div className="flex flex-col min-h-svh p-6">
          <p>apps/web</p>
          <UserButton />
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
            <Button onClick={() => addUser()}>Add User</Button>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be Signed In!</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  )
}
