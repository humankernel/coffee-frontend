import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/suppliers')({
  component: () => <div>Hello /dashboard/suppliers!</div>
})