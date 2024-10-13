import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersPage() {
  const data = await getData();
  return (
    <Card>
      <CardHeader className="px-7">
        {/* Orders */}
        <CardTitle>Pedidos</CardTitle>
        {/* Recent orders from your store! */}
        <CardDescription>Pedidos recientes de tu tienda</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Customer */}
              <TableHead>Cliente</TableHead>
              {/* Type */}
              <TableHead>Tipo</TableHead>
              {/* Status */}
              <TableHead>Estado</TableHead>
              {/* Date */}
              <TableHead>Fecha</TableHead>
              {/* Amount */}
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>

                <TableCell>Orden</TableCell>

                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("es-PE").format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat("en-US").format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
              <TableCell>
                <p className="font-medium">Bryan Mancilla</p>
                <p className="hidden md:flex text-sm text-muted-foreground">
                  test@test.com
                </p>
              </TableCell>

              <TableCell>Venta</TableCell>

              <TableCell>Completado</TableCell>
              <TableCell>2024-10-02</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
