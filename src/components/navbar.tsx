import { Link, useLocation } from "@tanstack/react-router"
import { CoffeeIcon } from "lucide-react"
import { ThemeToggle } from "./themes/theme-toggle"
import { DASHBOARD_LINKS, HOME_LINKS } from "@/constants"
import { CartDropdown } from "@/components/cart"
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
                <CartDropdown />
                <ThemeToggle />
                <UserDropdown />
            </div>
        </header >
    </div >
}


function UserDropdown() {
    const { isAuthenticated, user, logout } = useAuth()

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
                    <Button onClick={logout} size="sm" className="flex justify-start w-full rounded-[0.5rem] rounded-b-2xl">
                        Cerrar Sesion
                    </Button>
                </DropdownMenuItem>
                : <>
                    <DropdownMenuItem asChild>
                        <Button size="sm" variant="ghost" className="flex mb-2 justify-start w-full rounded-[0.5rem]" >
                            <Link to="/login"> Iniciar Sesion </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button size="sm" className="flex justify-start w-full rounded-[0.5rem] rounded-b-2xl">
                            <Link to="/register"> Crear Cuenta </Link>
                        </Button>
                    </DropdownMenuItem>
                </>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

