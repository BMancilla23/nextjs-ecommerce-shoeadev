import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // Obtiene el cuerpo de la solicitud
  const body = await req.text();

  // Obtiene la firma del webhook de Stripe
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    // Construye el evento de webhook de Stripe a partir del cuerpo y la firma
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string // Se utiliza la clave secreta del webhook de Stripe
    );
  } catch (error: unknown) {
    // Si hay un error en la verificación, devuelve un error 400
    return new Response("Error de webhook de Stripe", { status: 400 });
  }

  // Revisa el tipo de evento recibido desde Stripe
  switch (event.type) {
    case "checkout.session.completed":
      // Obtiene la sesión de checkout completada desde el evento
      const session = event.data.object;

      // Crea una nueva orden en la base de datos con Prisma
      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });

      // Elimina el carrito del usuario del Redis
      await redis.del(`cart-${session.metadata?.userId}`);
      break;

    // Si se recibe un envento no manejado, simplemente se registra en consola
    default:
      console.log("unhandled event");
  }

  // Devuelve un status 200 para indicar que el webhook fue procesado correctamente
  return new Response("Webhook processed", { status: 200 });
}
