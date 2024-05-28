import { NavBar } from '@/components/navbar'
import { SideBar } from '@/components/sidebar'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({ component: RootLayout })

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
    </div>
}

function DashBoardLayout() {
    return <div className='flex'>
        <SideBar />
        <Outlet />
        <TanStackRouterDevtools />
    </div>
}

function AuthLayout() {
    return <div>
        <Outlet />
        <TanStackRouterDevtools />
    </div>
}
