import { LinkItem } from "@/types";

export const API_BASE = "http://localhost:3000/";

export const HOME_LINKS: LinkItem[] = [
  { name: "Tienda", href: "/store" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Nosotros", href: "/about" },
];

export const DASHBOARD_LINKS: LinkItem[] = [
  { name: "Inventario", href: "/dashboard/inventory" },
  { name: "Usuarios", href: "/dashboard/users" },
  { name: "Proveedores", href: "/dashboard/suppliers" },
  { name: "Pedidos", href: "/dashboard/orders" },
  { name: "Q&S", href: "/dashboard/qs" },
];
