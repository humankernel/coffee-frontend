import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/logout')({
  component: () => <div>Hello /auth/logout!</div>
})