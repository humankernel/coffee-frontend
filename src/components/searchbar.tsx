import { TelescopeIcon } from "lucide-react";
import { FormEvent, useRef } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "@tanstack/react-router";

export function Searchbar() {
    const query = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filter = query.current?.value ?? "";
        navigate({ search: (prev) => ({ ...prev, filter }) });
    };

    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <TelescopeIcon className="h-4 w-4" />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    ref={query}
                    type="search"
                    className="block w-[250px] p-4 ps-10 text-sm text-gray-900 dark:text-white/60"
                    placeholder="Buscar productos"
                    required
                />
            </form>
        </div>
    );
}
