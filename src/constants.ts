import { LinkProps } from "@tanstack/react-router";

type LinkItem = {
  name: string;
  href: LinkProps["to"];
};

export const API_BASE = "http://localhost:3001";

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

export const INGREDIENTS = [
  { value: "azúcar", label: "Azúcar", icon: "🍬" },
  { value: "crema", label: "Crema", icon: "🥛" },
  { value: "chocolate", label: "Chocolate", icon: "🍫" },
  { value: "vainilla", label: "Vainilla", icon: "🌼" },
  { value: "canela", label: "Canela", icon: "🍂" },
  { value: "caramelo", label: "Caramelo", icon: "🍬" },
  { value: "nuez", label: "Nuez", icon: "🌰" },
  { value: "almendra", label: "Almendra", icon: "🥜" },
  { value: "coco", label: "Coco", icon: "🥥" },
  { value: "frambuesa", label: "Frambuesa", icon: "🍓" },
  { value: "menta", label: "Menta", icon: "🌿" },
  { value: "jengibre", label: "Jengibre", icon: "🌶️" },
  { value: "miel", label: "Miel", icon: "🍯" },
  { value: "limón", label: "Limón", icon: "🍋" },
  { value: "avellana", label: "Avellana", icon: "🌰" },
  { value: "frutas del bosque", label: "Frutas del bosque", icon: "🍇" },
  { value: "canela", label: "Canela", icon: "🍂" },
  { value: "cacao", label: "Cacao", icon: "🍫" },
  { value: "arándanos", label: "Arándanos", icon: "🫐" },
  { value: "almíbar", label: "Almíbar", icon: "🍯" },
  { value: "anís", label: "Anís", icon: "🌱" },
  { value: "cereza", label: "Cereza", icon: "🍒" },
  { value: "canela", label: "Canela", icon: "🍂" },
  { value: "coco rallado", label: "Coco rallado", icon: "🥥" },
  { value: "nata", label: "Nata", icon: "🍶" },
];
