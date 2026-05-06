"use client"

import { useOrganization } from "@clerk/nextjs"
import { AuthLayout } from "../layouts/auth-layout"
import OrgSelectView from "../views/org-select-view"

export const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {

    const { isLoaded, organization } = useOrganization()
    
    if (!isLoaded) {
        return (
            <AuthLayout>
                <p>Loading organization...</p>
            </AuthLayout>
        )
    }

    if (!organization) {
        return (
            <AuthLayout>
                <OrgSelectView />
            </AuthLayout>
        )
    }

    return (
        <>
            {children}
        </>
    )
}