import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/themes/theme-provider'
import "./globals.css"
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/auth'

export const queryClient = new QueryClient()

const router = createRouter({
    routeTree,
    context: { queryClient, auth: undefined! },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0
})

declare module '@tanstack/react-router' {
    interface Register { router: typeof router }
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>,
    )
}


function App() {
    const auth = useAuth()

    return <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ auth }} />
        </QueryClientProvider>
    </ThemeProvider>
}
