import { Chart } from "@/app/components/dashboard/Chart";
import { RecentSales } from "@/app/components/dashboard/RecentSales";
import { SummaryStats } from "@/app/components/dashboard/SummaryStats";
import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";

// Función asíncrona para obtener loa datos de las órdenes de los últimos 7 días
async function getData() {
  // Fecha actual
  const now = new Date();
  // Fecha hace 7 días atrás de la fecha actual
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Obtiene las órdenes de los últimos 7 días con la cantidad y la fecha de creación
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo, // Órdenes desde 7 días atrás hasta ahora
      },
    },

    select: {
      amount: true, // Selecciona el monto de la orden
      createdAt: true, // Selecciona la fecha de creación de la orden
    },
    orderBy: {
      createdAt: "asc", // Ordenar por fecha de creación ascendente
    },
  });

  // Transformar los datos para que sean compatibles con el componente Chart
  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-PE").format(item.createdAt), // Formatear la fecha
    revenue: item.amount / 100, // Convertir el monto a decimales (asumiendo que se almacenan en centavos)
  }));

  return result; // Devolver los datos transformados
}

// Componente de página que muestra las estadísticas resumidas y las transacciones recientes
export default async function SummaryPage() {
  // Evitar la cacheo para este componente
  noStore();
  // Obtener los datos de las órdenes de los últimos 7 días
  const data = await getData();
  return (
    <>
      <SummaryStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            {/* Transactions */}
            <CardTitle>Transacciones</CardTitle>
            {/* Recent transactions from the last 7 days */}
            <CardDescription>
              Transacciones recientes de los últimos 7 días
            </CardDescription>
            <CardContent>
              <Chart data={data} />
            </CardContent>
          </CardHeader>
        </Card>
        {/* Componente que muestra las ventas recientes */}
        <RecentSales />
      </div>
    </>
  );
}
