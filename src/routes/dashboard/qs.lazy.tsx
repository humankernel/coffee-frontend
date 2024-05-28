import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/qs')({
  component: () => <div>Hello /dashboard/qs!</div>
})