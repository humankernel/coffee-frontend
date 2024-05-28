import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { CoffeeIcon, StoreIcon } from "lucide-react"
import { ThemeToggle } from "./themes/theme-toggle"
import { useStore } from "@/store"

const LINKS = [
    { name: 'Tienda', href: '/store' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Sobre Nosotros', href: '/about' },
]

export function NavBar() {
    const session = useStore(s => s.session)

    return <div className="px-4 py-2 md:py-4 md:px-10">
        <header className="flex justify-between items-center max-w-screen-lg mx-auto">
            <div className="flex gap-2 items-center">
                <Link to="/" className="group">
                    <CoffeeIcon size={25} className="group-hover:-rotate-12 transition-transform" />
                </Link>
                <nav className="hidden sm:block">
                    {
                        LINKS.map(link =>
                            <Link to={link.href} key={link.name}>
                                <Button variant="link" size="sm" className="dark:text-white/60" >
                                    {link.name}
                                </Button>
                            </Link>
                        )
                    }
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <StoreIcon size={20} />
                <ThemeToggle />
                {
                    session
                        ? <Button size="sm">Iniciar Session</Button>
                        : <Link to="/auth/login"> <Button size="sm">Crear cuenta</Button> </Link>
                }
            </div>
        </header>
    </div>
}

