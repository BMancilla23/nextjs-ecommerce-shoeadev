"use server";

import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

// Función para crear un producto en la base de datos
export async function createProduct(prevState: unknown, formData: FormData) {
  // Obtiene la sesión del usuario con kinde
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verificación de autorización para garantizar que solo un usuario autorizado pueda crear productos
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Valida los datos del formulario con Zod
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  // En caos de error de validación, responde con los errores
  if (submission.status !== "success") {
    return submission.reply();
  }
  // Procesa las URLs de las imágenes, eliminando espacios en blanco
  const processedImages = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // Crea el producto en la base de datos con Prisma
  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: processedImages,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });
  // Redirige al usuario al dashboard después de la creación
  redirect("/dashboard/products");
}

// Función para editar un producto existente
export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verifica si el usuario está autorizado
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Valida los datos del formulario usando el esquema de Zod
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  // Responde con los errores si la validación falla
  if (submission.status !== "success") {
    return submission.reply();
  }

  // Obtiene el ID del producto del formulario
  const productId = formData.get("productId") as string;

  // Procesa las URLs de las imágenes, eliminando espacios en blanco
  const processedImages = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  // Actualiza el producto en la base de datos
  await prisma.product.update({
    where: { id: productId },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: processedImages,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });
  // Redirige después de la edición
  redirect("/dashboard/products");
}

// Función para eliminar un producto
export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verifica si el usuario está autorizado
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Obtiene el ID del producto a eliminar
  const productId = formData.get("productId") as string;

  // Elimina el producto de la base de datos con Prisma
  await prisma.product.delete({ where: { id: productId } });

  // Redirige después de la eliminación
  redirect("/dashboard/products");
}

// Función para crear un banner
export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verifica si el usuario está autorizado
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Valida los datos del formulario usando el esquema de Zod
  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  // Responde con los errores si la validación falla
  if (submission.status !== "success") {
    return submission.reply();
  }

  // Crea el banner en la base de datos con Prisma
  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  // Redirige después de crear el banner
  redirect("/dashboard/banner");
}

// Función para eliminar un banner
export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verifica si el usuaior está autorizado
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Obtiene el ID del banner del formulario
  const bannerId = formData.get("bannerId") as string;

  // Elimina el banner de la base de datos
  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });

  // Redirige después de la eliminación
  redirect("/dashboard/banner");
}

// Función para agregar un producto al carrito
export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Verifica si el usuairo esta autorizado
  if (!user || user.email !== "bmancilla119@gmail.com") {
    return redirect("/");
  }

  // Obtiene el carrito actual del usuario desde redis
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  // Busca el producto en la base de datos
  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  // Si no se encuentra el producto, lanza un error
  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  // Inicializa el carrito si no existe
  const updatedCart: Cart = cart || {
    userId: user.id,
    items: [],
  };

  // Busca si el producto ya está en el carrito
  const existingItemIndex = updatedCart.items.findIndex(
    (item) => item.id === productId
  );

  if (existingItemIndex !== -1) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    updatedCart.items[existingItemIndex].quantity += 1;
  } else {
    // Si el producto no está en el carrito, agrega el nuevo item
    updatedCart.items.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      imageString: selectedProduct.images[0],
      quantity: 1,
    });
  }

  /* let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        price: selectedProduct.price,
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        quantity: 1,
      });
    }
  } */

  // Guarda el carrito actualizado en Redis
  await redis.set(`cart-${user.id}`, updatedCart);

  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId") as string;

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/", "layout");
}

export async function checkout() {
  // Obtiene el usuario autenticado desde la sesión del servidor
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Si no hay usuario autenticado, redirige al inicio
  if (!user) {
    return redirect("/");
  }

  // Intenta obtener el carrito del usuario desde Redis usando su ID
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  // Si hay un carrito con items, crea los detalles para la sesión de Stripe
  if (cart && cart.items) {
    // Mapea los items del carrito para crear las líneas de producto para Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd", // Define la moneda para el pago
          product_data: {
            name: item.name, // Nombre del producto
            images: [item.imageString], // Imagen del producto
          },
          unit_amount: item.price * 100, // Precio en centavos (Stripe maneja precios en la unidad más pequeña)
        },
        quantity: item.quantity, // Cantidad del producto del carrito
      }));

    // Crea una sesión de pago en Stripe usando los detalles del carrito
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // Modo de pago (puede ser 'payment', 'subscription', etc)
      line_items: lineItems, // Los items crados anteriormente
      success_url: "http://localhost:3000/payment/success", // URL a donde redirigir tras un pago exitoso
      cancel_url: "http://localhost:3000/payment/cancel", // URL a donde redirigir si el pago es cancelado
      metadata: {
        userId: user.id, // Se guarda el ID del usuario en los metadatos de la sesión
      },
    });

    // Redirige al usuario a la URL de la sesión de Stripe para realizar el pago
    return redirect(session.url as string);
  }
}
