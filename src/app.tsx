
export function App() {
    const auth = useAuth()

    return <AuthProvider>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} context={{ auth }} />
            </QueryClientProvider>
        </ThemeProvider>
    </AuthProvider>
}
