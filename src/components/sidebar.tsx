import { Link } from "@tanstack/react-router"
import { BarcodeIcon, BoxIcon, CircleHelpIcon, CoffeeIcon, ContactIcon, UserIcon } from "lucide-react"
import { useLocation } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const LINKS = [
    { name: 'Inventario', href: 'inventory', icon: BoxIcon },
    { name: 'Usuarios', href: 'users', icon: UserIcon },
    { name: 'Proveedores', href: 'providers', icon: ContactIcon },
    { name: 'Pedidos', href: 'orders', icon: BarcodeIcon },
    { name: 'Q&S', href: 'qs', icon: CircleHelpIcon },
]

export function SideBar() {
    const pathname = useLocation({ select: (location) => location.pathname })

    return <aside className="border-r w-44 p-4 h-[calc(100vh-60px)]">
        <Link className="flex items-center gap-2 mb-4 px-4 text-sm group" to="/dashboard">
            <CoffeeIcon size={25} className="group-hover:-rotate-12 transition-transform" />
            <p className="font-bold">
                Dashboard
            </p>
        </Link>
        <nav className="flex flex-col gap-2 mt-10">
            {LINKS.map(link =>
                <Button variant="ghost" size="sm"
                    className={cn("flex justify-start",
                        { "underline": pathname.includes(link.href) })}
                    asChild>
                    <Link
                        key={link.name}
                        to={link.href}
                    >
                        <link.icon className="mr-4 h-4 w-4" />
                        {link.name}
                    </Link>
                </Button>
            )}
        </nav>
    </aside >
}

