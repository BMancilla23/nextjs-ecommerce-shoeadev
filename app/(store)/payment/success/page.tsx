import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 text-gray-600">
              ¡Tu pago ha sido procesado con éxito!
            </h3>
            {/* Congrats to your purchase. Your payment wa succesfull. We hope you enjoy your product */}
            <p className="mt-2 text-sm leading-5 text-gray-500">
              Felicitaciones por su compra. Esperamos que disfrutes de tu
              producto.
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/">Volver a la tienda</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
