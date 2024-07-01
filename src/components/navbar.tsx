import { Link, useLocation } from "@tanstack/react-router"
import { CoffeeIcon, StoreIcon } from "lucide-react"
import { ThemeToggle } from "./themes/theme-toggle"
import { DASHBOARD_LINKS, HOME_LINKS } from "@/constants"
// shadcn
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth"

export function Navbar() {
    const pathname = useLocation({ select: (location) => location.pathname })
    const LINKS = pathname.includes("/dashboard")
        ? DASHBOARD_LINKS
        : HOME_LINKS

    return <div className="px-4 py-2 md:py-4 md:px-10">
        <header className="flex justify-between items-center max-w-screen-xl mx-auto">
            <div className="flex gap-2 items-center">
                <Link to="/" className="group">
                    <CoffeeIcon size={25} className="group-hover:-rotate-12 transition-transform" />
                </Link>
                <nav className="hidden sm:block">
                    {LINKS.map(link =>
                        <Link to={link.href} key={link.name}>
                            <Button
                                variant="link"
                                size="sm"
                                className={cn("dark:text-white/60",
                                    { "underline": pathname === link.href }
                                )}
                            >
                                {link.name}
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
            <div className="flex items-center gap-2">
                <ShoppingCart />
                <ThemeToggle />
                <UserDropdown />
            </div>
        </header >
    </div >
}


function UserDropdown() {
    const { isAuthenticated, user, logout } = useAuth()

    console.log(user)

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="w-8 h-8 border p-1 hover:border-primary">
                <AvatarImage src="src/assets/react.svg" alt="user" />
                <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel> {user?.username} </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Button size="sm" variant="ghost" className="flex mb-2 justify-start w-full rounded-[0.5rem]">
                    <Link to="/"> Perfil </Link>
                </Button>
            </DropdownMenuItem>
            {isAuthenticated
                ? <DropdownMenuItem asChild>
                    <Button onClick={logout} size="sm" className="flex mb-2 justify-start w-full rounded-[0.5rem] rounded-b-2xl">
                        Cerrar Sesion
                    </Button>
                </DropdownMenuItem>
                : <>
                    <DropdownMenuItem asChild>
                        <Button size="sm" variant="ghost" className="flex mb-2 justify-start w-full rounded-[0.5rem]" >
                            <Link to="/auth/login"> Iniciar Sesion </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button size="sm" className="flex justify-start w-full rounded-[0.5rem] rounded-b-2xl">
                            <Link to="/auth/register"> Crear Cuenta </Link>
                        </Button>
                    </DropdownMenuItem>
                </>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

function ShoppingCart() {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
                <StoreIcon className="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Tu Carrito</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>item1</DropdownMenuItem>
            <DropdownMenuItem>item1</DropdownMenuItem>
            <DropdownMenuItem>item1</DropdownMenuItem>
            <DropdownMenuItem>item1</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

}
