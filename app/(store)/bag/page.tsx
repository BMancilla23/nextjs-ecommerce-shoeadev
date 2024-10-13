import { checkout, deleteItem } from "@/app/actions";
import { CheckoutButton, DeleteItem } from "@/app/components/SubmitButton";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function BagPage() {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-lg text-gray-600">
            Aún no tienes productos en tu carrito.
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Puedes añadir productos al carrito en la sección de Productos.
          </p>
          <div className="mt-6">
            <Button size="lg" className="w-full" variant="link" asChild>
              <Link href="/products/all">Volver a la Tienda</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-md border">
                <Image
                  fill
                  src={item.imageString}
                  alt="Product image"
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="ml-5 flex justify-between w-full">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>

                  <form action={deleteItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    {/* <button className="font-medium text-primary text-end">
                      Eliminar
                    </button> */}
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>${new Intl.NumberFormat("es-PE").format(totalPrice)}</p>
            </div>

            <form action={checkout}>
              {/* <Button size="lg" className="w-full mt-5">
                Comprobar
              </Button> */}
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
