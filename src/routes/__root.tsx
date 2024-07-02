import { ErrorPage } from '@/components/error-page'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { AuthContext } from '@/context/auth'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useLocation } from '@tanstack/react-router'
import React from 'react'

type RouterContext = {
    queryClient: QueryClient,
    auth: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    errorComponent: ErrorPage
})

function RootLayout() {
    const pathname = useLocation({ select: (location) => location.pathname })

    return <div className='max-w-screen-xl mx-auto'>
        {!(pathname === '/login' || pathname === '/register') && <Navbar />}
        <Outlet />
        <Toaster />

        {/* devtools */}
        <React.Suspense>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
        </React.Suspense>
    </div>
}

// devtools
const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/react-query-devtools').then((res) => ({
                default: res.ReactQueryDevtools,
            })),
        )
