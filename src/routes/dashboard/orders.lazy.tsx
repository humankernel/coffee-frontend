import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/orders')({
  component: () => <div>Hello /dashboard/product-orders!</div>
})