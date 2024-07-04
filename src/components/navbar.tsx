import { Link, useLocation } from "@tanstack/react-router";
import { CoffeeIcon } from "lucide-react";
import { ThemeToggle } from "./themes/theme-toggle";
import { LinkItem } from "@/constants";
import { CartDropdown } from "@/components/cart";
import { useAuth } from "@/context/auth";
// shadcn
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
    links: LinkItem[]
}

export function Navbar({ links }: Props) {
    const pathname = useLocation({ select: (location) => location.pathname });
    const { user } = useAuth()

    return (
        <div className="px-4 py-2 md:px-10 md:py-4">
            <header className="mx-auto flex max-w-screen-xl items-center justify-between">
                <Link to="/" className="group">
                    <CoffeeIcon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
                </Link>
                <nav className="hidden sm:block">
                    {links.map((link) => {
                        if (!link.role || link.role === user?.role)
                            return <Link to={link.url} key={link.label}>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className={cn("dark:text-white/70", {
                                        underline: pathname === link.url,
                                    })}
                                >
                                    <link.icon className="mr-2 h-4 w-4" />
                                    <p className="hidden md:block">
                                        {link.label}
                                    </p>
                                </Button>
                            </Link>
                    })}
                </nav>
                <div className="flex items-center gap-2">
                    <CartDropdown />
                    <ThemeToggle />
                    <UserDropdown />
                </div>
            </header>
        </div>
    );
}

function UserDropdown() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 border p-1 hover:border-primary">
                    <AvatarImage src="/react.svg" alt="user" />
                    <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="mb-2 flex w-full justify-start rounded-[0.5rem]"
                    >
                        <Link to="/profile"> Perfil </Link>
                    </Button>
                </DropdownMenuItem>
                {isAuthenticated ? (
                    <DropdownMenuItem asChild>
                        <Button
                            onClick={logout}
                            size="sm"
                            className="flex w-full justify-start rounded-[0.5rem] rounded-b-2xl"
                        >
                            Cerrar Sesion
                        </Button>
                    </DropdownMenuItem>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="mb-2 flex w-full justify-start rounded-[0.5rem]"
                            >
                                <Link to="/login"> Iniciar Sesion </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Button
                                size="sm"
                                className="flex w-full justify-start rounded-[0.5rem] rounded-b-2xl"
                            >
                                <Link to="/register"> Crear Cuenta </Link>
                            </Button>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
