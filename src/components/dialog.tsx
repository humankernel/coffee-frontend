import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
