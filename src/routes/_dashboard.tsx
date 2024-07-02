import { Role } from '@/api/users'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: "/login",
                search: { redirect: location.href }
            })
        }

        const role = context?.auth.user?.role
        if (!role || role !== Role.manager) {
            throw new Error("Solo el administrador puede entrar")
        }
    },
    component: () => <Outlet />
})
