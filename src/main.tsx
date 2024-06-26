import { StrictMode, Suspense } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { ThemeProvider } from './components/themes/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./globals.css"

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register { router: typeof router }
}

const queryClient = new QueryClient()

// devtools
const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )

const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            import('@tanstack/react-query-devtools').then((res) => ({
                default: res.ReactQueryDevtools,
            })),
        )


const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />

                    {/* devtools */}
                    <Suspense>
                        <TanStackRouterDevtools router={router} />
                        {/* <ReactQueryDevtools /> */}
                    </Suspense>
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>,
    )
}

