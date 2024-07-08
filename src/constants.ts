import { LinkProps } from "@tanstack/react-router";
import { Role } from "./api/users";
import {
    type LucideIcon,
    UsersRoundIcon,
    MailOpenIcon,
    ShoppingBasketIcon,
    GaugeIcon,
    AmpersandIcon,
    CircleGaugeIcon,
    PackageIcon,
    DollarSignIcon,
    NotebookPenIcon,
    ShoppingBasket,
} from "lucide-react";
import { Size, Temp } from "@/api/products";
import { CsType, Status } from "@/api/qs";
import { ReportType } from "./api/report";
import { OrderStatus } from "./api/orders";

export type LinkItem = {
    label: string;
    url: LinkProps["to"];
    role?: Role;
    icon: LucideIcon;
};

export const API_BASE = "http://localhost:3001";

export const HOME_LINKS: LinkItem[] = [
    { label: "Tienda", url: "/store", icon: ShoppingBasketIcon },
    {
        label: "Dashboard",
        url: "/dashboard",
        icon: GaugeIcon,
        role: Role.manager,
    },
    { label: "Nosotros", url: "/about", icon: AmpersandIcon },
];
export const DASHBOARD_LINKS: LinkItem[] = [
    { label: "", url: "/dashboard", icon: CircleGaugeIcon },
    { label: "Ventas", url: "/dashboard/sales", icon: DollarSignIcon },
    { label: "Inventario", url: "/dashboard/inventory", icon: PackageIcon },
    { label: "Usuarios", url: "/dashboard/users", icon: UsersRoundIcon },
    { label: "Q&S", url: "/dashboard/cs", icon: MailOpenIcon },
    { label: "Reportes", url: "/dashboard/reports", icon: ShoppingBasket },
    {
        label: "Ordenes de Compra",
        url: "/dashboard/orders",
        icon: NotebookPenIcon,
    },
];

type SelectItem = {
    value: string;
    label: string;
    icon: string;
};

export const ROLES: SelectItem[] = [
    { value: Role.manager, label: "Administrador", icon: "" },
    { value: Role.supplier, label: "Proveedor", icon: "" },
    { value: Role.almacenero, label: "Almacenero", icon: "" },
    { value: Role.customer, label: "Cliente", icon: "" },
];

export const QSS: SelectItem[] = [
    { value: CsType.complaint, label: "Queja", icon: "" },
    { value: CsType.suggestion, label: "Sugerencia", icon: "" },
];

export const STATUS: SelectItem[] = [
    { value: Status.pending, label: "Pendiente", icon: "" },
    { value: Status.rejected, label: "Rechazado", icon: "" },
    { value: Status.resolved, label: "Resuelto", icon: "" },
];

export const SIZES: SelectItem[] = [
    { value: Size.lg, label: "Grande", icon: "" },
    { value: Size.md, label: "Medio", icon: "" },
    { value: Size.sm, label: "Pequeño", icon: "" },
];

export const TEMPS: SelectItem[] = [
    { value: Temp.hot, label: "Caliente", icon: "" },
    { value: Temp.cold, label: "Frio", icon: "" },
];

export const INGREDIENTS: SelectItem[] = [
    { value: "azúcar", label: "Azúcar", icon: "🍬" },
    { value: "crema", label: "Crema", icon: "🥛" },
    { value: "chocolate", label: "Chocolate", icon: "🍫" },
    { value: "vainilla", label: "Vainilla", icon: "🌼" },
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
    { value: "cacao", label: "Cacao", icon: "🍫" },
    { value: "arándanos", label: "Arándanos", icon: "🫐" },
    { value: "almíbar", label: "Almíbar", icon: "🍯" },
    { value: "anís", label: "Anís", icon: "🌱" },
    { value: "cereza", label: "Cereza", icon: "🍒" },
    { value: "canela", label: "Canela", icon: "🍂" },
    { value: "coco rallado", label: "Coco rallado", icon: "🥥" },
    { value: "nata", label: "Nata", icon: "🍶" },
];

export const REPORT_TYPES: SelectItem[] = [
    { value: ReportType.missing, label: "Faltante", icon: "" },
    { value: ReportType.surplus, label: "Sobrente", icon: "" },
];

export const ORDER_STATUS_TYPES: SelectItem[] = [
    { value: OrderStatus.pending, label: "Pendiente", icon: "" },
    { value: OrderStatus.rejected, label: "Rechazado", icon: "" },
    { value: OrderStatus.fullfiled, label: "Cumplido", icon: "" },
];
