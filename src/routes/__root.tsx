import { ErrorPage } from "@/components/error-page";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React from "react";

type RouterContext = {
    queryClient: QueryClient;
    auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    errorComponent: ErrorPage,
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="mx-auto">
            <Outlet />
            <Toaster />

            {/* devtools */}
            <React.Suspense>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
            </React.Suspense>
        </div>
    );
}

// devtools
const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null
        : React.lazy(() =>
            import("@tanstack/router-devtools").then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        );

const ReactQueryDevtools =
    process.env.NODE_ENV === "production"
        ? () => null
        : React.lazy(() =>
            import("@tanstack/react-query-devtools").then((res) => ({
                default: res.ReactQueryDevtools,
            })),
        );
