import { Role } from "@/api/users";
import { Navbar } from "@/components/navbar";
import { DASHBOARD_LINKS } from "@/constants";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: "/login",
                search: { redirect: location.href },
            });
        }

        const role = context?.auth.user?.role;
        if (!role || role !== Role.manager) {
            throw new Error("Solo el administrador puede entrar");
        }
    },
    component: () =>
        <>
            <Navbar links={DASHBOARD_LINKS} />
            <Outlet />
        </>,
});
