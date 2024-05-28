import { Link } from "@tanstack/react-router"
import { CoffeeIcon } from "lucide-react"

const LINKS = [
    { name: 'Inventario', href: 'inventory' },
    { name: 'Usuarios', href: 'users' },
    { name: 'Proveedores', href: 'providers' },
    { name: 'Pedidos', href: 'orders' },
    { name: 'Q&S', href: 'qs' },
]

export function SideBar() {
    return <aside className="border-r w-44 p-4 h-[calc(100vh-60px)]">
        <Link className="flex items-center gap-2 mb-4 px-4 text-sm group" to="/dashboard">
            <CoffeeIcon size={25} className="group-hover:-rotate-12 transition-transform" />
            <p className="font-bold">
                Dashboard
            </p>
        </Link>
        <nav className="flex flex-col gap-2">
            {
                LINKS.map(link =>
                    <Link key={link.name} to={link.href} className="px-4 hover:bg-white/20 py-2 rounded-md">
                        {link.name}
                    </Link>
                )
            }
        </nav>
    </aside>
}

