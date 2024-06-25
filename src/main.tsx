import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "./globals.css"

import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './components/themes/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth-provider'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register { router: typeof router }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>,
    )
}

