import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/orders")({
    component: () => <div>Hello /dashboard/product-orders!</div>,
});
