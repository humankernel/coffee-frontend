import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/dashboard/suppliers')({
    component: () => <div>Hello /dashboard/suppliers!</div>
})
