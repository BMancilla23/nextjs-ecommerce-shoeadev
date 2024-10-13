import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function ProductsPage() {
  noStore();
  const data = await getData();

  return (
    <>
      <div className="flex items-center justify-end">
        <Button size="lg" asChild className="flex items-center gap-2">
          <Link href="/dashboard/products/create">
            <PlusCircle className="w-5 h-5" />
            {/* Add Product */}
            <span>Agregar producto</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          {/* Products */}
          <CardTitle>Productos</CardTitle>
          {/* Manage your products and view their sales performance */}
          <CardDescription>
            Administra tus productos y visualiza su desempeño en ventas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* Image */}
                <TableHead>Imagen</TableHead>
                {/* Name */}
                <TableHead>Nombre</TableHead>
                {/* Status */}
                <TableHead>Estado</TableHead>
                {/* Price */}
                <TableHead>Precio</TableHead>
                {/* Date */}
                <TableHead>Fecha</TableHead>
                {/* Actions */}
                <TableHead className="text-end">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {/* <UserIcon className="h-12 w-12" /> */}
                    <div className="relative w-24 h-24 overflow-hidden aspect-square">
                      <Image
                        src={item.images[0]}
                        alt="Product image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  {/* Active */}
                  <TableCell>{item.status}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-PE").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Actions */}
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          {/* Edit */}
                          <Link href={`/dashboard/products/${item.id}`}>
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {/* Delete */}
                          <Link href={`/dashboard/products/${item.id}/delete`}>
                            Eliminar
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {/*  <TableRow>
                <TableCell>
                  <UserIcon className="h-12 w-12" />
                </TableCell>
                <TableCell>Nike air</TableCell>
                
                <TableCell>Activo</TableCell>
                <TableCell>$299.00</TableCell>
                <TableCell>2024-02-10</TableCell>
                <TableCell className="text-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
