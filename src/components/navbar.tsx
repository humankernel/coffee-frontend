import { Link, useLocation } from "@tanstack/react-router";
import { CoffeeIcon } from "lucide-react";
import { LinkItem } from "@/constants";
import { CartDropdown } from "@/components/cart";
import { useAuth } from "@/context/auth";
// shadcn
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { InsertCsForm } from "./forms/cs";

export function Navbar({ links }: { links: LinkItem[] }) {
    return (
        <div className="px-4 py-2 md:px-10 md:py-4">
            <header className="mx-auto flex max-w-screen-xl items-center justify-between">
                <Link to="/" className="group">
                    <CoffeeIcon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
                </Link>
                <LinkList links={links} />
                <div className="flex items-center gap-2">
                    <CartDropdown />
                    <UserDropdown />
                </div>
            </header>
        </div>
    );
}

export function LinkList({ links }: { links: LinkItem[] }) {
    const pathname = useLocation({ select: (location) => location.pathname });
    const { isAuthenticated, user } = useAuth()

    return (
        <nav className="hidden sm:block">
            {links.map((item) => {
                if (!item.role || (isAuthenticated && item.role === user?.role))
                    return <Button
                        asChild
                        key={item.label}
                        variant="link"
                        size="sm"
                        className={cn("dark:text-white/70", {
                            underline: pathname === item.url,
                        })}
                    >
                        <Link to={item.url}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <p className="hidden md:block">
                                {item.label}
                            </p>
                        </Link>
                    </Button>
            })}
        </nav>
    )
}

function UserDropdown() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 border p-1 hover:border-primary">
                    <AvatarImage src="/avatar.svg" alt="user" />
                    <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid gap-1">
                <DropdownMenuItem asChild>
                    <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="flex w-full justify-start rounded-[0.5rem] rounded-t-sm cursor-pointer"
                    >
                        <Link to="/profile" > Perfil </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="flex justify-start rounded-[0.5rem] px-2"
                            >
                                Queja/Sugerencia
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Queja/Sugerencia</DialogTitle>
                            </DialogHeader>
                            <InsertCsForm />
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
                                asChild
                                size="sm"
                                variant="ghost"
                                className="flex w-full justify-start rounded-[0.5rem]"
                            >
                                <Link to="/login"> Iniciar Sesion </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Button
                                asChild
                                size="sm"
                                className="flex w-full justify-start rounded-[0.5rem] rounded-b-2xl cursor-pointer"
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
