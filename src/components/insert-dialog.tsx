import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InsertUserForm } from "./forms/user"

export function InsertDialog() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button>Insertar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Insertar</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <InsertUserForm />
            </div>
        </DialogContent>
    </Dialog>

}
