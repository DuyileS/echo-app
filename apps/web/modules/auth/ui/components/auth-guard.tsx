"use client"

import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import { useAuth } from "@clerk/nextjs"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn } = useAuth()

    return (
        <>
            <AuthLoading>
                <AuthLayout>
                    <p>Loading...</p>
                </AuthLayout>
            </AuthLoading>
            <Authenticated>
                {children}
            </Authenticated>
            <Unauthenticated>
                {isLoaded && !isSignedIn ? (
                    <AuthLayout>
                        <SignInView />
                    </AuthLayout>
                ) : (
                    <AuthLayout>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-muted-foreground text-sm">Syncing with Convex...</p>
                            {!isLoaded && <p className="text-xs text-muted-foreground/50">Waiting for Clerk to load...</p>}
                            {isLoaded && isSignedIn && <p className="text-xs text-muted-foreground/50">Clerk is ready, waiting for Convex token...</p>}
                        </div>
                    </AuthLayout>
                )}
            </Unauthenticated>
        </>
    )
}