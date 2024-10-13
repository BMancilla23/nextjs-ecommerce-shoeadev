import { addItem } from "@/app/actions";
import { FeaturedProducts } from "@/app/components/store/FeaturedProducts";
import { ImageSlider } from "@/app/components/store/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

// Función para obtener los datos del producto desde la base de datos
async function getData(productId: string) {
  /* await new Promise((resolve) => setTimeout(resolve, 5000)); */
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  // Si no se encuentra el producto, se redirige a una página 404
  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdPage({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  // Obtiene los datos del producto con el ID especificado
  const data = await getData(params.id);

  // Utiliza bind para pasar el ID del producto como argumento a la función 'addItem'
  // Esto crea una nueva función donde 'addItem' se ejecutará con el ID del producto
  const addProductShoppingCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-12">
        {/* Componente para mostrar las imágenes del producto en un slider */}
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
          {/* Íconos de estrellas simulando una calificación */}
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          {/* Formulario que utiliza la acción 'addProductShoppingCart' al enviar el formulario */}
          {/* El atributo 'action' especifica qué función del servidor debe ejecutarse al enviar el formulario */}
          <form action={addProductShoppingCart}>
            {/* <Button size="lg" className="w-full mt-5">
              <ShoppingBag className="mr-4 h-5 w-5" />
              Añadir al Carrito
            </Button> */}
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      {/* Sección de productos destacados */}
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
