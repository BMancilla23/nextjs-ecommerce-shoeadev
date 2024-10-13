"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface chartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

// Función para agregar y procesar los datos por fecha
const aggregateData = (
  data: { date: string; revenue: number }[]
): { date: string; revenue: number }[] => {
  // Agrega los valores de recaudación por fecha
  const aggregated = data.reduce((acc: Record<string, number>, curr) => {
    // Si ya existe la fecha, sumar el ingreso a la fecha
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      // Si no existe la fecha, crear la entrada con el ingreso actual
      acc[curr.date] = curr.revenue;
    }

    return acc;
  }, {});

  // Convierte el objeto en un array con las fechas y los ingresos
  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date], // Asignar el valor agregado de ingresos
  }));
};

export const Chart = ({ data }: chartProps) => {
  // Procesa los datos para agregar y procesarlos por fecha
  const proccesedData = aggregateData(data);
  return (
    // Componente de contenedor responsivo para que el gráfico se ajuste a cualquier tamaño
    <ResponsiveContainer width="100%" height={400}>
      {/* Gráfico de líneas */}
      <LineChart data={proccesedData}>
        {/* Malla de fondo con líneas discontinuas */}
        <CartesianGrid strokeDasharray="3 3" />
        {/* Eje X que muestra las fechas */}
        <XAxis dataKey="date" />
        {/* Eje Y que muestra los ingresos */}
        <YAxis />
        {/* Tooltip para mostrar información detallada al pasar el mouse */}
        <Tooltip />
        {/* Leyenda para describir las líneas */}
        <Legend />
        {/* Definición de la línea que representa los ingresos */}
        <Line
          type="monotone" // Suevisa las curvas
          stroke="#E11D48" // Color de la línea
          activeDot={{ r: 8 }} // Tamaño del punto activo
          dataKey="revenue" // Llave de los datos que usa la línea
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
