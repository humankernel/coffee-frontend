import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/store')({
    component: () => <div>Hello /store!</div>
})
