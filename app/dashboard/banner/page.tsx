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
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function BannerPage() {
  noStore();
  const data = await getData();

  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2">
          <Link href="/dashboard/banner/create">
            <PlusCircle className="w-5 h-5" />
            {/* Add Banner */}
            <span>Agregar Banner</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          {/* Manage your banners */}
          <CardDescription>
            Administra tus banners y controla su visualización en tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* Image */}
                <TableHead>Imagen</TableHead>
                {/* Title */}
                <TableHead>Titulo</TableHead>
                {/* Actions */}
                <TableHead className="text-end">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="w-24 h-24 aspect-square overflow-hidden relative ">
                      <Image
                        fill
                        className="object-contain rounded-lg"
                        alt="Product Image"
                        src={item.imageString}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{item.title}</TableCell>
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
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Link href={`/dashboard/banner/${item.id}/delete`}>
                            Eliminar
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {/* <TableRow>
                <TableCell>
                  <User2 className="h-16 w-16" />
                </TableCell>
                
                <TableCell className="font-medium">Grandes productos</TableCell>
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
                     
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                
                        <Link href={``}>Eliminar</Link>
                      </DropdownMenuItem>
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
