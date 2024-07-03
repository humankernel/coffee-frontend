import { Button } from "@/components/ui/button";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_profile")({
    component: () => (
        <div className="flex w-full flex-col gap-5 px-3 md:flex-row md:px-16 lg:px-28">
            <ProfileSidebar />
            <Outlet />
        </div>
    ),
});

function ProfileSidebar() {
    return (
        <aside className="hidden border-r py-4 md:block md:w-1/3 lg:w-1/4">
            <div className="sticky top-12 flex flex-col gap-2 p-4 text-sm">
                <h2 className="mb-4 pl-3 text-2xl font-semibold">
                    <Link to="/" className="text-sm"> Inicio / </Link>
                    Perfil
                </h2>
                <Button variant="link" className="justify-start" asChild>
                    <Link to="/profile"> Info </Link>
                </Button>
            </div>
        </aside>
    );
}
