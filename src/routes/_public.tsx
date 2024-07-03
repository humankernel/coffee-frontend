import { Navbar } from '@/components/navbar'
import { HOME_LINKS } from '@/constants'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
    component: () =>
        <>
            <Navbar links={HOME_LINKS} />
            <Outlet />
        </>

})
