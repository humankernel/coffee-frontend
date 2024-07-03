import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/auth";
import { ThemeProvider } from "./components/themes/theme-provider";

export const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: { queryClient, auth: undefined! },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ThemeProvider
                        defaultTheme="system"
                        storageKey="vite-ui-theme"
                    >
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </QueryClientProvider>
        </React.StrictMode>,
    );
}

function App() {
    const auth = useAuth();
    return <RouterProvider router={router} context={{ auth }} />;
}
