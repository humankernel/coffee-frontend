import { createLazyFileRoute } from '@tanstack/react-router'
import { CoffeeIcon, PercentIcon, UsersIcon } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { getRecentSales } from '@/api/sales'
// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const Route = createLazyFileRoute('/dashboard/')({
    component: DashboardPage
})

function DashboardPage() {
    return <div className="flex flex-col gap-4 w-full p-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Profits />
            <AmountUsers />
            <BestSelledCoffee />
        </div>
        <div>
            <RecentSales />
        </div>
    </div>
}

function Profits() {
    const monthProfits = 5.329
    const lastMonthGrowProfitsPercent = 10

    return <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <CardDescription className="text-4xl text-white">${monthProfits}</CardDescription>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                +{lastMonthGrowProfitsPercent}% desde el ultimo mes
            </p>
        </CardFooter>
    </Card>
}

function AmountUsers() {
    const amountUsers = 2350
    const lastMonthGrowPercent = 180.1

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{amountUsers}</div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">+{lastMonthGrowPercent}% desde el ultimo mes</p>
            </CardFooter>
        </Card>
    )
}


function BestSelledCoffee() {
    // TODO: use img instead
    const mostPopularProduct = "coffee1"
    const amountSales = 21

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mas Popular</CardTitle>
                <CoffeeIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{mostPopularProduct}</div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">+{amountSales} ventas</p>
            </CardFooter>
        </Card>
    )
}



function RecentSales() {
    const { data } = useQuery({
        queryKey: ['sales'],
        queryFn: getRecentSales
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {data && data.map(sale =>
                    <div key={sale.id} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/05.png" alt="Avatar" />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">sale.user.name</p>
                            <p className="text-sm text-muted-foreground">
                                sale.user.username
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+${sale.price}</div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

