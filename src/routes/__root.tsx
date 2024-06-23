import { ErrorPage } from '@/components/error-page'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: RootLayout,
    errorComponent: ErrorPage
})

function RootLayout() {
    const pathname = useLocation({ select: (location) => location.pathname })

    return <div className='max-w-screen-xl mx-auto'>
        {!pathname.includes("/auth") && <Navbar />}
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
    </div>
}
