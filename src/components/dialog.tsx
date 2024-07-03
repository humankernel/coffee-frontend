import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function InsertDialog({ name, form }: { name: string, form: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" /> Añadir
                </Button>
            </DialogTrigger>
            <DialogContent className="p-4 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Insertar {name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">{form}</div>
            </DialogContent>
        </Dialog>
    );
}

export function UpdateDialog({ title: title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger>Actualizar</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
