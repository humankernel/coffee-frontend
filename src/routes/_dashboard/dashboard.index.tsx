import { Link, createFileRoute } from "@tanstack/react-router";
import { ActivityIcon, CalendarIcon, CoffeeIcon, PercentIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api/sales";
// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Sort } from "../_public/store";
import { useMemo } from "react";
import { getUsers } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { mostFrequent } from "@/lib/utils";


export const Route = createFileRoute("/_dashboard/dashboard/")({
    component: DashboardPage,
});

function DashboardPage() {
    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Profits />
                <UsersCard />
                <MostPopular />
            </div>
            <div>
                <RecentSales />
            </div>
        </div>
    );
}

function Profits() {
    const lastMonthGrowProfitsPercent = 10;
    const { data: sales } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
    });

    const totalProfit = useMemo(() => {
        if (!sales) return 0

        const prices = sales
            .map(({ product, amount }) => product.price * amount)

        if (prices.length > 0)
            return prices.reduce((prev, curr) => prev + curr)

        return 0
    }
        , [sales])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <PercentIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold"> ${totalProfit} </div>
                <p className="text-xs text-muted-foreground">
                    +{lastMonthGrowProfitsPercent}% desde el ultimo mes
                </p>
            </CardContent>
        </Card>
    );
}

function UsersCard() {
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })
    const lastMonthGrowPercent = 180.1;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Activos ahora
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{users?.length ?? 0}</div>
                <p className="text-xs text-muted-foreground">
                    +{lastMonthGrowPercent}% since last month
                </p>
            </CardContent>
        </Card>
    )
}

function MostPopular() {
    const { data: sales } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
    });

    const mostPopularProduct = useMemo(() => {
        if (!sales) return "no hay ventas"
        const productsNames = sales.map(sale => sale.product.name)
        return mostFrequent(productsNames)
    }, [sales])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Mas Popular
                </CardTitle>
                <CoffeeIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {mostPopularProduct}
                </div>
                <p className="text-xs text-muted-foreground">
                    +{sales?.length} ventas
                </p>
            </CardContent>
        </Card>
    );
}

function RecentSales() {
    const { data } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales({ sort: Sort.newest, limit: 10 }),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 overflow-x-auto">
                {data &&
                    data.map(({ sale, product, amount }) => (
                        <div key={sale.id} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src="avatar.svg" alt="Avatar" />
                                <AvatarFallback>{sale.user.username}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {sale.user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    @{sale.user.username}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-auto font-medium">
                                (+{amount})
                                <Button variant="link">
                                    <Link to={`/store/$productId`}
                                        params={(prev) => ({ ...prev, productId: product.id })}>
                                        {product.name}
                                    </Link>
                                </Button>
                            </div>
                            <div className="ml-auto">
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant="ghost">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {new Date(sale.createdAt)
                                                .toISOString()
                                                .slice(0, 10)}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Calendar
                                            mode="default"
                                            selected={sale.createdAt}
                                        />
                                    </PopoverContent>
                                </Popover>

                            </div>
                            <div className="ml-auto font-medium">
                                +${product.price}
                            </div>
                        </div>
                    ))}
            </CardContent>
        </Card>
    );
}
