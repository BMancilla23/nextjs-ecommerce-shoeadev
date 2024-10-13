import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export const RecentSales = async () => {
  const data = await getData();

  return (
    <>
      <Card>
        <CardHeader>
          {/* Recent sales */}
          <CardTitle>Ventas recientes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Avatar className="hidden sm:flex h-9 w-9">
                {/* <AvatarFallback>BM</AvatarFallback> */}
                <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
                <AvatarFallback>
                  {item.User?.firstName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                {/* <p className="text-sm font-medium">Bryan Mancilla</p> */}
                <p className="text-sm font-medium">{item.User?.firstName}</p>
                {/* <p className="text-sm text-muted-foreground">tes@test.com</p> */}
                <p className="text-sm text-muted-foreground">
                  {item.User?.email}
                </p>
              </div>
              {/* <p className="ml-auto font-medium">+$1,999.00</p> */}
              <p className="ml-auto font-medium">
                +${new Intl.NumberFormat("en-US").format(item.amount / 100)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};
