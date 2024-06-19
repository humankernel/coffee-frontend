import { ErrorPage } from '@/components/error-page'
import { NavBar } from '@/components/navbar'
import { SideBar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: RootLayout,
    errorComponent: ErrorPage
})

function RootLayout() {
    const pathname = useLocation({ select: (location) => location.pathname })

    if (pathname.includes("dashboard")) return <DashBoardLayout />
    else if (pathname.includes("auth")) return <AuthLayout />
    return <HomeLayout />
}

function HomeLayout() {
    return <div className='flex-col'>
        <NavBar />
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster />
    </div>
}

function DashBoardLayout() {
    return <div className='flex'>
        <SideBar />
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster />
    </div>
}

function AuthLayout() {
    return <div>
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster />
    </div>
}
