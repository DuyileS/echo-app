"use client"

import { useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

export default function Page() {

  const users = useQuery(api.users.getMany)

  return (
    <div className="flex flex-col min-h-svh p-6">
      <p>apps/widget</p>
      <div className="max-w-sm w-full mx-auto">
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  )
}
