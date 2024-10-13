import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag } from "lucide-react";
import React from "react";

async function getData() {
  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  /*   const user = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  const order = await prisma.order.findMany({
    select: {
      amount: true,
    },
  }); */

  return {
    user,
    products,
    order,
  };
}

export const SummaryStats = async () => {
  const { products, user, order } = await getData();

  const totalAmount = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {/* Total Revenue */}
            <CardTitle>Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>

          <CardContent>
            {/* <p className="text-2xl font-bold">$100.000</p> */}
            <p className="text-2xl font-bold">
              ${new Intl.NumberFormat("en-US").format(totalAmount / 100)}
            </p>
            {/* Based on 100 Charges */}
            <p className="text-xs text-muted-foreground">
              Basado en 100 cargos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {/* Total sales */}
            <CardTitle>Ventas Totales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>

          <CardContent>
            {/*    <p className="text-2xl font-bold">+50</p> */}
            <p className="text-2xl font-bold">+{order.length}</p>
            {/* Total Sales on ShoeAdev */}
            <p className="text-xs text-muted-foreground">
              Ventas Totales en ShoeAdev
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {/* Total Products */}
            <CardTitle>Productos Totales</CardTitle>
            <PartyPopper className="h-4 w-4 text-indigo-500" />
          </CardHeader>

          <CardContent>
            {/*  <p className="text-2xl font-bold">37</p> */}
            <p className="text-2xl font-bold">{products.length}</p>
            {/* Total Products created */}
            <p className="text-xs text-muted-foreground">
              Productos Totales creados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {/* Total Users */}
            <CardTitle>Usuarios Totales</CardTitle>
            <PartyPopper className="h-4 w-4 text-orange-500" />
          </CardHeader>

          <CardContent>
            {/* <p className="text-2xl font-bold">120</p> */}
            <p className="text-2xl font-bold">{user.length}</p>
            {/* Total Users Signed Up */}
            <p className="text-xs text-muted-foreground">
              Total de usuarios registrados
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
